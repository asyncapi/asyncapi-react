import React, { Component } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

import AsyncApiStandalone from './Standalone';

import {
  isFetchingSchemaInterface,
  ErrorObject,
  PropsSchema,
  AsyncApiPlugin,
} from '../../types';
import { ConfigInterface } from '../../config';
import { SpecificationHelpers, Parser } from '../../helpers';
import { PluginManager } from '../../helpers/pluginManager';

export interface AsyncApiProps {
  schema: PropsSchema;
  config?: Partial<ConfigInterface>;
  plugins?: AsyncApiPlugin[];
  onPluginEvent?: (eventName: string, data: unknown) => void;
  onPluginManagerReady?: (pluginManager: PluginManager) => void;
}

interface AsyncAPIState {
  asyncapi?: AsyncAPIDocumentInterface;
  error?: ErrorObject;
}

class AsyncApiComponent extends Component<AsyncApiProps, AsyncAPIState> {
  private parseGeneration = 0;

  componentWillUnmount() {
    this.parseGeneration += 1;
  }

  state: AsyncAPIState = {
    asyncapi: undefined,
    error: undefined,
  };

  async componentDidMount() {
    if (this.props.schema) {
      const { schema, config } = this.props;
      await this.parseSchema(schema, config?.parserOptions);
    }
  }

  async componentDidUpdate(prevProps: AsyncApiProps) {
    const oldSchema = prevProps.schema;
    const newSchema = this.props.schema;

    if (oldSchema !== newSchema) {
      const { config } = this.props;
      await this.parseSchema(newSchema, config?.parserOptions);
    }
  }

  render() {
    const { schema, config, plugins, onPluginEvent, onPluginManagerReady } =
      this.props;
    const { asyncapi, error } = this.state;

    return (
      <AsyncApiStandalone
        schema={asyncapi ?? schema}
        config={config}
        error={error}
        plugins={plugins}
        onPluginEvent={onPluginEvent}
        onPluginManagerReady={onPluginManagerReady}
      />
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async parseSchema(schema: PropsSchema, parserOptions?: any) {
    const generation = ++this.parseGeneration;
    const parsedSpec = SpecificationHelpers.retrieveParsedSpec(schema);
    if (parsedSpec) {
      this.setState({
        asyncapi: parsedSpec,
        error: undefined,
      });
      return;
    }

    if (isFetchingSchemaInterface(schema)) {
      const parsedFromUrl = await Parser.parseFromUrl(schema, parserOptions);
      if (generation !== this.parseGeneration) return;
      this.setState({
        asyncapi: parsedFromUrl.asyncapi,
        error: parsedFromUrl.error,
      });
      return;
    }

    const parsed = await Parser.parse(schema, parserOptions);
    if (generation !== this.parseGeneration) return;
    this.setState({
      asyncapi: parsed.asyncapi,
      error: parsed.error,
    });
  }
}

export default AsyncApiComponent;
