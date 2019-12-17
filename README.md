# Comment Test Coverage

A GitHub action to comment on a commit on GitHub with a simple test coverage summary from Karma.

Repurposed from Commit Comment by Peter Evans
![Commit Comment Example](https://github.com/peter-evans/commit-comment/blob/master/comment-example.png?raw=true)

## Usage

```yml
      - name: Create commit comment
        uses: jacobbowdoin/comment-test-coverage@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          body: |
            This is a multi-line test comment
            - With GitHub **Markdown**
            - Created by [comment-test-coverage][1]

            [1]: https://github.com/jacobbowdoin/comment-test-coverage
```

## Parameters

- `token` (**required**) - The GitHub authentication token
- `body` (**required**) - The contents of the comment.


## Evaluating environment variables

Environment variables can be evaluated in the `body` input as follows.

```yml
      - name: Create commit comment
        uses: jacobbowdoin/comment-test-coverage@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          body: |
            My env var: ${process.env.MY_ENV_VAR}
```

## License

Repurposed from https://github.com/peter-evans/commit-comment, Copyright (c) 2019 Peter Evans