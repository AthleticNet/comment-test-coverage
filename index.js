const { inspect } = require("util");
const core = require("@actions/core");
const { request } = require("@octokit/request");
const fs = require('fs');

async function run() {
  try {
    const inputs = {
      token: core.getInput("token"),
      path: core.getInput("path"),
    };
    core.debug(`Inputs: ${inspect(inputs)}`);

    const sha = process.env.GITHUB_SHA;
    core.debug(`SHA: ${sha}`);

    const data = fs.readFileSync(`${process.env.GITHUB_WORKSPACE}/${inputs.path}`, 'utf8');
    const json = JSON.parse(data);

    const coverage = `==== **Test Coverage** ====
Statements: ${json.total.statements.pct}% ( ${json.total.statements.covered}/${json.total.statements.total} )
Branches  : ${json.total.branches.pct}%   ( ${json.total.branches.covered}  /${json.total.branches.total} )
Functions : ${json.total.functions.pct}%  ( ${json.total.functions.covered} /${json.total.functions.total} )
Lines     : ${json.total.lines.pct}%      ( ${json.total.lines.covered}     /${json.total.lines.total} )`

    await request(
      `POST /repos/${process.env.GITHUB_REPOSITORY}/commits/${sha}/comments`,
      {
        headers: {
          authorization: `token ${inputs.token}`
        },
        body: eval('`' + coverage + '`')
      }
    );
  } catch (error) {
    core.debug(inspect(error));
    core.setFailed(error.message);
  }
}

run();