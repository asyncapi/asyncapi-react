import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import { AsyncApi, PropsWithDefaults, defaultTheme, defaultConfig, parser, beautifier, ThemeInterface, PartialThemeInterface, ConfigInterface, PartialConfigInterface, SecurityScheme } from '../../common';

import InfoComponent from '../Info/Info';
import ServersComponent from '../Servers/Servers';
import Security from '../Security/Security';
import TopicsComponent from '../Topics/Topics';
import MessagesComponent from '../Messages/Messages';
import SchemasComponent from '../Schemas/Schemas';

import { AsyncApiWrapper } from './styled';

export interface AsyncApiProps {
  schema: string | Object;
  theme?: PartialThemeInterface;
  config?: PartialConfigInterface;
}

interface AsyncApiState {
  validatedSchema: AsyncApi;
  validated: boolean;
}

interface AsyncApiDefaultProps {
  schema: AsyncApi | string;
  theme: ThemeInterface;
  config: ConfigInterface;
}

const defaultProps: AsyncApiDefaultProps = {
  schema: "",
  theme: defaultTheme,
  config: defaultConfig,
}

const defaultAsyncApi: AsyncApi = {
  asyncapi: "",
  info: {
    title: "AsyncApi example title",
    version: "1.0.0",
  }
}

type Props = PropsWithDefaults<AsyncApiProps, AsyncApiDefaultProps>;

class AsyncApiComponent extends Component<AsyncApiProps, AsyncApiState> {
  static defaultProps: AsyncApiDefaultProps = defaultProps;

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

  async componentWillReceiveProps(nextProps: Props) {
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
    const { theme, config } = this.props as Props;
    const { validatedSchema, validated } = this.state;

    console.log(validatedSchema)

    return (
      validatedSchema && validated ?
        <ThemeProvider theme={theme}>
          <AsyncApiWrapper>
            {this.showComponent(
              config.show.info && Boolean(validatedSchema.info),
              <InfoComponent info={validatedSchema.info} />
            )}
            {this.showComponent(
              config.show.servers && Boolean(validatedSchema.servers),
              <ServersComponent servers={validatedSchema.servers} />
            )}
            {this.showComponent(
              config.show.security && Boolean(validatedSchema.security),
              <Security security={validatedSchema.security as SecurityScheme[]} />
            )}
            {this.showComponent(
              config.show.topics && Boolean(validatedSchema.topics),
              <TopicsComponent baseTopic={validatedSchema.baseTopic} topics={validatedSchema.topics} />
            )}
            {this.showComponent(
              config.show.messages && Boolean(validatedSchema.components) && Boolean(validatedSchema.components!.messages),
              <MessagesComponent messages={validatedSchema.components!.messages} />
            )}
            {this.showComponent(
              config.show.schemas && Boolean(validatedSchema.components) && Boolean(validatedSchema.components!.schemas),
              <SchemasComponent schemas={validatedSchema.components!.schemas} />
            )}
          </AsyncApiWrapper>
        </ThemeProvider>
      : null
    );
  }
}

export default AsyncApiComponent;
