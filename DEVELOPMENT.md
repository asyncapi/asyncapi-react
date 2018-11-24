# DEVELOPMENT

## Overview

This repository uses [`Lerna`](https://github.com/lerna/lerna) for managing local dependencies and better development experience.

## Install dependencies

To install all dependencies for [`playground`](./playground) app and prepare symlink for [`library`](./library) package, run the following commands:

``` sh
$ npm install
$ npm run bootstrap
```

> **NOTE:** To clear dependencies and remove symlink, run this command:
> ``` sh
> $ npm run clean
> ```

## Launch development environment

Launch the development server with the hot reloading functionality that allows any change in files in the `playground/src` and `library/src` folders to be immediately visible in the browser by the following command:

``` sh
$ npm start
```

Then a live development server will be available at [localhost:3000](http://localhost:3000/).

## Tests

To launch tests for [`playground`](./playground) and [`library`](./library) package, run command:

``` sh 
$ npm test
```

If you want run only the tests for specific part of repository, please run command:

``` sh 
$ npm run test:{PART}
```

where `{PART}` must be a `playground` or `library`.

## Naming & architecture convention

Below are the rules of the naming functions/components and architecture that we use throughout in the `playground` and `library` projects:

* Uses two-space indentation.
* Follow the camel case convention for variables and functions, typing the words in lower-case, only capitalizing the first letter in each word.
* Do not use `_` underbar as the first or last character of a name, even for private variables or functions.
* Do not use `$` dollar sign or `\` backslash in any place.
* Global constants should be capitalizing - separate the words with a `_` underbar sign.
* Each line should contain at most one statement.
* Always put the opening brace on the same line as the previous statement.
* Avoid using the ternary operator (`statement ? true : false`) - use the guard `&&` instead.
* Do not use prefix or suffix on interface like `IVariable` or `VariableInterface` - does not apply to `AsyncApiInterface`, `ConfigInterface` or `ThemeInterface`.
* Do not use public statement before any properties and methods of class.
* The name of the new React component always must start with capitalizing the first letter.
* Use the rule: One definition of React component per one file.
* Use `export default` for stateless or stateful components - for styled use `export const`.
* Use `Props` and `State` names for props and state types for components and always keep their definitions above component definition.
* Create the new styled components in `styled.ts` files.
* The generic components (using in multiple place) create in `components` directory - does not apply to the `playground` app.

> **NOTE:** The maintainers of the repository reserve the right to change the above rules.

> **NOTE 2:** In the Pull Request you can describe why your code does not apply the above rules (we do not bite :smile:).
