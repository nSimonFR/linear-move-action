const core = require("@actions/core");
const { LinearClient } = require("@linear/sdk");

const getWorkflowStatesQuery = `
query WorkflowStates($filter: WorkflowStateFilter) {
  workflowStates(filter: $filter) {
    nodes {
      id
      name
      position
      team {
        id
      }
    }
  }
}`;

const getIssuesQuery = `
query Issue($attachmentFilter: AttachmentFilter) {
  attachments(filter: $attachmentFilter) {
    nodes {
      issue {
        id
        url
        state {
          id
        }
        team {
          id
        }
      }
    }
  }
}`;

const findState = (states, name) =>
  states.filter((s) => s.name.toLowerCase() === name.toLowerCase());

const moveIssue = (linearClient) => async (issue, fromStates, toStates) => {
  if (fromStates) {
    const from = fromStates.find((f) => issue.state.id === f.id);

    // If from is given but is not the state, ignore
    if (!from) return null;
  }
  // Else, always move issue

  const to = toStates.find((t) => t.team.id === issue.team.id);
  await linearClient.issueUpdate(issue.id, {
    stateId: to.id,
  });

  return issue;
};

const issuesMove = (linearClient) => async (list, from, to) => {
  const statesResponse = await linearClient.client.rawRequest(
    getWorkflowStatesQuery,
    {
      filter: {
        name: {
          in: [from, to],
        },
      },
    }
  );
  const states = statesResponse.data.workflowStates.nodes;

  const statesOrdered = states.sort((a, b) => a.position - b.position);
  const fromNamedStates = findState(statesOrdered, from);
  const toNamedStates = findState(statesOrdered, to);

  const issuesResponse = await linearClient.client.rawRequest(getIssuesQuery, {
    attachmentFilter: { url: { in: list } },
  });
  const issues = issuesResponse.data.attachments.nodes;

  const responses = await Promise.all(
    issues.map((issue) =>
      moveIssue(linearClient)(issue, fromNamedStates, toNamedStates)
    )
  );

  // TODO Action output
  const updatedIssues = responses.filter((d) => d);
  updatedIssues.map((i) => console.log(i.url));
};

const action = async () => {
  const apiKey = core.getInput("apiKey");
  const list = core.getInput("list").split(/\s+/);
  const from = core.getInput("from");
  const to = core.getInput("to") || null;

  const linearClient = new LinearClient({
    apiKey,
  });

  await issuesMove(linearClient)(list, from, to);
};

action().catch((error) => core.setFailed(error.message));
