import React, { Component } from 'react';

import {
  AsyncAPI,
  isFetchingSchemaInterface,
  NullableAsyncApi,
  ParserError,
  AsyncApiProps,
  PropsSchema,
} from '../../types';
import { ConfigInterface, defaultConfig } from '../../config';
import { beautifier } from '../../helpers';
import Parser from '../../helpers/parser';
import { parse, parseFromUrl } from 'asyncapi-parser';

import { InfoComponent } from '../Info/Info';
import { ServersComponent } from '../Servers/Servers';
import { SecurityComponent } from '../Security/Security';

import { MessagesComponent } from '../Messages/Messages';
import { SchemasComponent } from '../Schemas/Schemas';
import { ErrorComponent } from '../Error/Error';

import { Channels } from '../Channels/Channels';

const parser = new Parser(parse, parseFromUrl);

interface AsyncAPIState {
  validatedSchema: NullableAsyncApi;
  error?: ParserError;
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

  async componentDidMount() {
    this.parseSchema(this.props.schema, this.props.parserOptions);
  }

  async componentDidUpdate(prevProps: AsyncApiProps) {
    const { schema } = prevProps;

    if (schema !== this.props.schema) {
      this.parseSchema(this.props.schema, this.props.parserOptions);
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
    };
    bemClasses.setPrefix(concatenatedConfig.prefixClassName);

    if (!validatedSchema || !Object.keys(validatedSchema).length) {
      if (!error) {
        return null;
      }
      return concatenatedConfig.showErrors && <ErrorComponent error={error} />;
    }

    if (!concatenatedConfig.show) {
      return null;
    }

    return (
      <div className={concatenatedConfig.prefixClassName}>
        {concatenatedConfig.showErrors && !!error && (
          <ErrorComponent error={error} />
        )}
        {concatenatedConfig.show.info && validatedSchema.info && (
          <InfoComponent
            info={validatedSchema.info}
            defaultContentType={validatedSchema.defaultContentType}
          />
        )}
        {concatenatedConfig.show.servers && !!validatedSchema.servers && (
          <ServersComponent
            servers={validatedSchema.servers}
            securitySchemes={
              validatedSchema.components &&
              validatedSchema.components.securitySchemes
            }
          />
        )}
        {concatenatedConfig.show.channels && !!validatedSchema.channels && (
          <Channels channels={validatedSchema.channels} />
        )}
        {validatedSchema.components && (
          <div className={bemClasses.element(`components`)}>
            {concatenatedConfig.show.messages &&
              validatedSchema.components.messages && (
                <MessagesComponent
                  messages={validatedSchema.components.messages}
                />
              )}
            {concatenatedConfig.show.schemas &&
              validatedSchema.components.schemas && (
                <SchemasComponent
                  schemas={validatedSchema.components.schemas}
                />
              )}
            {concatenatedConfig.show.security &&
              validatedSchema.servers &&
              validatedSchema.components.securitySchemes && (
                <SecurityComponent
                  securitySchemes={validatedSchema.components.securitySchemes}
                  servers={validatedSchema.servers}
                />
              )}
          </div>
        )}
      </div>
    );
  }

  private async parseSchema(
    schema: PropsSchema,
    parserOptions?: AsyncApiProps['parserOptions'],
  ) {
    if (isFetchingSchemaInterface(schema)) {
      const parsedFromUrl = await parser.parseFromUrl(schema, parserOptions);
      this.setState({
        validatedSchema: this.beautifySchema(parsedFromUrl.data),
        error: parsedFromUrl.error,
      });
      return;
    }

    const parsed = await parser.parse(schema, parserOptions);
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
