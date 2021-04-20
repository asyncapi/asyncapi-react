# Using in Angular

If you wanna use the React AsyncAPI component in your Angular project you may want to use the `@asyncapi/web-component` component as a plain web component.

## Overview

Read the document to find out how to use React AsyncAPI component in the Angular project.

## Prerequisites

First read the [Web Component usage](./web-component.md) document and install the `web-component` as described in the mentioned document.

## Usage

To use component in Angular, follow these steps:

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

  > **NOTE**: The easiest way to use the default css is to copy the content of the `@asyncapi/react-component/styles/default.min.css` file to a `assets/default.min.css` file.
