import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { ErrorObject } from 'ajv';

import {
  AsyncApi,
  // SecurityScheme
} from '../../types';
import { ThemeInterface, defaultTheme } from '../../theme';
import { ConfigInterface, defaultConfig } from '../../config';
import {
  parser,
  beautifier,
  FetchingSchemaInterface,
  isFetchingSchemaInterface,
  fetchSchema,
} from '../../helpers';

import InfoComponent from '../Info/Info';
import { OldSecurityComponent } from '../Security/oldSec';

import MessagesComponent from '../Messages/Messages';
import { SchemasComponent } from '../Schemas/Schemas';
import ErrorComponent from '../Error/Error';
import { ErrorBoundary } from '../Error/ErrorBoundary';
import { Channels } from '../Channels/Channels';

import { AsyncApiWrapper } from './styled';

export interface AsyncApiProps {
  schema: string | FetchingSchemaInterface;
  theme?: Partial<ThemeInterface>;
  config?: Partial<ConfigInterface>;
}

interface AsyncApiState {
  validatedSchema: AsyncApi;
  validated: boolean;
  error?: ErrorObject[] | null;
}

const defaultAsyncApi: AsyncApi = {
  asyncapi: '',
  info: {
    title: 'AsyncApi example title',
    version: '1.0.0',
  },
  channels: {},
};

class AsyncApiComponent extends Component<AsyncApiProps, AsyncApiState> {
  state = {
    validatedSchema: defaultAsyncApi,
    validated: false,
    error: undefined,
  };

  async componentWillMount() {
    this.updateSchema(this.props.schema);
  }

  async componentWillReceiveProps(nextProps: AsyncApiProps) {
    const { schema } = nextProps;

    if (schema !== this.props.schema) {
      this.updateSchema(schema);
    }
  }

  render() {
    const { theme, config } = this.props;
    const { validatedSchema, validated, error } = this.state;
    const concatenatedConfig: ConfigInterface = {
      ...defaultConfig,
      ...config,
      show: {
        ...defaultConfig.show,
        ...(config && config.show ? config.show : {}),
      },
    };

    const concatenatedTheme: ThemeInterface = concatenatedConfig.disableDefaultTheme
      ? (theme as ThemeInterface)
      : { ...defaultTheme, ...theme };

    if (!(Object.keys(validatedSchema).length && validated)) {
      return null;
    }

    return (
      <ErrorBoundary>
        <ThemeProvider theme={concatenatedTheme}>
          <AsyncApiWrapper>
            {concatenatedConfig.showErrors && Boolean(error) && (
              <ErrorComponent error={error} />
            )}
            {concatenatedConfig.show.info && Boolean(validatedSchema.info) && (
              <InfoComponent
                info={validatedSchema.info}
                servers={validatedSchema.servers}
                showServers={
                  concatenatedConfig.show.servers &&
                  Boolean(validatedSchema.servers)
                }
              />
            )}
            {concatenatedConfig.show.security &&
              validatedSchema.components &&
              validatedSchema.components.securitySchemes && (
                <OldSecurityComponent
                  security={Object.keys(
                    validatedSchema.components.securitySchemes,
                  ).map(
                    elem => validatedSchema!.components!.securitySchemes![elem],
                  )}
                />
              )}

            {concatenatedConfig.show.channels && !!validatedSchema.channels && (
              <Channels channels={validatedSchema.channels} />
            )}

            {/* {concatenatedConfig.show.topics &&
            Boolean(validatedSchema.topics) && (
              <TopicsComponent
                baseTopic={validatedSchema.baseTopic}
                topics={validatedSchema.topics}
              />
            )} */}
            {validatedSchema.components && (
              <>
                {concatenatedConfig.show.messages &&
                  Boolean(validatedSchema.components) &&
                  Boolean(validatedSchema.components.messages) && (
                    <MessagesComponent
                      messages={validatedSchema.components.messages}
                    />
                  )}
                {concatenatedConfig.show.schemas &&
                  Boolean(validatedSchema.components) &&
                  Boolean(validatedSchema.components.schemas) && (
                    <SchemasComponent
                      schemas={validatedSchema.components.schemas}
                    />
                  )}
              </>
            )}
          </AsyncApiWrapper>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  private async updateSchema(schema: string | FetchingSchemaInterface) {
    if (isFetchingSchemaInterface(schema)) {
      schema = await fetchSchema(schema);
    }
    this.prepareSchema(schema);
  }

  private async prepareSchema(schema: string) {
    try {
      let { data: validatedSchema, error } = await this.validateSchema(schema);
      validatedSchema = this.beautifySchema(validatedSchema);
      this.setState({ validatedSchema, validated: true, error: error });
    } catch (e) {
      console.error(e);
    }
  }

  private async validateSchema(schema: string | any) {
    if (typeof schema !== 'string') {
      schema = JSON.stringify(schema);
    }
    return await parser.parse(schema);
  }

  private beautifySchema(schema: AsyncApi): AsyncApi {
    return beautifier.beautify(schema);
  }
}

export default AsyncApiComponent;
