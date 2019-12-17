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

    console.log('about to read')
    fs.readdir(path, function (err, items) {
      console.log(items);

      for (var i = 0; i < items.length; i++) {
        console.log(items[i]);
      }
    });

    const data = fs.readFileSync('coverage/coverage-summary.json', 'utf8');
    const json = JSON.parse(data);
    console.log(json);


    await request(
      `POST /repos/${process.env.GITHUB_REPOSITORY}/commits/${sha}/comments`,
      {
        headers: {
          authorization: `token ${inputs.token}`
        },
        body: eval('`' + inputs.path + '`')
      }
    );
  } catch (error) {
    core.debug(inspect(error));
    core.setFailed(error.message);
  }
}

run();