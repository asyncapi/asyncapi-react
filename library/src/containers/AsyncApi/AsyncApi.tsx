import React, { Component } from 'react';

import {
  AsyncAPI,
  isFetchingSchemaInterface,
  NullableAsyncApi,
  ErrorObject,
  AsyncApiProps,
  PropsSchema,
} from '../../types';
import { ConfigInterface, defaultConfig } from '../../config';
import { beautifier, bemClasses, stateHelpers, Parser } from '../../helpers';
import { CSS_PREFIX } from '../../constants';
import { useExpandedContext, useChangeHashContext } from '../../store';

import { ErrorComponent } from '../Error/Error';
import { InfoComponent } from '../Info/Info';
import { ChannelsComponent } from '../Channels/Channels';
import { ServersComponent } from '../Servers/Servers';
import { MessagesComponent } from '../Messages/Messages';
import { SchemasComponent } from '../Schemas/Schemas';

interface AsyncAPIState {
  validatedSchema: NullableAsyncApi;
  error?: ErrorObject;
}

const defaultAsyncApi: AsyncAPI = {
  asyncapi: '2.0.0-rc2',
  info: {
    title: 'AsyncApi example title',
    version: '1.0.0',
  },
  channels: {},
};

class AsyncApiComponent extends Component<AsyncApiProps, AsyncAPIState> {
  state: AsyncAPIState = {
    validatedSchema: defaultAsyncApi,
    error: undefined,
  };
  private readonly parser: Parser;

  constructor(props: AsyncApiProps) {
    super(props);
    this.parser = new Parser();
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
    const { validatedSchema, error } = this.state;
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

    if (!validatedSchema || !Object.keys(validatedSchema).length) {
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
      spec: validatedSchema,
      showConfig: concatenatedConfig.show,
    });
    const initialExpandedElements = stateHelpers.calculateInitialExpandedElements(
      {
        spec: validatedSchema,
        showConfig: concatenatedConfig.show,
        expandConfig: concatenatedConfig.expand || {},
      },
    );

    return (
      <useExpandedContext.Provider
        numberOfElements={numberOfElement}
        numberOfExpandedElement={initialExpandedElements}
      >
        <useChangeHashContext.Provider schemaName={bemClasses.getSchemaID()}>
          <main className={CSS_PREFIX} id={bemClasses.getSchemaID()}>
            {concatenatedConfig.showErrors && !!error && (
              <ErrorComponent error={error} />
            )}
            {concatenatedConfig.show.info && validatedSchema.info && (
              <InfoComponent
                info={validatedSchema.info}
                defaultContentType={validatedSchema.defaultContentType}
              />
            )}
            {concatenatedConfig.show.channels && validatedSchema.channels && (
              <ChannelsComponent
                channels={validatedSchema.channels}
                expand={
                  concatenatedConfig.expand &&
                  concatenatedConfig.expand.channels
                }
              />
            )}
            {concatenatedConfig.show.servers && !!validatedSchema.servers && (
              <ServersComponent
                servers={validatedSchema.servers}
                securitySchemes={
                  validatedSchema.components &&
                  validatedSchema.components.securitySchemes
                }
                expand={
                  concatenatedConfig.expand && concatenatedConfig.expand.servers
                }
              />
            )}
            {validatedSchema.components && (
              <section className={bemClasses.element(`components`)}>
                {concatenatedConfig.show.messages &&
                  validatedSchema.components.messages && (
                    <MessagesComponent
                      messages={validatedSchema.components.messages}
                      expand={
                        concatenatedConfig.expand &&
                        concatenatedConfig.expand.messages
                      }
                    />
                  )}
                {concatenatedConfig.show.schemas &&
                  validatedSchema.components.schemas && (
                    <SchemasComponent
                      schemas={validatedSchema.components.schemas}
                      expand={
                        concatenatedConfig.expand &&
                        concatenatedConfig.expand.schemas
                      }
                    />
                  )}
              </section>
            )}
          </main>
        </useChangeHashContext.Provider>
      </useExpandedContext.Provider>
    );
  }

  private async parseSchema(schema: PropsSchema, parserOptions?: any) {
    if (isFetchingSchemaInterface(schema)) {
      const parsedFromUrl = await this.parser.parseFromUrl(
        schema,
        parserOptions,
      );
      this.setState({
        validatedSchema: this.beautifySchema(parsedFromUrl.data),
        error: parsedFromUrl.error,
      });
      return;
    }

    const parsed = await this.parser.parse(schema, parserOptions);
    this.setState({
      validatedSchema: this.beautifySchema(parsed.data),
      error: parsed.error,
    });
  }

  private beautifySchema(schema: NullableAsyncApi): NullableAsyncApi {
    if (!schema) {
      return null;
    }
    return beautifier.beautify(schema);
  }
}

export default AsyncApiComponent;
