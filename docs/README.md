# Documentation

This directory contains the following documents that relate to the project:

- configuration:
  - [Configuration Modification](./configuration/config-modification.md) describes the available component configuration options.
- development:
  - [Development Guide](./development/guide.md) describes how to set up a development environment, write, and run tests. It also contains the naming and architecture convention.
- features:
  - [Anchors](./features/anchors.md) describes internal anchors in the AsyncAPI component.
  - [Highlight markdown's code blocks](./features/highlight.md) describes how to add custom language configuration for `highlight.js` used in the component.
  - [Plugin System](./features/plugins.md) describes how to register plugins and create custom plugins.
- usage:
  - [Using in Angular](./usage/angular.md) describes how to use the AsyncAPI component in Angular project.
  - [Using in Vue](./usage/vue.md) describes how to use the AsyncAPI component in Vue project.
  - [Using in NextJS](./usage/nextjs.md) describes how to use the AsyncAPI component in NextJS project.
  - [Standalone bundle usage](./usage/standalone-bundle.md) describes how to use the Standalone Bundle of AsyncAPI component with [ReactDOM](https://reactjs.org/docs/react-dom.html) package onboard.
  - [Web Component usage](./usage/web-component.md) describes how to use the `web-component`.

## Default plugins

The following plugins are integrated into the playground. Install and register them separately when using the React component in your own application.

- [WebSocket](../README.md#default-plugins) ([asyncapi-ws-plugin on npm](https://www.npmjs.com/package/asyncapi-ws-plugin)) lets you connect to WebSocket servers, send messages, and inspect incoming frames against your AsyncAPI specification. The playground enables it automatically for specifications with `ws` or `wss` servers.
