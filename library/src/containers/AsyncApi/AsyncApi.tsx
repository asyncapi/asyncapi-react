import React, { PureComponent } from 'react';
import { AsyncAPIDocument } from '@asyncapi/parser';

import AsyncApiUIStandalone from './Standalone';

import {
  isFetchingSchemaInterface,
  ErrorObject,
  PropsSchema,
} from '../../types';
import { ConfigInterface } from '../../config';
import { Parser } from '../../helpers';

export interface AsyncApiProps {
  schema: PropsSchema;
  config?: Partial<ConfigInterface>;
}

interface AsyncAPIState {
  asyncapi?: AsyncAPIDocument;
  error?: ErrorObject;
}

class AsyncApiComponent extends PureComponent<AsyncApiProps, AsyncAPIState> {
  state: AsyncAPIState = {
    asyncapi: undefined,
    error: undefined,
  };

  constructor(props: AsyncApiProps) {
    super(props);
  }

  async componentDidMount() {
    if (this.props.schema) {
      this.updateState(this.props.schema, this.props.config);
    }
  }

  render() {
    const { schema, config } = this.props;
    const { asyncapi } = this.state;

    return <AsyncApiUIStandalone schema={asyncapi || schema} config={config} />;
  }

  private updateState(schema: PropsSchema, config?: Partial<ConfigInterface>) {
    this.parseSchema(schema, config && config.parserOptions);
  }

  private async parseSchema(schema: PropsSchema, parserOptions?: any) {
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
