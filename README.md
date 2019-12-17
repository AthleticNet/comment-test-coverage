# Comment Test Coverage

A GitHub action to comment on a commit on GitHub with a simple test coverage summary from Karma.

## Usage with Karma + Angular
1. Add `"codeCoverage": true,` under test > options in angular.json
2. In your karma.conf.js set coverageIstanbulReporter.reports to include `json-summary` and save it to the /coverage directory if using the sample setup below
3. Use in your workflow as illustrated below:

```yml
name: test-pull-request
on: [pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v1

      - name: Run Jasmine tests
        run: npm run test -- --no-watch --no-progress --browsers=ChromeHeadlessCI

      - name: Comment Test Coverage on Commit
        uses: jacobbowdoin/comment-test-coverage@1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          path: coverage/coverage-summary.json
```

## Parameters

- `token` (**required**) - The GitHub authentication token (workflows automatically set this for you, nothing needed here)
- `path` (**required**) - Path to your coverage-summary.json file


## License

Repurposed from https://github.com/peter-evans/commit-comment, Copyright (c) 2019 Peter Evans