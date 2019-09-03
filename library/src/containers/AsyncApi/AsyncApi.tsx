import React, { Component, FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';

import {
  AsyncAPI,
  isFetchingSchemaInterface,
  NullableAsyncApi,
  ParserError,
  AsyncApiProps,
  PropsSchema,
} from '../../types';
import { ThemeInterface, defaultTheme } from '../../theme';
import { ConfigInterface, defaultConfig } from '../../config';
import { beautifier } from '../../helpers';
import Parser from '../../helpers/parser';
import { parse, parseFromUrl } from 'asyncapi-parser';

import { InfoComponent } from '../Info/Info';
import { SecurityComponent } from '../Security/Security';

import { MessagesComponent } from '../Messages/Messages';
import { SchemasComponent } from '../Schemas/Schemas';
import { ErrorComponent } from '../Error/Error';

import { Channels } from '../Channels/Channels';

import { AsyncApiWrapper } from './styled';

const parser = new Parser(parse, parseFromUrl);

interface AsyncAPIState {
  validatedSchema: NullableAsyncApi;
  error?: ParserError;
}

const defaultAsyncApi: AsyncAPI = {
  asyncapi: '',
  info: {
    title: 'AsyncApi example title',
    version: '2.0.0',
  },
  channels: {},
};

// todo: add ability to forward options to parser and dereferencer

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
        <Wrapper theme={concatenatedTheme}>
          {concatenatedConfig.showErrors && <ErrorComponent error={error} />}
        </Wrapper>
      );
    }

    if (!concatenatedConfig.show) {
      return null;
    }

    return (
      <Wrapper theme={concatenatedTheme}>
        {concatenatedConfig.showErrors && !!error && (
          <ErrorComponent error={error} />
        )}
        {concatenatedConfig.show.info && validatedSchema.info && (
          <InfoComponent
            info={validatedSchema.info}
            servers={validatedSchema.servers}
            showServers={Boolean(
              concatenatedConfig.show.servers && !!validatedSchema.servers,
            )}
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
      </Wrapper>
    );
  }

  private async parseSchema(
    schema: PropsSchema,
    parserOptions?: AsyncApiProps['parserOptions'],
  ) {
    if (isFetchingSchemaInterface(schema)) {
      /* tslint:disable: no-shadowed-variable 
      there's clearly a return statement in this code block so I don't why this triggers */

      const { data, error } = await parser.parseFromUrl(schema, parserOptions);

      const beautifiedSchema = this.beautifySchema(data);

      this.setState({
        validatedSchema: beautifiedSchema,
        error,
      });
      return;
      /* tslint:enable: no-shadowed-variable */
    }

    const { data, error } = await parser.parse(schema, parserOptions);

    const beautifiedSchema = this.beautifySchema(data);

    this.setState({ validatedSchema: beautifiedSchema, error });
  }

  private beautifySchema(schema: NullableAsyncApi): NullableAsyncApi {
    if (!schema) {
      return null;
    }
    return beautifier.beautify(schema);
  }
}

interface WrapperProps {
  theme: ThemeInterface;
}

const Wrapper: FunctionComponent<WrapperProps> = ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <AsyncApiWrapper>{children}</AsyncApiWrapper>
  </ThemeProvider>
);

export default AsyncApiComponent;
