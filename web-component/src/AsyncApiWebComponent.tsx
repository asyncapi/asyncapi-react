import * as React from 'react';
// @ts-ignore
import { register } from 'web-react-components';
import AsyncApiComponent, { AsyncApiProps } from '@asyncapi/react-component';

export interface AsyncApiWebComponentProps extends AsyncApiProps {
  cssImportPath?: string;
  schemaFetchOptions?: RequestInit;
  schemaUrl: string;
}

export class AsyncApiWebComponent extends React.Component<
  AsyncApiWebComponentProps
> {
  constructor(props: AsyncApiWebComponentProps) {
    super(props);
  }

  render() {
    // Angular 11.0.7 running in 'production mode + enforced stricter type
    // checking and stricter bundle budgets' mode showed requirement of explicit
    // definition of conditions, hence visually excessive code.
    // Both undefined and 'undefined' are used because first has typeof
    // 'undefined' and the second has typeof 'string'. And these differences do
    // matter and work differently in current Angular's usecase, because Angular
    // calls 'AsyncApiWebComponent.prototype.render' multiple times for each
    // property specified in function 'register' (while static HTML webpage
    // calls it only once) +1 more time at the end - assigning primitive type
    // `undefined` to undefined properties first time and assigning string
    // `'undefined'` each next time.
    let schemaUrl;
    let schemaFetchOptions;

    const finalCssImportPath =
      this.props.cssImportPath || 'assets/asyncapi.css';

    const thisPropsSchema =
      this.props.schema !== undefined ? this.props.schema : {};

    // if 'schemaUrl' is specified, it has absolute priority before 'schema.url'.
    if (
      (this.props.schemaUrl !== undefined &&
        thisPropsSchema.url !== undefined) ||
      (this.props.schemaUrl !== undefined && thisPropsSchema.url === undefined)
    ) {
      schemaUrl = this.props.schemaUrl;
    }
    // if 'schemaUrl' is not specified, 'schema.url' will be used.
    if (
      (this.props.schemaUrl === undefined &&
        thisPropsSchema.url !== undefined) ||
      (this.props.schemaUrl === 'undefined' &&
        thisPropsSchema.url !== undefined)
    ) {
      schemaUrl = thisPropsSchema.url;
    }
    // If neither 'schemaUrl' nor 'schema.url' are specified, nothing needs to
    // be done - setting of 'schema.url' to 'undefined' will be done automatically.

    // if 'schemaFetchOptions' is specified, it has absolute priority before
    // 'schema.requestOptions'.
    if (
      (this.props.schemaFetchOptions !== undefined &&
        thisPropsSchema.requestOptions !== undefined) ||
      (this.props.schemaFetchOptions !== undefined &&
        thisPropsSchema.requestOptions === undefined)
    ) {
      schemaFetchOptions = this.props.schemaFetchOptions;
    }
    // if 'schemaFetchOptions' is not specified, 'schema.requestOptions' will be used.
    if (
      this.props.schemaFetchOptions === undefined &&
      thisPropsSchema.requestOptions !== undefined
    ) {
      schemaFetchOptions = thisPropsSchema.requestOptions;
    }
    // 'schemaFetchOptions' is ignored if 'schemaUrl' is not specified.
    if (
      (this.props.schemaFetchOptions !== undefined &&
        this.props.schemaUrl === undefined) ||
      (this.props.schemaFetchOptions !== undefined &&
        this.props.schemaUrl === 'undefined')
    ) {
      schemaFetchOptions = thisPropsSchema.requestOptions;
    }
    // If neither 'schemaFetchOptions' nor 'schema.requestOptions' are
    // specified, 'schema.requestOptions' will be set to an empty object when
    // collective object 'schema' is formed.
    if (
      (this.props.schemaFetchOptions === undefined &&
        thisPropsSchema.requestOptions === undefined) ||
      (this.props.schemaFetchOptions === undefined &&
        thisPropsSchema.requestOptions === 'undefined') ||
      (this.props.schemaFetchOptions === 'undefined' &&
        thisPropsSchema.requestOptions === undefined) ||
      (this.props.schemaFetchOptions === 'undefined' &&
        thisPropsSchema.requestOptions === 'undefined')
    ) {
      schemaFetchOptions = undefined;
    }

    const schemaRequestOptions = schemaFetchOptions
      ? JSON.parse(JSON.stringify(schemaFetchOptions))
      : {};

    const schema = { url: schemaUrl, requestOptions: schemaRequestOptions };

    return (
      <>
        <style>@import '{finalCssImportPath}';</style>
        <AsyncApiComponent {...this.props} schema={schema} />
      </>
    );
  }
}

register(AsyncApiWebComponent, 'asyncapi-component', [
  'schema',
  'schemaFetchOptions',
  'schemaUrl',
  'config',
  'cssImportPath',
]);
