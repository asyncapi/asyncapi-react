import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import { AsyncApi, SecurityScheme } from '../../types';
import { ThemeInterface, defaultTheme } from '../../theme';
import { ConfigInterface, defaultConfig } from '../../config';
import { parser, beautifier } from '../../helpers';

import InfoComponent from '../Info/Info';
import Security from '../Security/Security';
import TopicsComponent from '../Topics/Topics';
import MessagesComponent from '../Messages/Messages';
import SchemasComponent from '../Schemas/Schemas';
import ErrorComponent from '../Error/Error';

import { AsyncApiWrapper } from './styled';

export interface AsyncApiProps {
  schema: string | Object;
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
};

class AsyncApiComponent extends Component<AsyncApiProps, AsyncApiState> {
  state = {
    validatedSchema: defaultAsyncApi,
    validated: false,
    error: undefined,
  };

  private async prepareSchema(schema: string | Object) {
    try {
      let validatedSchema = await this.validateSchema(schema);
      validatedSchema = this.beautifySchema(validatedSchema);
      this.setState({ validatedSchema, validated: true, error: undefined });
    } catch (e) {
      this.setState({ error: e });
    }
  }

  async componentWillMount() {
    this.prepareSchema(this.props.schema);
  }

  async componentWillReceiveProps(nextProps: AsyncApiProps) {
    if (nextProps.schema !== this.props.schema) {
      this.prepareSchema(nextProps.schema);
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

  private showComponent(
    showComponent: boolean,
    component: React.ReactNode,
  ): React.ReactNode | null {
    return showComponent ? component : null;
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

    if (!(validatedSchema && validated)) return null;

    return (
      <ThemeProvider theme={concatenatedTheme}>
        <AsyncApiWrapper>
          {this.showComponent(
            concatenatedConfig.showErrors && Boolean(error),
            <ErrorComponent error={error} />,
          )}
          {this.showComponent(
            concatenatedConfig.show.info && Boolean(validatedSchema.info),
            <InfoComponent
              info={validatedSchema.info}
              servers={validatedSchema.servers}
              showServers={
                concatenatedConfig.show.servers &&
                Boolean(validatedSchema.servers)
              }
            />,
          )}
          {this.showComponent(
            concatenatedConfig.show.security &&
              Boolean(validatedSchema.security),
            <Security
              security={validatedSchema.security as SecurityScheme[]}
            />,
          )}
          {this.showComponent(
            concatenatedConfig.show.topics && Boolean(validatedSchema.topics),
            <TopicsComponent
              baseTopic={validatedSchema.baseTopic}
              topics={validatedSchema.topics}
            />,
          )}
          {validatedSchema.components && (
            <>
              {this.showComponent(
                concatenatedConfig.show.messages &&
                  Boolean(validatedSchema.components) &&
                  Boolean(validatedSchema.components!.messages),
                <MessagesComponent
                  messages={validatedSchema.components!.messages}
                />,
              )}
              {this.showComponent(
                concatenatedConfig.show.schemas &&
                  Boolean(validatedSchema.components) &&
                  Boolean(validatedSchema.components!.schemas),
                <SchemasComponent
                  schemas={validatedSchema.components!.schemas}
                />,
              )}
            </>
          )}
        </AsyncApiWrapper>
      </ThemeProvider>
    );
  }
}

export default AsyncApiComponent;
