const core = require("@actions/core");
const { LinearClient } = require("@linear/sdk");

const getWorkflowStatesQuery = () => `
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

const getIssuesQuery = (issueQuery) => `
query Issue($attachmentFilter: AttachmentFilter, $issuesFilter: IssueFilter) {
  attachments(filter: $attachmentFilter) {
    nodes { issue { ${issueQuery} } }
  }
}`;

const findState = (states, name) =>
  states.filter((s) => s.name.toLowerCase() === name.toLowerCase());

const moveIssue = (linearClient) => async (issue, froms, tos) => {
  const from = froms.find((f) => issue.state.id === f.id);
  if (!from) return null;

  const to = tos.find((t) => t.team.id === from.team.id);
  await linearClient.issueUpdate(issue.id, {
    stateId: to.id,
  });

  return issue;
};

const issuesMove = (linearClient) => async (list, from, to) => {
  const statesResponse = await linearClient.client.rawRequest(
    getWorkflowStatesQuery(),
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
  const froms = findState(statesOrdered, from);
  const tos = findState(statesOrdered, to);

  const issueQuery = `id url state { id }`;

  const issuesResponse = await linearClient.client.rawRequest(
    getIssuesQuery(issueQuery),
    {
      attachmentFilter: { url: { in: list } },
    }
  );
  const issues = issuesResponse.data.issues.nodes;

  const responses = await Promise.all(
    issues.map(moveIssue(linearClient)(froms, tos))
  );

  // TODO Action output
  const updatedIssues = responses.filter((d) => d);
  updatedIssues.map((i) => console.log(i.url));
};

const action = async () => {
  const apiKey = core.getInput("apiKey");
  const list = core.getInput("list");
  const from = core.getInput("from");
  const to = core.getInput("to");

  const linearClient = new LinearClient({
    apiKey,
  });

  await issuesMove(linearClient)(list, from, to);
};

action.catch((e) => core.setFailed(error.message));
