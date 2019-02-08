# AsyncAPI React Component
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

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

[![Edit 5vz8l9zlmn](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/6xym00rv0r)

### Props

The list of props for the AsyncApi React component includes:

  - **schema: string | AsyncApiInterface | FetchingSchemaInterface**

    The `schema` property is required and contains AsyncAPI specification. Use the `string` type, the [`AsyncApiInterface`](./library/src/types.ts#L13) type, or the [`FetchingSchemaInterface`](./library/src/helpers/fetchSchema.ts#L1) object to fetch the schema from an external resource. For more information on what it contains and what it should look like, read [AsyncAPI Specification](https://github.com/asyncapi/asyncapi#asyncapi-specification).

  - **theme?: Partial<ThemeInterface\>**

    The `theme` property is optional and contains styles for specific parts of the AsyncApi component. For information on how to change styles, read the [Theme Modification](./docs/configuration/theme-modification.md) document.

    > **NOTE:** If you do not pass the [**disableDefaultTheme**](./docs/configuration/config-modification.md) config as `true`, this property is concatenated with the [default theme](./library/src/theme/default.ts)

  - **config?: Partial<ConfigInterface\>**

    The `config` property is optional and contains configuration for the AsyncApi component. For more information on the available configuration options, read the [Configuration Modification](./docs/configuration/config-modification.md) document.
    This property is concatenated with the [default configuration](./library/src/config/default.ts).

    > **NOTE:** The `Partial<T>` type means that every field in the `T` type is optional.

## Development

For information on how to set up a development environment, write and run tests, follow the naming and architecture convention defined for the project in the [Development Guide](./docs/development/guide.md).

## Releasing

For information on how to release a new version of the library or the playground application, or details on creating a changelog file, read the [Releasing](./docs/development/releasing.md) document.

## Contribution

If you have a feature request, add it as an issue or propose changes in a pull request (PR).
If you create a feature request, use the dedicated **Feature request** issue template. When you create a PR, follow the contributing rules described in the [`CONTRIBUTING.md`](CONTRIBUTING.md) document.

If you have a bug to report, reproduce it in an online code editor. For example, use [CodeSandbox](https://codesandbox.io/). Attach the link to the reproduced bug to your issue. Log the bug using the **Bug report** template.

## Credits

<p align="center">
 <a href="https://kyma-project.io/" target="_blank">
  <img src="https://raw.githubusercontent.com/kyma-project/kyma/master/logo.png" width="235">
 </a>
</p>

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/20404945?v=4" width="100px;" alt="Maciej Urbańczyk"/><br /><sub><b>Maciej Urbańczyk</b></sub>](https://github.com/magicmatatjahu)<br />[💻](https://github.com/asyncapi/asyncapi-react/commits?author=magicmatatjahu "Code") [📖](https://github.com/asyncapi/asyncapi-react/commits?author=magicmatatjahu "Documentation") [🤔](#ideas-magicmatatjahu "Ideas, Planning, & Feedback") [🚧](#maintenance-magicmatatjahu "Maintenance") | [<img src="https://avatars0.githubusercontent.com/u/40655785?v=4" width="100px;" alt="Karolina Zydek"/><br /><sub><b>Karolina Zydek</b></sub>](https://github.com/kazydek)<br />[📖](https://github.com/asyncapi/asyncapi-react/commits?author=kazydek "Documentation") [👀](#review-kazydek "Reviewed Pull Requests") [🚧](#maintenance-kazydek "Maintenance") | [<img src="https://avatars3.githubusercontent.com/u/20790348?v=4" width="100px;" alt="Agata"/><br /><sub><b>Agata</b></sub>](https://github.com/akucharska)<br />[💻](https://github.com/asyncapi/asyncapi-react/commits?author=akucharska "Code") [🚧](#maintenance-akucharska "Maintenance") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!