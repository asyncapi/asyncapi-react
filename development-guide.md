# Development Guide

## Overview

Read the document to find out how to install dependencies, launch the development environment, and run tests. Learn also what is the naming and architecture convention to follow in the project.

> **NOTE:** This repository uses [Lerna](https://github.com/lerna/lerna) for managing local dependencies and better development experience.

## Install dependencies

To install all dependencies for the [Playground](./playground) application and prepare a symlink for the [`library`](./library) package, run these commands:

``` sh
$ npm install
$ npm run bootstrap
```

If you want to clear dependencies and remove a symlink, run this command:
``` sh
 $ npm run clean
```

## Launch a development environment

Launch the development server with the hot reloading functionality that allows any change in files in the `playground/src` and `library/src` folders to be immediately visible in the browser. Use this command:

``` sh
$ npm start
```

You can access the live development server at [localhost:3000](http://localhost:3000/).

## Tests

To launch tests for the [`playground`](./playground) and [`library`](./library) packages, run this command:

``` sh
$ npm test
```

If you only want to run tests for a specific part of the repository, use:

``` sh
$ npm run test:{PART}
```

In this command `{PART}` must be either `playground` or `library`.

## Naming and architecture convention

See the rules for naming functions and components, and the architecture convention to use in the `playground` and `library` projects:

* Uses two-space indentation.
* Follow the camel case convention for variables and functions. Type the words in lower case and only capitalize the first letter in each word.
* Do not use an underbar sign (`_`) as the first or last character of a name, even for private variables or functions.
* Do not use a dollar sign (`$`) or a backslash (`\`) in any place.
* Capitalize global constants. Separate words with an underbar sign (`_`).
* Each line should contain no more than one statement.
* Always put the opening brace in the same line as the previous statement.
* Avoid using the ternary operator (`statement ? true : false`). Use the guard (`&&`) instead.
* Do not use a prefix or a suffix on an interface like `IVariable` or `VariableInterface`. That does not apply to `AsyncApiInterface`, `ConfigInterface`, and `ThemeInterface`.
* Do not use public statements before any properties and methods of classes.
* Always capitalize the first letter in the name of the new React component.
* Use one definition of the React component per one file.
* Use `export default` for stateless or stateful components. Use `export const` for styled components.
* Use `Props` and `State` names for props and state types for components. Always keep their definitions above the component definition.
* Create new styled components in `styled.ts` files.
* Create generic components that are used in multiple places in the `components` directory. It does not apply to the Playground application.

The maintainers of the repository reserve the right to change these rules.

> **NOTE:** If your code does not follow the mentioned rules, explain the reason for it in your pull request.

## Project structure

If you make any changes in the [project structure](./README.md/#project-structure), remember to update it.
