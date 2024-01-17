# Contributing

## Overview

Learn the rules to follow when you contribute code or content to this project.

## Contributing process

The contributing process in this project relies on the [GitHub flow](https://guides.github.com/introduction/flow/index.html). This means that you contribute through pull requests (PRs). When adding new code or content to this project, follow these rules:

1. Fork this repository.
1. Make your changes. Do not forgot about:
   - [Naming and architecture convention](./docs/development/guide.md#naming-and-architecture-convention)
   - [Project structure](./docs/development/guide.md#project-structure)
   - Tests
   - Updating relevant documents if you add, remove, update props or configuration.
1. Create a PR.

PRs are very welcome. However, if you want to add a new feature, use GitHub issues to discuss your ideas first.

## Conventional commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification. Releasing to GitHub and NPM is done with the support of [semantic-release](https://semantic-release.gitbook.io/semantic-release/).

A PR should have a title that follows the specification, otherwise, merging is blocked. If you are not familiar with the specification, simply ask maintainers to modify the PR. You can also use this cheatsheet:

- `fix: ` prefix in the title indicates that a PR is a bug fix and the PATCH release must be triggered.
- `feat: ` prefix in the title indicates that a PR is a feature and the MINOR release must be triggered.
- `docs: ` prefix in the title indicates that a PR is only related to the documentation and there is no need to trigger a release.
- `chore: ` prefix in the title indicates that a PR is only related to the project cleanup and there is no need to trigger a release.
- `test: ` prefix in the title indicates that a PR is only related to tests and there is no need to trigger a release.
- `refactor: ` prefix in the title indicates that a PR is only related to refactoring and there is no need to trigger a release.

For a MAJOR release, just add `!` to the prefix, like `fix!: ` or `refactor!: `.

A prefix that follows the specification is not enough though. Remember that the title must be clear, descriptive, and in the [imperative mood](https://chris.beams.io/posts/git-commit/#imperative).