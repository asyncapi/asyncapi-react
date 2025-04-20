import React, { Component } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import AsyncApiStandalone from './Standalone';
import {
  isFetchingSchemaInterface,
  ErrorObject,
  PropsSchema,
} from '../../types';
import { ConfigInterface } from '../../config';
import { SpecificationHelpers, Parser } from '../../helpers';
import AsyncapiLogo from '../../assets/asyncapi-logo';

export interface AsyncApiProps {
  schema: PropsSchema;
  config?: Partial<ConfigInterface>;
}

interface AsyncAPIState {
  asyncapi?: AsyncAPIDocumentInterface;
  error?: ErrorObject;
  loading: boolean;
}

class AsyncApiComponent extends Component<AsyncApiProps, AsyncAPIState> {
  state: AsyncAPIState = {
    asyncapi: undefined,
    error: undefined,
    loading: true,
  };

  async componentDidMount() {
    if (this.props.schema) {
      const { schema, config } = this.props;
      await this.parseSchema(schema, config?.parserOptions);
      this.setState({ loading: false });
    }
  }

  async componentDidUpdate(prevProps: AsyncApiProps) {
    const oldSchema = prevProps.schema;
    const newSchema = this.props.schema;

    if (oldSchema !== newSchema) {
      this.setState({ loading: true });
      const { config } = this.props;
      await this.parseSchema(newSchema, config?.parserOptions);
      this.setState({ loading: false });
    }
  }

  render() {
    const { schema, config } = this.props;
    const { asyncapi, error, loading } = this.state;

    if (loading) {
      return (
        <div style={{ height: '100%' }} className="aui-root">
          <div className="flex items-center justify-center h-full w-full">
            <div className="w-full max-w-sm">
              <AsyncapiLogo />
              <div className="loading-bar">
                <div className="loading-moving-bar"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <AsyncApiStandalone
        schema={asyncapi ?? schema}
        config={config}
        error={error}
      />
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async parseSchema(schema: PropsSchema, parserOptions?: any) {
    const parsedSpec = SpecificationHelpers.retrieveParsedSpec(schema);
    if (parsedSpec) {
      this.setState({
        asyncapi: parsedSpec,
      });
      return;
    }

    if (isFetchingSchemaInterface(schema)) {
      const parsedFromUrl = await Parser.parseFromUrl(schema, parserOptions);
      this.setState({
        asyncapi: parsedFromUrl.asyncapi,
        error: parsedFromUrl.error,
      });
      return;
    }

    const parsed = await Parser.parse(schema, parserOptions);
    this.setState({
      asyncapi: parsed.asyncapi,
      error: parsed.error,
    });
  }
}

export default AsyncApiComponent;
