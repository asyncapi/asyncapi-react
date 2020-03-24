<h5 align="center">
  <img src="./.github/assets/logo.png" alt="AsyncAPI logo" width="200">
  <br>
  React Component
</h5>
<h4 align="center">A official React component for AsyncAPI 2.0 specification</h4>

---

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

## Overview

A official [React](https://reactjs.org/) component for AsyncAPI 2.0 specification. It allows you to render the documentation of your asynchronous API provided in the AsyncAPI specification format and validate this specification. You can fully restyle the component using your own styles.

> **CAUTION**: This package only supports AsyncAPI 2.0 specification. If you use 1.x, we recommend that you upgrade to the latest AsyncAPI version using the [Node.js](https://github.com/asyncapi/converter) or [Go](https://github.com/asyncapi/converter-go) converters.

## Playground

This repository comes in with a [Playground application](https://asyncapi.github.io/asyncapi-react/). Test it to see the component in action and play with it before you use it in your application.

You can also run the Playground application locally by following [this](./docs/development/guide.md#install-dependencies) instruction from the development guide.

## Prerequisites

- [`react`](https://github.com/facebook/react/) (version 16.8.0 or higher)

## Usage

Run this command to install the component in your project:

```sh
npm install --save @kyma-project/asyncapi-react
```

Check out this simple sandbox application that uses the asyncapi-react component:

[![Edit asyncapi-react-in-action](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/derberg/asyncapi-react-in-action/tree/master/?fontsize=14)

### Props

The list of props for the AsyncAPI React component includes:

- **schema: string | AsyncApiInterface | FetchingSchemaInterface**

  The `schema` property is required and contains AsyncAPI specification. Use the `string` type, the [`AsyncApiInterface`](./library/src/types.ts#L13) type, or the [`FetchingSchemaInterface`](./library/src/helpers/fetchSchema.ts#L1) object to fetch the schema from an external resource. For more information on what it contains and what it should look like, read [AsyncAPI Specification](https://github.com/asyncapi/asyncapi#asyncapi-specification).

- **config?: Partial<ConfigInterface\>**

  The `config` property is optional and contains configuration for the AsyncAPI component. For more information on the available configuration options, read the [Configuration Modification](./docs/configuration/config-modification.md) document.
  This property is concatenated with the [default configuration](./library/src/config/default.ts).

  > **NOTE:** The `Partial<T>` type means that every field in the `T` type is optional.

### Features

For a list and description of features offered by the AsyncAPI React component, see [this](./docs/features) directory.

### Styles

To use default styles based on [SAP Fundamentals](https://sap.github.io/fundamental/), import them as follows:

``` js
import "@kyma-project/asyncapi-react/lib/styles/fiori.css";
```

For information on how to change styles, read the [Style Modification](./docs/configuration/style-modification.md) document.

## Development

For information on how to set up a development environment, write and run tests, follow the naming and architecture convention defined for the project in the [Development Guide](./docs/development/guide.md).

## Releasing

For information on how to release a new version of the library or the playground application, or details on creating a changelog file, read the [Releasing](./docs/development/releasing.md) document.

## Contribution

If you have a feature request, add it as an issue or propose changes in a pull request (PR).
If you create a feature request, use the dedicated **Feature request** issue template. When you create a PR, follow the contributing rules described in the [`CONTRIBUTING.md`](CONTRIBUTING.md) document.

If you have a bug to report, reproduce it in an online code editor. For example, use [CodeSandbox](https://codesandbox.io/). Attach the link to the reproduced bug to your issue. Log the bug using the **Bug report** template.

## Missing features

See the list of features that are still missing in the component:

- [ ] render [`bindings`](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#fixed-fields-19)
- [ ] render [`tags`](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#tagsObject)
- [ ] render [`externalDocs`](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#externalDocumentationObject)
- [ ] render [`schema properties`](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#properties) 
- [ ] render [`correlationID`](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#correlationIdObject)

If you want to help us develop them, feel free to contribute.

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
<table>
  <tr>
    <td align="center"><a href="https://github.com/magicmatatjahu"><img src="https://avatars2.githubusercontent.com/u/20404945?v=4" width="100px;" alt="Maciej Urbańczyk"/><br /><sub><b>Maciej Urbańczyk</b></sub></a><br /><a href="https://github.com/asyncapi/asyncapi-react/commits?author=magicmatatjahu" title="Code">💻</a> <a href="https://github.com/asyncapi/asyncapi-react/commits?author=magicmatatjahu" title="Documentation">📖</a> <a href="#ideas-magicmatatjahu" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-magicmatatjahu" title="Maintenance">🚧</a> <a href="#review-magicmatatjahu" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/asyncapi/asyncapi-react/commits?author=magicmatatjahu" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/kazydek"><img src="https://avatars0.githubusercontent.com/u/40655785?v=4" width="100px;" alt="Karolina Zydek"/><br /><sub><b>Karolina Zydek</b></sub></a><br /><a href="https://github.com/asyncapi/asyncapi-react/commits?author=kazydek" title="Documentation">📖</a> <a href="#review-kazydek" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-kazydek" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/akucharska"><img src="https://avatars3.githubusercontent.com/u/20790348?v=4" width="100px;" alt="Agata"/><br /><sub><b>Agata</b></sub></a><br /><a href="https://github.com/asyncapi/asyncapi-react/commits?author=akucharska" title="Code">💻</a> <a href="#maintenance-akucharska" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://resume.github.io/?derberg"><img src="https://avatars1.githubusercontent.com/u/6995927?v=4" width="100px;" alt="Lukasz Gornicki"/><br /><sub><b>Lukasz Gornicki</b></sub></a><br /><a href="https://github.com/asyncapi/asyncapi-react/commits?author=derberg" title="Documentation">📖</a> <a href="#example-derberg" title="Examples">💡</a> <a href="#ideas-derberg" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/aerfio"><img src="https://avatars0.githubusercontent.com/u/17271979?v=4" width="100px;" alt="Mateusz Puczyński"/><br /><sub><b>Mateusz Puczyński</b></sub></a><br /><a href="https://github.com/asyncapi/asyncapi-react/commits?author=aerfio" title="Code">💻</a> <a href="https://github.com/asyncapi/asyncapi-react/commits?author=aerfio" title="Documentation">📖</a> <a href="#ideas-aerfio" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-aerfio" title="Maintenance">🚧</a> <a href="#review-aerfio" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/asyncapi/asyncapi-react/commits?author=aerfio" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
