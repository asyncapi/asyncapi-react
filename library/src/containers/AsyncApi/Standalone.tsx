import React, { Component } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

import { Parser, SpecificationHelpers } from '../../helpers';
import {
  ErrorObject,
  isFetchingSchemaInterface,
  PropsSchema,
} from '../../types';
import { ConfigInterface, defaultConfig } from '../../config';

import AsyncApiLayout from './Layout';
import { Error } from '../Error/Error';

export interface AsyncApiProps {
  schema: PropsSchema;
  config?: Partial<ConfigInterface>;
}

interface AsyncAPIState {
  asyncapi?: AsyncAPIDocumentInterface;
  error?: ErrorObject;
}

class AsyncApiComponent extends Component<AsyncApiProps, AsyncAPIState> {
  state: AsyncAPIState = {
    asyncapi: undefined,
    error: undefined,
  };

  constructor(props: AsyncApiProps) {
    super(props);
  }

  componentDidMount = async () => {
    if (!this.state.asyncapi) {
      await this.parseSchemaAndSetState(this.props.schema);
    }
  };

  componentDidUpdate = async (prevProps: AsyncApiProps) => {
    const oldSchema = prevProps.schema;
    const newSchema = this.props.schema;

    if (oldSchema !== newSchema) {
      await this.parseSchemaAndSetState(newSchema);
    }
  };

  render() {
    const { config } = this.props;
    const { asyncapi, error } = this.state;

    const concatenatedConfig: ConfigInterface = {
      ...defaultConfig,
      ...config,
      show: {
        ...defaultConfig.show,
        ...(!!config && config.show),
      },
      expand: {
        ...defaultConfig.expand,
        ...(!!config && config.expand),
      },
      sidebar: {
        ...defaultConfig.sidebar,
        ...(!!config && config.sidebar),
      },
    };

    if (!asyncapi) {
      if (!error) {
        return null;
      }
      return (
        concatenatedConfig.show?.errors && (
          <section className="aui-root">
            <Error error={error} />
          </section>
        )
      );
    }

    return (
      <AsyncApiLayout
        asyncapi={asyncapi}
        config={concatenatedConfig}
        error={error}
      />
    );
  }

  private async parseSchemaAndSetState(
    schema: PropsSchema,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parserOptions?: any,
  ) {
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
