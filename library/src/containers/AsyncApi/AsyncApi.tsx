import React, { Component } from 'react';
import { AsyncAPIDocument } from '@asyncapi/parser';

import {
  isFetchingSchemaInterface,
  ErrorObject,
  PropsSchema,
} from '../../types';
import { ConfigInterface, defaultConfig } from '../../config';
import { parser, bemClasses, stateHelpers } from '../../helpers';
import { CSS_PREFIX } from '../../constants';
import { useSpec, useExpandedContext, useChangeHashContext } from '../../store';

import { ErrorComponent } from '../Error/Error';
import { InfoComponent } from '../Info/NewInfo';
import { ServersComponent } from '../Servers/Servers';
import { Operations } from '../Channels/Operations';
import { Messages } from '../Messages/Messages';

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
  }

  async componentDidMount() {
    this.parseSchema(
      this.props.schema,
      this.props.config && this.props.config.parserOptions,
    );
  }

  async componentDidUpdate(prevProps: AsyncApiProps) {
    const { schema } = prevProps;

    if (schema !== this.props.schema) {
      this.parseSchema(
        this.props.schema,
        this.props.config && this.props.config.parserOptions,
      );
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

    bemClasses.setSchemaID(concatenatedConfig.schemaID);
    const numberOfElement = stateHelpers.calculateNumberOfElements({
      spec: asyncapi.json(),
      showConfig: concatenatedConfig.show,
    });
    const initialExpandedElements = stateHelpers.calculateInitialExpandedElements(
      {
        spec: asyncapi.json(),
        showConfig: concatenatedConfig.show,
        expandConfig: concatenatedConfig.expand || {},
      },
    );

    return (
      <useSpec.Provider spec={asyncapi}>
        <useExpandedContext.Provider
          numberOfElements={numberOfElement}
          numberOfExpandedElement={initialExpandedElements}
        >
          <useChangeHashContext.Provider schemaName={bemClasses.getSchemaID()}>
            <main className={CSS_PREFIX} id={bemClasses.getSchemaID()}>
              {concatenatedConfig.showErrors && !!error && (
                <ErrorComponent error={error} />
              )}
              {concatenatedConfig.show.info && <InfoComponent />}
              {concatenatedConfig.show.servers && (
                <ServersComponent
                  expand={
                    concatenatedConfig.expand &&
                    concatenatedConfig.expand.servers
                  }
                />
              )}
              {concatenatedConfig.show.channels && <Operations />}
              {concatenatedConfig.show.messages && <Messages />}
            </main>
          </useChangeHashContext.Provider>
        </useExpandedContext.Provider>
      </useSpec.Provider>
    );
  }

  private async parseSchema(schema: PropsSchema, parserOptions?: any) {
    if (isFetchingSchemaInterface(schema)) {
      const parsedFromUrl = await parser.parseFromUrl(schema, parserOptions);
      this.setState({
        asyncapi: parsedFromUrl.asyncapi,
        error: parsedFromUrl.error,
      });
      return;
    }

    const parsed = await parser.parse(schema, parserOptions);
    this.setState({
      asyncapi: parsed.asyncapi,
      error: parsed.error,
    });
  }
}

export default AsyncApiComponent;
