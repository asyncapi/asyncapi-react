import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import { AsyncApi, PropsWithDefaults, kymaTheme, defaultConfig, parser, beautifier, ThemeInterface, ConfigInterface, SecurityScheme } from '../../common';

import InfoComponent from '../Info/Info';
import ServersComponent from '../Servers/Servers';
import Security from '../Security/Security';
import TopicsComponent from '../Topics/Topics';
import MessagesComponent from '../Messages/Messages';
import SchemasComponent from '../Schemas/Schemas';

import { AsyncApiWrapper } from './styled';

export interface AsyncApiProps {
  schema: string | Object;
  theme?: Partial<ThemeInterface>;
  config?: Partial<ConfigInterface>;
}

interface AsyncApiState {
  validatedSchema: AsyncApi;
  validated: boolean;
}

const defaultAsyncApi: AsyncApi = {
  asyncapi: "",
  info: {
    title: "AsyncApi example title",
    version: "1.0.0",
  }
}

class AsyncApiComponent extends Component<AsyncApiProps, AsyncApiState> {
  constructor(props: AsyncApiProps) {
    super(props);
    this.state = {
      validatedSchema: defaultAsyncApi,
      validated: false,
    }
  }

  async componentWillMount() {
    let validatedSchema = await this.validateSchema(this.props.schema);
    validatedSchema = this.beautifySchema(validatedSchema)
    this.setState({ validatedSchema, validated: true });
  }

  async componentWillReceiveProps(nextProps: AsyncApiProps) {
    if(nextProps.schema !== this.props.schema) {
      let validatedSchema = await this.validateSchema(nextProps.schema);
      validatedSchema = this.beautifySchema(validatedSchema)
      this.setState({ validatedSchema });
    }
  }

  private async validateSchema(schema: string | any) {
    if (typeof schema !== 'string') {
      schema = JSON.stringify(schema);
    }
    return await parser.parse(schema)
  }

  private beautifySchema(schema: AsyncApi): AsyncApi {
    return beautifier.beautify(schema);
  }

  private showComponent(
    showComponent: boolean,
    component: React.ReactNode,
  ): React.ReactNode | null {
    return showComponent ? component : null;
  };

  public render() {
    const { theme, config } = this.props;
    const { validatedSchema, validated } = this.state;

    const concatenatedTheme: ThemeInterface = { ...kymaTheme, ...theme };
    const concatenatedConfig: ConfigInterface = { ...defaultConfig, ...config };

    return (
      validatedSchema && validated ?
        <ThemeProvider theme={concatenatedTheme}>
          <AsyncApiWrapper>
            {this.showComponent(
              concatenatedConfig.show.info && Boolean(validatedSchema.info),
              <InfoComponent info={validatedSchema.info} servers={validatedSchema.servers} showServers={concatenatedConfig.show.servers && Boolean(validatedSchema.servers)} />
            )}
            {this.showComponent(
              concatenatedConfig.show.security && Boolean(validatedSchema.security),
              <Security security={validatedSchema.security as SecurityScheme[]} />
            )}
            {this.showComponent(
              concatenatedConfig.show.topics && Boolean(validatedSchema.topics),
              <TopicsComponent baseTopic={validatedSchema.baseTopic} topics={validatedSchema.topics} />
            )}
            {this.showComponent(
              concatenatedConfig.show.messages && Boolean(validatedSchema.components) && Boolean(validatedSchema.components!.messages),
              <MessagesComponent messages={validatedSchema.components!.messages} />
            )}
            {this.showComponent(
              concatenatedConfig.show.schemas && Boolean(validatedSchema.components) && Boolean(validatedSchema.components!.schemas),
              <SchemasComponent schemas={validatedSchema.components!.schemas} />
            )}
          </AsyncApiWrapper>
        </ThemeProvider>
      : null
    );
  }
}

export default AsyncApiComponent;
