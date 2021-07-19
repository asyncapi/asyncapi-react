# Using in Angular

If you wanna use the React AsyncAPI component in your Angular project, you have two options:

- you may want to use the `AsyncApiStandalone` bundle with `React` and `ReactDom` onboard (preferred option).
- you may want to use the `@asyncapi/web-component` component as a plain web component.

## Standalone Bundle

### Prerequisites

First read the [Readme](../../Readme.md) document and install the React AsyncAPI component by:

```sh
npm install --save @asyncapi/react-component
```

### Usage

To use component in Angular, follow these steps:

1. Import `@asyncapi/react-component/browser/standalone` bundle and create similar component as below:

  ```ts
  import { Component, ElementRef, OnDestroy, AfterViewInit, } from '@angular/core';
  import AsyncApiStandalone from "@asyncapi/react-component/browser/standalone";

  @Component({
    selector: 'asyncapi',
    template: `
      <div id="asyncapi-doc"></div>
    `,
    styleUrls: ['./asyncapi.component.scss']
  })
  export class AsyncApiComponent implements OnDestroy, AfterViewInit {
    constructor(private element: ElementRef) {}

    ngAfterViewInit() {
      const schema = `...`; // AsyncAPI specification, fetched or pasted.
      const config = {}; // Configuration for component. This same as for normal React component
      const container = this.element.nativeElement.querySelector('#asyncapi-doc');
      AsyncApiStandalone.render({ schema, config }, container);
    }

    ngOnDestroy(): void {
      this.element.nativeElement.querySelector('#asyncapi-doc').remove();
    }
  }
  ```

2. Update given `NgModule` in which you want to use the component by importing the component into the `declarations` array.

3. Import styles from `@asyncapi/react-component/styles/default.min.css`:

   - import styles in main `css` file by `@import @asyncapi/react-component/styles/default.min.css`.
   - or import styles using path `node_modules/@asyncapi/react-component/styles/default.min.css` in `angular.json` file.
   - or copy content from `@asyncapi/react-component/styles/default.min.css` to `assets/asyncapi.min.css` and import file like in the second point.

4. Use the component in your application.

## Web component

### Prerequisites

First read the [Web Component usage](./web-component.md) document and install the `web-component` as described in the mentioned document.

### Usage

To use the component in Angular, follow these steps:

1. Update `AppModule` by adding the `CUSTOM_ELEMENTS_SCHEMA` to the `schemas` array in the `NgModule` metadata:

  ```ts
  import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

  @NgModule({
    ...
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
    ]
  })
  export class AppModule {}
  ```

2. Import the `@asyncapi/web-component` module in an Angular's component where you want to use the web component: 

  ```ts
  import { Component } from '@angular/core';
  import '@asyncapi/web-component/lib/asyncapi-web-component';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    ...
  }
  ```

3. Use web component in the template as follows:

  ```html
  <asyncapi-component
    [schema]="schema"
    [config]="config"
    [schemaUrl]="schemaUrl"
    [schemaFetchOptions]="schemaFetchOptions"
    [cssImportPath]="cssImportPath">
  </asyncapi-component>
  ```
 
  where:
  
  - `schema`, `config`, `schemaUrl`, `schemaFetchOptions` are Web Component's properties used in any valid combination, as described in [Web Component specification](#web-component),
  - `cssImportPath` is the path to styles. By default it is `assets/default.min.css`

  > **NOTE**: The easiest way to use the default `css` is to copy the content of the `@asyncapi/react-component/styles/default.min.css` file to a `assets/default.min.css` file.
