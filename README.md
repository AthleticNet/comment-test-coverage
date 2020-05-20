# Comment Test Coverage

A GitHub action to comment on a PR on GitHub with a simple test coverage summary.

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
          title: Karma Test Coverage
```

## Usage with Jest
1. Add `"codeCoverage": true,` under test > options in angular.json
2. In your jest.config.js set coverageReporters to include `json-summary` and set coverageDirectory to 'coverage' if using the path in the sample setup above.
3. Use in your workflow as illustrated above in the Karma example.

## Parameters

- `token` (**required**) - The GitHub authentication token (workflows automatically set this for you, nothing needed here)
- `path` (**required**) - Path to your coverage-summary.json file
- `title` (**optional**) - Title of comment in PR (defaults to "Test Coverage")

## How to edit action
1. Clone down repo, `npm install`, and make changes
2. Run `npm run package` 
3. Commit
4. 

## License

Repurposed from https://github.com/peter-evans/commit-comment, Copyright (c) 2019 Peter Evans and https://github.com/mshick/add-pr-comment, Copyright (c) 2019 Michael Shick
