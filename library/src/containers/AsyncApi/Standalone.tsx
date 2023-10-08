import React, { Component } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

import { SpecificationHelpers } from '../../helpers';
import { ErrorObject, PropsSchema } from '../../types';
import { ConfigInterface, defaultConfig } from '../../config';

import AsyncApiLayout from './Layout';
import { Error } from '../Error/Error';

export interface AsyncApiProps {
  schema: PropsSchema;
  config?: Partial<ConfigInterface>;
  error?: ErrorObject;
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

    const parsedSpec = SpecificationHelpers.retrieveParsedSpec(props.schema);
    if (parsedSpec) {
      this.state = { asyncapi: parsedSpec };
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
    const { config, error: propError } = this.props;
    const { asyncapi, error: stateError } = this.state;

    const error = propError || stateError;
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
      return concatenatedConfig.show?.errors && <Error error={error} />;
    }

    return (
      <AsyncApiLayout
        asyncapi={asyncapi}
        config={concatenatedConfig}
        error={error}
      />
    );
  }

  private updateState(schema: PropsSchema) {
    const parsedSpec = SpecificationHelpers.retrieveParsedSpec(schema);
    if (!parsedSpec) {
      this.setState({ asyncapi: undefined });
      return;
    }
    this.setState({ asyncapi: parsedSpec });
  }
}

export default AsyncApiComponent;
