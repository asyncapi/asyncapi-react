# Using in NextJS

## Overview

Read the document to find out how to use React AsyncAPI component in the NextJS project.

## Prerequisites

First read the [Readme](../../Readme.md) document  and install the React AsyncAPI component by:

```sh
npm install --save @asyncapi/react-component
```

## Usage

The `@asyncapi/react-component` package has a special `umd` bundle that can be used in the NextJS project. Unfortunately, they only work in the browser itself. Due to the universal/isomorphic (JS code can run on the server and client side) nature of NextJS, it is recommended to use the component as below.

```jsx
// Import component using `dynamic` helper
import dynamic from 'next/dynamic';
import "@asyncapi/react-component/styles/default.min.css";

export default function AsyncAPIPreview ({ schema, config }) {
  // Render on the browser only
  if (typeof navigator === 'undefined') return null;
  // Import component only in the browser
  const AsyncAPIUI = dynamic(() => import('@asyncapi/react-component/bundles/umd/asyncapi-ui.min'));

  return schema && <AsyncAPIUI schema={code} config={config} />;
}
```
