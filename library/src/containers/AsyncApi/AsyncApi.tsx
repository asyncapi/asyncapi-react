import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import {
  AsyncApi,
  isFetchingSchemaInterface,
  NullableAsyncApi,
  ParserError,
  AsyncApiProps,
  PropsSchema,
} from '../../types';
import { ThemeInterface, defaultTheme } from '../../theme';
import { ConfigInterface, defaultConfig } from '../../config';
import { parser, beautifier } from '../../helpers';

import InfoComponent from '../Info/Info';
import { SecurityComponent } from '../Security/Security';

import MessagesComponent from '../Messages/Messages';
import { SchemasComponent } from '../Schemas/Schemas';
import ErrorComponent from '../Error/Error';

import { Channels } from '../Channels/Channels';

import { AsyncApiWrapper } from './styled';

interface AsyncApiState {
  validatedSchema: NullableAsyncApi;
  error?: ParserError;
}

const defaultAsyncApi: AsyncApi = {
  asyncapi: '',
  info: {
    title: 'AsyncApi example title',
    version: '2.0.0',
  },
  channels: {},
};

// todo: add ability to forward options to parser and dereferencer

class AsyncApiComponent extends Component<AsyncApiProps, AsyncApiState> {
  state: AsyncApiState = {
    validatedSchema: defaultAsyncApi,
    error: undefined,
  };

  async componentDidMount() {
    this.parseSchema(this.props.schema);
  }

  async componentWillReceiveProps(nextProps: AsyncApiProps) {
    const { schema } = nextProps;

    if (schema !== this.props.schema) {
      this.parseSchema(schema);
    }
  }

  render() {
    const { theme, config } = this.props;
    const { validatedSchema, error } = this.state;
    const concatenatedConfig: ConfigInterface = {
      ...defaultConfig,
      ...config,
      show: {
        ...defaultConfig.show,
        ...(!!config && config.show),
      },
    };

    const concatenatedTheme: ThemeInterface = concatenatedConfig.disableDefaultTheme
      ? (theme as ThemeInterface)
      : { ...defaultTheme, ...theme };

    if (!validatedSchema || !Object.keys(validatedSchema).length) {
      if (!error) {
        return null;
      }
      return (
        <ThemeProvider theme={concatenatedTheme}>
          <AsyncApiWrapper>
            {concatenatedConfig.showErrors && <ErrorComponent error={error} />}
          </AsyncApiWrapper>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider theme={concatenatedTheme}>
        <AsyncApiWrapper>
          {concatenatedConfig.showErrors && !!error && (
            <ErrorComponent error={error} />
          )}
          {concatenatedConfig.show.info && validatedSchema.info && (
            <InfoComponent
              info={validatedSchema.info}
              servers={validatedSchema.servers}
              showServers={
                concatenatedConfig.show.servers && !!validatedSchema.servers
              }
            />
          )}
          {concatenatedConfig.show.security &&
            validatedSchema.servers &&
            validatedSchema.components &&
            validatedSchema.components.securitySchemes && (
              <SecurityComponent
                securitySchemes={validatedSchema.components.securitySchemes}
                servers={validatedSchema.servers}
              />
            )}

          {concatenatedConfig.show.channels && !!validatedSchema.channels && (
            <Channels channels={validatedSchema.channels} />
          )}
          {validatedSchema.components && (
            <>
              {concatenatedConfig.show.messages &&
                validatedSchema.components &&
                validatedSchema.components.messages && (
                  <MessagesComponent
                    messages={validatedSchema.components.messages}
                  />
                )}
              {concatenatedConfig.show.schemas &&
                validatedSchema.components &&
                validatedSchema.components.schemas && (
                  <SchemasComponent
                    schemas={validatedSchema.components.schemas}
                  />
                )}
            </>
          )}
        </AsyncApiWrapper>
      </ThemeProvider>
    );
  }

  private async parseSchema(schema: PropsSchema) {
    if (isFetchingSchemaInterface(schema)) {
      const { data, error } = await parser.parseFromUrl(schema);

      const beautifiedSchema = this.beautifySchema(data);

      this.setState({ validatedSchema: beautifiedSchema, error });
    } else {
      const { data, error } = await parser.parse(schema);

      const beautifiedSchema = this.beautifySchema(data);

      this.setState({ validatedSchema: beautifiedSchema, error });
    }
  }

  private beautifySchema(schema: NullableAsyncApi): NullableAsyncApi {
    if (!schema) {
      return null;
    }
    return beautifier.beautify(schema);
  }
}

export default AsyncApiComponent;
