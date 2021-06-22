# Theming

## Overview

The component internally uses for styling the utility-first [TailwindCSS](https://tailwindcss.com/) framework. Check this document to known how to customize styling for component.

## Generate theme from configuration file

As we read in the official docs for [TailwindCSS](https://tailwindcss.com/):

> Because Tailwind is a framework for building bespoke user interfaces, it has been designed from the ground up with customization in mind.

...and this is how the way of customizing styles for the component was also designed. The configuration file should be in the form of a [TailwindCSS configuration file](https://tailwindcss.com/docs/configuration). Then the custom configuration file must be passed to the NodeJS script, which is located inside the `./tools/styles/script.js` in the component's package.

The script itself takes as arguments:

```bash
node ./tools/styles/script.js <output-file> <config-file-path>
```

where:
- `<output-file>` is a relative path for the output css file. It must contains the name of the css file. Example: `./output/custom-theme.css`
- `<config-file-path>` is a relative path to the custom [TailwindCSS configuration file](https://tailwindcss.com/docs/configuration).

Important notes:

- The custom configuration is deeply merged with the [default configuration file](../../library/tools/styles/tailwind.config.js).

- To generate the production-ready, tree-skahable, css styles you should run the script with `NODE_ENV=production` environment:
  
  ```bash
  NODE_ENV=production node ./tools/styles/script.js ./output/custom-theme.css ./custom-config.js
  ```

  Generating production styles will add a `.min.css` suffix to the generated files.

- Script will generate two separate css files, one with `.reset.css` suffix with [Preflight](https://tailwindcss.com/docs/preflight) styles onboard and second without `Preflight` onboard. If you use your own base styles in your project, you should use this one with the `.reset.css` suffix.

- If you installed the `@asyncapi/react-component` package in your project, script should be run with the `./node_modules/@asyncapi/react-component/tools/styles/script.js` path in a root of project.

## Change manually styles

> **NOTE:** This is not the recommended method - better to use the [configuration file](#generate-theme-from-configuration-file).

To manually change the style you can write your own css properties for appropriate TailwindCSS class. For example, to change the a very frequently used color, you can override it by css class:

```css
.text-gray-700 {
  color: red;
}
```

> **NOTE:** Remember that the given override must be loaded after loading the styles from the component.
