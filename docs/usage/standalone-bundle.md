# Standalone bundle

If you are not using React you may want to use the Standalone Bundle of AsyncAPI component with [ReactDOM](https://reactjs.org/docs/react-dom.html) package onboard. It makes it possible to render a component in any other web framework of your choice or in the static HTML webpage.

## Installation

Run this command to install the component in your project:

```sh
npm install --save @asyncapi/react-component
```

## Usage in frameworks

Check how to use the Standalone bundle in:

- [Angular](./angular.md#standalone-bundle)
- [Vue](./vue.md)

## Usage in HTML webpage

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/@asyncapi/react-component@latest/styles/default.min.css">
  </head>
  <body>
    
    <div id="asyncapi"></div>

    <script src="https://unpkg.com/@asyncapi/react-component@latest/browser/standalone/index.js"></script>
    <script>
      AsyncApiStandalone.render({
        schema: {
          url: 'https://raw.githubusercontent.com/asyncapi/spec/v2.0.0/examples/2.0.0/streetlights.yml',
          options: { method: "GET", mode: "cors" },
        },
        config: {
          show: {
            sidebar: true,
          }
        },
      }, document.getElementById('asyncapi'));
    </script>

  </body>
</html>
```

The Standalone Bundle exports two functions: 

- `render`, which works like [ReactDOM.render](https://reactjs.org/docs/react-dom.html#render) function, where first argument is the [props for component](../../README.md#props) and the second is the HTML Node,
- `hydrate`, which works like [ReactDOM.hydrate](https://reactjs.org/docs/react-dom.html#hydrate) function, where first argument is the [props for component](../../README.md#props) and the second is the HTML Node.

> **NOTE**: The Standalone Bundle takes this [same props](../../README.md#props) as the normal React component.

> **NOTE**: If there are several components on one page, each one will be rendered using its own properties.

> **NOTE**: If you don't need [ParserJS](https://github.com/asyncapi/parser-js) inside component, you can use the bundle from `.../browser/standalone/without-parser.js` path of the package.
