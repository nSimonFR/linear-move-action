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
query Issue($filter: AttachmentFilter) {
  attachments(filter: $filter) {
    nodes {
      issue {
        id
        identifier
        url
        state {
          id
          name
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

const moveIssue =
  (linearClient) => async (issue, fromStates, toStates, dry) => {
    if (fromStates) {
      const from = fromStates.find((f) => issue.state.id === f.id);

      // If from is given but is not the state wanted, ignore
      if (!from) {
        console.debug(
          `Not moving ${issue.identifier} as state is "${issue.state.name}".`
        );
        return null;
      }
    }
    // Else, always move issue

    const to = toStates.find((t) => t.team.id === issue.team.id);

    console.debug(
      `${dry ? "[DRY]" : ""} moving issue ${issue.url} to ${to.name}.`
    );

    if (!dry) {
      await linearClient.updateIssue(issue.id, {
        stateId: to.id,
      });
    }

    return issue;
  };

const getIssueFromAttachments = (linearClient) => async (list) => {
  const issuesResponse = await linearClient.client.rawRequest(getIssuesQuery, {
    filter: { url: { in: list } },
  });
  const issues = issuesResponse.data.attachments.nodes.map((n) => n.issue);

  console.debug(
    `Found ${issues.length} issues for attachments:\n${issues
      .map((i) => i.identifier)
      .join("\n")}\n`
  );

  return issues;
};

const issuesMove = (linearClient) => async (issues, from, to, dry) => {
  const or = [from, to]
    .filter((s) => s)
    .map((s) => ({ name: { eqIgnoreCase: s } }));

  const statesResponse = await linearClient.client.rawRequest(
    getWorkflowStatesQuery,
    {
      filter: {
        or,
      },
    }
  );
  const states = statesResponse.data.workflowStates.nodes;
  console.debug(`${from} - ${to}:${states.map((s) => s.name).join(", ")}`);

  const statesOrdered = states.sort((a, b) => a.position - b.position);
  const fromNamedStates = from ? findState(statesOrdered, from) : null;
  const toNamedStates = findState(statesOrdered, to);
  console.debug(
    `Found ${fromNamedStates?.length} "${from}" states => ${toNamedStates.length} "${to}" states.`
  );

  const responses = await Promise.all(
    issues.map((issue) =>
      moveIssue(linearClient)(issue, fromNamedStates, toNamedStates, dry)
    )
  );

  const updatedIssues = responses.filter((i) => i);
  console.info(
    `Updated ${updatedIssues.length} issues:\n${updatedIssues
      .map((i) => i.identifier)
      .join("\n")}`
  );
  return updatedIssues.map((i) => i.url).join("\n");
};

const action = async () => {
  const apiKey = core.getInput("apiKey");
  const attachments = core.getInput("attachments").split(/\s+/);
  const from = core.getInput("from") || null;
  const to = core.getInput("to");
  const dry = core.getInput("dry") !== "false";

  const linearClient = new LinearClient({
    apiKey,
  });

  const issues = await getIssueFromAttachments(linearClient)(attachments);

  const links = await issuesMove(linearClient)(issues, from, to, dry);

  console.log(`output.links: ${links}`);
  core.setOutput("links", links);
};

action().catch((error) => core.setFailed(error.stack));
