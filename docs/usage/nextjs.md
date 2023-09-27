# Using in NextJS

Read the document to find out how to use React AsyncAPI component in the NextJS project. You can generate static documentation using the component or embed a dynamic component (for dynamic data) in your application.

## Prerequisites

First read the [Readme](../../Readme.md) document and install the React AsyncAPI component by:

```sh
npm install --save @asyncapi/react-component@next
```

## Usage without SSR/SSG (dynamic documentation)

As mentioned in the introduction, the component can generate static documentation or be embedded in the application as a dynamic component for dynamic data.

The `@asyncapi/react-component` package has a special `umd` bundle that can be used in the NextJS project. Unfortunately, it only works in the browser itself (due to some dependencies). Due to the universal/isomorphic nature (JS code can run on the server and client side) of NextJS, it is recommended to use the component as below:

```jsx
// Import component using `dynamic` helper
import dynamic from 'next/dynamic';

// Import styles
import "@asyncapi/react-component/styles/default.min.css";

// Import component without SSR/SSG
const AsyncApiComponent = dynamic(() => import('@asyncapi/react-component/browser'), { ssr: false });

// `schema` and `config` are these same properties as for normal AsyncAPI React component
export default function AsyncApiDocs({ schema, config }) {
  // Render on the browser only
  if (typeof navigator === 'undefined') return null;
  return schema && <AsyncApiComponent schema={schema} config={config} />;
}
```

## Usage with SSR/SSG (static documentation)

To generate static documentation (and then hydrate it), we need to download an [AsyncAPI Parser](https://github.com/asyncapi/parser-js) that will validate and parse our specs before rendering it - by default, the `@asyncapi/react-component/browser` bundle has a parser built into the component.

```sh
npm install --save @asyncapi/parser
```

Then we need to use the parser and component as follows:

```js
import { parse } from "@asyncapi/parser";
// import component without parser onboard
import { AsyncApiComponentWP } from "@asyncapi/react-component";

// Import styles
import "@asyncapi/react-component/styles/default.min.css";

export default function AsyncApiDocsPage({ asyncapi }) {
  const config = {}; // Configuration for component. This same as for normal React component
  return (
    <AsyncApiComponentWP schema={asyncapi} config={config} />
  )
}

// This function gets called at build time
export async function getStaticProps() {
  const schema = `...`; // AsyncAPI specification, fetched or pasted.

  // validate and parse
  const parsed = await parse(schema);
  // Circular references are not supported. See https://github.com/asyncapi/parser-js/issues/293
  const stringified = JSON.stringify(parsed.json());

  return {
    props: {
      asyncapi: stringified,
    },
  }
}
```

Some benefits using above solution:

- specification is validated and parsed in build time of page, thus avoiding unnecessary operations on the browser side. Finally rendering is faster.
- final bundle of page is much less. The component with the parser weights around 700kb compared to 150kb without.
