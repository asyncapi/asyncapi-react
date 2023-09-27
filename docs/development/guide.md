# Development Guide

## Overview

Read the document to find out how to install dependencies, launch the development environment, and run tests. Learn also what is the naming and architecture convention to follow in the project.

> **NOTE:** This repository uses [Lerna](https://github.com/lerna/lerna) for managing local dependencies and better development experience.

### Project structure

This repository has the following structure:

<!-- markdownlint-disable MD040 -->

```
  ├── .github                     # Pull request and issue templates
  ├── docs                        # Directory with project-related documents
  ├── library                     # Source code of the component
  │    ├── src                    # Source code of the component
  │    │    ├── components        # Source code of shared components used in the "containers" directory
  │    │    ├── config            # Configuration of the component
  │    │    ├── containers        # Subcomponents for specific parts of the component
  │    │    ├── helpers           # Various helper functions
  │    │    ├── store             # Global store of the component
  │    │    └── styles            # Style-related files for the component
  │    └── test                   # Tests for the component
  ├── playground                  # Source code of the Playground application for the component
  │    ├── public                 # Fonts, images, and icons used in the Playground application
  │    └── src                    # Source code of the Playground application
  │         ├── common            # Various helper functions including mocks
  │         ├── components        # Components used in the Playground application
  │         └── specs             # Various specifications of AsyncAPI used to test the component
  └── web-component               # Source code of the web-component
```

<!-- markdownlint-enable MD040 -->

If you make any changes in the project structure, remember to update it.

## Install dependencies

To install all dependencies for the [Playground](../../playground) application and prepare a symlink for the [`library`](../../library) package, run this command:

```sh
npm install
```

If you want to clear dependencies and remove a symlink, run this command:

```sh
npm run clean
```

## Launch a development environment

Launch the development server with the hot reloading functionality that allows any change in files in the `playground/src` and `library/src` folders to be immediately visible in the browser. Use this command:

```sh
npm start
```

You can access the live development server at [localhost:3000](http://localhost:3000/).

## Launch a development environment with Gitpod

To spin up with Gitpod development environment, we configured our workspace through a [.gitpod.yml](/.gitpod.yml) file.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/asyncapi/asyncapi-react/tree/master)

## Tests

To launch tests for the [`library`](../../library) package, run this command:

```sh
npm test
```

## Naming and architecture convention

See the rules for naming functions and components, and the architecture convention to use in the `playground` and `library` projects:

- Uses two-space indentation.
- Follow the camel case convention for variables and functions. Type the words in lower case and only capitalize the first letter in each word.
- Do not use an underbar sign (`_`) as the first or last character of a name, even for private variables or functions.
- Do not use a dollar sign (`$`) or a backslash (`\`) in any place.
- Capitalize global constants. Separate words with an underbar sign (`_`).
- Each line should contain no more than one statement.
- Always put the opening brace in the same line as the previous statement.
- Avoid using the ternary operator (`statement ? true : false`). Use the guard (`&&`) instead.
- Do not use a prefix or a suffix on an interface like `IVariable` or `VariableInterface`. That does not apply to `ConfigInterface`.
- Do not use public statements before any properties and methods of classes.
- Try to use only one definition of the React component per one file.
- Use `export const` for all components.
- Use `Props` and `State` names for props and state types for components. Always keep their definitions above the component definition.
- Create generic components that are used in multiple places in the `components` directory. It does not apply to the Playground application.

The maintainers of the repository reserve the right to change these rules.

> **NOTE:** If your code does not follow the mentioned rules, explain the reason for it in your pull request.
