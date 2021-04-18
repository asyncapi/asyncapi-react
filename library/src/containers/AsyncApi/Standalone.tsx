import React, { Component } from 'react';
import { AsyncAPIDocument } from '@asyncapi/parser';
// @ts-ignore
import AsyncAPIDocumentClass from '@asyncapi/parser/lib/models/asyncapi';

import { ErrorObject, PropsSchema } from '../../types';
import { ConfigInterface, defaultConfig } from '../../config';

import { ErrorComponent } from '../Error/Error';

import AsyncApiContent from './Content';

export interface AsyncApiProps {
  schema: PropsSchema;
  config?: Partial<ConfigInterface>;
}

interface AsyncAPIState {
  asyncapi?: AsyncAPIDocument;
  error?: ErrorObject;
}

class AsyncApiComponent extends Component<AsyncApiProps, AsyncAPIState> {
  state: AsyncAPIState = {
    asyncapi: undefined,
    error: undefined,
  };

  constructor(props: AsyncApiProps) {
    super(props);

    const schema = props.schema;
    if (!schema) {
      return;
    }

    if (schema.constructor && schema.constructor.name === 'AsyncAPIDocument') {
      this.state = { asyncapi: schema };
      return;
    }
    if (typeof schema === 'object' && schema['x-parser-parsed'] === true) {
      this.state = { asyncapi: new AsyncAPIDocumentClass(schema) };
    }
  }

  async componentDidMount() {
    if (!this.state.asyncapi) {
      this.updateState(this.props.schema);
    }
  }

  async componentDidUpdate(prevProps: AsyncApiProps) {
    const oldSchema = prevProps.schema;
    const newSchema = this.props.schema;

    if (oldSchema !== newSchema) {
      this.updateState(newSchema);
    }
  }

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
    };

    if (asyncapi === undefined) {
      if (!error) {
        return null;
      }
      return concatenatedConfig.showErrors && <ErrorComponent error={error} />;
    }

    if (!concatenatedConfig.show) {
      return null;
    }

    return <AsyncApiContent asyncapi={asyncapi} config={concatenatedConfig} />;
  }

  private updateState(schema: PropsSchema) {
    if (!schema) {
      return;
    }

    if (schema.constructor && schema.constructor.name === 'AsyncAPIDocument') {
      this.setState({ asyncapi: schema });
      return;
    }
    if (typeof schema === 'object' && schema['x-parser-parsed'] === true) {
      this.setState({ asyncapi: new AsyncAPIDocumentClass(schema) });
    }
  }
}

export default AsyncApiComponent;
