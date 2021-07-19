# Web Component

If you are not using React you may want to use the `@asyncapi/web-component` component as a plain web component in any other web framework of your choice or as an element of a static HTML webpage. This is achieved by making use of [web-react-components](https://www.npmjs.com/package/web-react-components).

## Installation

Run this command to install the component in your project:

```sh
npm install --save @asyncapi/web-component
```

Check out this simple sandbox application that uses the Web Component in Angular project:

[![Edit asyncapi-web-component-in-action](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/asyncapi-web-component-in-action-l652x)

## Usage in frameworks

Check how to use the Web Component in:

- [Angular](./angular.md#web-component)

## Usage in HTML webpage

```html
<!-- Remove 'webcomponentsjs' if no support for older browsers is required -->
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.5.0/webcomponents-bundle.js"></script>
<script src="https://unpkg.com/@asyncapi/web-component@0.24.0/lib/asyncapi-web-component.js" defer></script>

<asyncapi-component
  schemaUrl="https://raw.githubusercontent.com/asyncapi/asyncapi/master/examples/2.0.0/streetlights.yml"
  config='{"show": {"info": false}}'
  schemaFetchOptions='{"method":"GET","mode":"cors"}' <!-- Remove if it is only a plain browser request -->
  cssImportPath="https://unpkg.com/@asyncapi/react-component@0.24.0/styles/default.min.css">
</asyncapi-component>
```

> **NOTE**: [webcomponentsjs](https://www.npmjs.com/package/@webcomponents/webcomponentsjs) is a series of polyfills to make code runnable in old browsers. It is **optional** if you do not intend to support any.

> **NOTE**: If a Web Component is called with no properties at all, the error will be shown on the page.

> **NOTE**: If there are several Web Components on one page, each one will be rendered using its own properties.

## Props

When invoked as an independent entity, Web Component takes the following props (as it is still a React component):

- `schema` is a `schema` property from the React component,
    > **NOTE**: Since version 0.19.0 specifying a `schema` object can be omitted. `schema.url` and `schema.requestOptions` can be replaced with `schemaUrl` and `schemaFetchOptions` properties accordingly.
- `config` is an **optional** `config` property from the React component in the stringified JSON format,
- `schemaUrl` property is a `string`, specific to Web Component, containing a URL to fetch an AsyncAPI Schema from. It is a wrapper for `schema.url` property in `schema` object under the hood,
    > **NOTE**: If `schemaUrl` property is specified, the `schema.url` property of the React component will be ignored.
- `schemaFetchOptions` property is an **optional** `object` of [RequestInit](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html) type in JSON format, specific to Web Component, containing additional fetching options. It is a wrapper for `schema.requestOptions` property in `schema` object, which are both needed only in case process of fetching from a URL is any different from a usual browser request,
    > **NOTE**: If `schemaFetchOptions` property is specified, `schema.requestOptions` property of the React component will be ignored. If `schemaUrl` property is NOT specified, `schemaFetchOptions` will be ignored itself and `schema.url`/`schema.requestOptions` properties of the React component must be used in this case.
- `cssImportPath` property is the path to styles. Default version from `unpkg.com` contains guaranteed minimum styling for the Web Component,
