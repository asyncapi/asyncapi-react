import * as React from 'react';
// @ts-ignore
import { register } from 'web-react-components';
import AsyncApiComponent, {
  AsyncApiProps,
  FetchingSchemaInterface,
} from '@asyncapi/react-component';

/**
 * Angular 11.0.7 running in 'production mode + enforced stricter type
    checking and stricter bundle budgets' mode showed requirement of explicit
    definition of conditions, hence slightly visually excessive code.
    Both undefined and 'undefined' are used because first has typeof
    'undefined' and the second has typeof 'string'. And these differences do
    matter and work differently in current Angular's usecase, because Angular
    calls 'AsyncApiWebComponent.prototype.render' multiple times for each
    property specified in function 'register', assigning primitive type
    `undefined` to undefined properties first time and assigning string
    `'undefined'` each next time.  
 */
function retrieveSchemaProp(
  props: AsyncApiWebComponentProps,
): FetchingSchemaInterface {
  let schemaUrl = props.schemaUrl;
  let schemaFetchOptions = props.schemaFetchOptions;

  if (!schemaUrl || schemaUrl === 'undefined') {
    schemaUrl = undefined as any;
  }
  if (!schemaFetchOptions) {
    schemaFetchOptions = undefined as any;
  }

  let schema = props.schema || {};
  if (schemaUrl) {
    const schemaRequestOptions = schemaFetchOptions
      ? JSON.parse(JSON.stringify(schemaFetchOptions))
      : (schema as FetchingSchemaInterface).requestOptions || {};
    schema = { url: schemaUrl, requestOptions: schemaRequestOptions };
  }

  return schema as FetchingSchemaInterface; // NOSONAR
}

export interface AsyncApiWebComponentProps extends AsyncApiProps {
  cssImportPath?: string;
  schemaFetchOptions?: RequestInit;
  schemaUrl: string;
}

export class AsyncApiWebComponent extends React.Component<
  AsyncApiWebComponentProps
> {
  private lastUrlCheck: number = Date.now();

  constructor(props: AsyncApiWebComponentProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<AsyncApiWebComponentProps>) {
    const prevSchema = retrieveSchemaProp(this.props);
    const nextSchema = retrieveSchemaProp(nextProps);

    if (!prevSchema || !nextSchema || !prevSchema.url || !nextSchema.url) {
      return true;
    }
    if (prevSchema.url === nextSchema.url) {
      const dateNow = Date.now();
      // if the difference between updates of the same urls occurred less or equal than 25 milliseconds, consider no change.
      if (this.lastUrlCheck <= dateNow - 25) {
        this.lastUrlCheck = dateNow;
        return true;
      }
      return false;
    }
    return true;
  }

  render() {
    const props = this.props;
    const finalCssImportPath = props.cssImportPath || 'assets/default.min.css';
    const schema = retrieveSchemaProp(this.props);

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
