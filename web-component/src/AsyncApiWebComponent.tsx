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
    const finalCssImportPath =
      this.props.cssImportPath || 'assets/asyncapi.css';

    /* Angular 11.0.7 running in 'production mode + enforced stricter type
    checking and stricter bundle budgets' mode showed requirement of explicit
    definition of conditions, hence slightly visually excessive code.
    Both undefined and 'undefined' are used because first has typeof
    'undefined' and the second has typeof 'string'. And these differences do
    matter and work differently in current Angular's usecase, because Angular
    calls 'AsyncApiWebComponent.prototype.render' multiple times for each
    property specified in function 'register', assigning primitive type
    `undefined` to undefined properties first time and assigning string
    `'undefined'` each next time. */

    const props = this.props;
    let schemaUrl = props.schemaUrl;
    let schemaFetchOptions = props.schemaFetchOptions;

    if (!schemaUrl || schemaUrl === 'undefined') {
      schemaUrl = undefined as any;
    }
    if (!schemaFetchOptions || schemaFetchOptions === 'undefined') {
      schemaFetchOptions = undefined as any;
    }

    let schema = props.schema || {};

    if (schemaUrl) {
      const schemaRequestOptions = schemaFetchOptions
        ? JSON.parse(JSON.stringify(schemaFetchOptions))
        : schema.requestOptions || {};
      schema = { url: schemaUrl, requestOptions: schemaRequestOptions };
    }

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
