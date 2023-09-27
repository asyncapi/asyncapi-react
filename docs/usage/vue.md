# Using in Vue

If you wanna use the React AsyncAPI component in your Vue project, you may want to use the `AsyncApiStandalone` bundle with `React` and `ReactDom` onboard.

## Prerequisites

First read the [Readme](../../Readme.md) document and install the React AsyncAPI component by:

```sh
npm install --save @asyncapi/react-component
```

## Usage

To use component in Angular, follow these steps:

1. Import `@asyncapi/react-component/browser/standalone` bundle and create similar component as below:

  ```html
  <template>
    <div ref="asyncapi"></div>
  </template>

  <script>
  import AsyncApiStandalone from '@asyncapi/react-component/browser/standalone';

  const schema = `...`; // AsyncAPI specification, fetched or pasted.
  const config = {}; // Configuration for component. This same as for normal React component.

  export default {
    name: 'AsyncApiComponent',
    props: {
      msg: String
    },
    mounted() {
      const container = this.$refs.asyncapi;
      AsyncApiStandalone.render({ schema, config }, container);
    }
  }
  </script>
  ```

2. Copy styles `@asyncapi/react-component/styles/default.min.css` to `assets/asyncapi.min.css` and import in component as:

   ```html
   <style scope src="@/assets/asyncapi.min.css"></style>
   ```

3. Use the component in your application.
