const { inspect } = require("util");
const core = require("@actions/core");
const { request } = require("@octokit/request");

async function run() {
  try {
    const inputs = {
      token: core.getInput("token"),
      body: core.getInput("body"),
    };
    core.debug(`Inputs: ${inspect(inputs)}`);

    const sha = process.env.GITHUB_SHA;
    core.debug(`SHA: ${sha}`);

    await request(
      `POST /repos/${process.env.GITHUB_REPOSITORY}/commits/${sha}/comments`,
      {
        headers: {
          authorization: `token ${inputs.token}`
        },
        body: eval('`'+inputs.body+'`')
      }
    );
  } catch (error) {
    core.debug(inspect(error));
    core.setFailed(error.message);
  }
}

run();