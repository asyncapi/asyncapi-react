import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

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
// import Security from '../Security/Security';
// import TopicsComponent from '../Topics/Topics';
import MessagesComponent from '../Messages/Messages';
import { SchemasComponent } from '../Schemas/Schemas';
import ErrorComponent from '../Error/Error';
import { Channels } from '../Channels/Channels';

import { AsyncApiWrapper } from './styled';

export interface AsyncApiProps {
  schema: string | Object | FetchingSchemaInterface;
  theme?: Partial<ThemeInterface>;
  config?: Partial<ConfigInterface>;
}

interface AsyncApiState {
  validatedSchema: AsyncApi;
  validated: boolean;
  error?: Error | Error[];
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
          {// concatenatedConfig.show.channels &&
          !!validatedSchema.channels && (
            <Channels channels={validatedSchema.channels} />
          )}

          {/* {concatenatedConfig.show.security &&
            Boolean(validatedSchema.security) && (
              <Security
                security={validatedSchema.security as SecurityScheme[]}
              />
            )} */}
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
    );
  }

  private async updateSchema(
    schema: string | Object | FetchingSchemaInterface,
  ) {
    if (isFetchingSchemaInterface(schema)) {
      schema = await fetchSchema(schema as FetchingSchemaInterface);
    }
    this.prepareSchema(schema);
  }

  private async prepareSchema(schema: string | Object) {
    try {
      let validatedSchema = await this.validateSchema(schema);
      validatedSchema = this.beautifySchema(validatedSchema);
      this.setState({ validatedSchema, validated: true, error: undefined });
    } catch (e) {
      console.error(e);
      this.setState({ error: e });
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
