# AsyncAPI React Component

## Overview

A [React](https://reactjs.org/) component for AsyncAPI specification. It allows you to render the documentation of your asynchronous API provided in the AsyncAPI specification format and validate this specification. You can fully restyle the component using your own styles.

## Playground

This repository comes in with a [Playground application](https://www.asyncapi.com/asyncapi-react/). Test it to see the component in action and play with it before you use it in your application.

You can also run the Playground application locally by following [this](development-guide.md#install-dependencies) instruction from the development guide.

## Usage

> **NOTE:** Use React version 16.0.0 or higher and styled-components version 4.0.0 or higher.

Run this command to install the component:

``` sh
$ npm install --save @kyma-project/asyncapi-react
```

Check out this simple sandbox application that uses the asyncapi-react component:

[![Edit 5vz8l9zlmn](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5vz8l9zlmn)

### Props

The list of props for the AsyncApi React component includes:

   - **schema: string | AsyncApiInterface**

     The `schema` property is required and contains AsyncAPI specification. It should be one of the `string` or [`AsyncApiInterface`](./library/src/types.ts#L13) type. For more information on what it contains and what it should look like, read [AsyncAPI Specification](https://github.com/asyncapi/asyncapi#asyncapi-specification).

   - **theme?: Partial<ThemeInterface\>**

     The `theme` property is optional and contains styles for specific parts of the AsyncApi component. For information on how to change styles, read the [Theme Modification](./docs/theme-modification.md) document.

     > **NOTE:** If you do not pass the [**disableDefaultTheme**](./docs/config-modification.md) config as `true`, this property is concatenated with the [default theme](./library/src/theme/default.ts)

   - **config?: Partial<ConfigInterface\>**

     The `config` property is optional and contains configuration for the AsyncApi component. For more information on the available configuration options, read the [Configuration Modification](./docs/config-modification.md) document.
     This property is concatenated with the [default configuration](./library/src/config/default.ts).

     > **NOTE:** The `Partial<T>` type means that every field in the `T` type is optional.

## Development

For information on how to set up a development environment, write and run tests, follow the naming and architecture convention defined for the project in the [Development Guide](./development-guide.md).

## Contribution

If you have a feature request, add it as an issue or propose changes in a pull request (PR).
If you create a feature request, use the dedicated **Feature request** issue template. When you create a PR, follow the contributing rules described in the [`CONTRIBUTING.md`](CONTRIBUTING.md) document.

If you have a bug to report, reproduce it in an online code editor. For example, use [CodeSandbox](https://codesandbox.io/). Attach the link to the reproduced bug to your issue. Log the bug using the **Bug report** template.

## Releasing

1. Generate the changelog using the [`lerna-changelog`](https://github.com/lerna/lerna-changelog) tool. Run the following command to generate the changelog content for PRs merged after creating the last Git tag:

    ```
    npm run changelog
    ```

    You can also generate the changelog content corresponding to PRs merged in-between particular Git tags:

    ```
    npm run changelog -- --from=v0.1.1 --to=v0.1.2
    ```

    The `lerna-changelog` tool detects changes based on PR labels and maps them to sections as per the configuration in the `package.json` file.

    ```
      "changelog": {
        "labels": {
          "breaking": ":boom: Breaking Changes",
          "enhancement": ":rocket: Enhancements",
          "bug": ":bug: Fixed",
          "area/library": ":zap: Library",
          "area/playground": ":video_game: Playground app",
          "area/documentation": ":memo: Documentation"
        }
        ...
      }
    ```

2. The generated code should look as follows:
```
## Unreleased (2018-12-13)

#### :bug: Fixed
* [#24](https://github.com/asyncapi/asyncapi-react/pull/24) Downgrade required peer dependency version ([@pkosiec](https://github.com/pkosiec))

#### :zap: Library
* [#24](https://github.com/asyncapi/asyncapi-react/pull/24) Downgrade required peer dependency version ([@pkosiec](https://github.com/pkosiec))

#### Committers: 1
- Paweł Kosiec ([@pkosiec](https://github.com/pkosiec))
```

3. Go to GitHub to [create a new release](https://github.com/asyncapi/asyncapi-react/releases) and paste the generated code as a description. Do not include the **Committers** section.

Make sure you change `## Unreleased ({date})` or `## {tag} ({date})` to `## Released ({date})`. 

## Credits

<p align="center">
 <a href="https://kyma-project.io/" target="_blank">
  <img src="https://raw.githubusercontent.com/kyma-project/kyma/master/logo.png" width="235">
 </a>
</p>
