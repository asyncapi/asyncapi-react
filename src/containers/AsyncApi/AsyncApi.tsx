import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import { AsyncApi, Theme, Config, PropsWithDefaults, defaultTheme, defaultConfig, parser } from '../../common';

import InfoComponent from '../Info/Info';
import ServersComponent from '../Servers/Servers';
import TopicsComponent from '../Topics/Topics';
import MessagesComponent from '../Messages/Messages';
import SchemasComponent from '../Schemas/Schemas';

export interface AsyncApiProps {
  schema: JSON | string;
  theme?: Theme;
  config?: Config;
}

interface AsyncApiState {
  validatedSchema: AsyncApi;
  validated: boolean;
}

interface AsyncApiDefaultProps {
  schema: JSON | string;
  theme: Theme;
  config: Config;
}

const defaultAsyncApi: AsyncApi = {
  asyncapi: "",
  info: {
    title: "AsyncApi example title",
    version: "1.0.0",
  }
}

const defaultProps: AsyncApiDefaultProps = {
  schema: "",
  theme: defaultTheme,
  config: defaultConfig,
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
    const validatedSchema = await this.validateSchema(this.props.schema);
    this.setState({ validatedSchema, validated: true });
  }

  async componentWillReceiveProps(nextProps: Props) {
    if(nextProps.schema !== this.props.schema) {
      const validatedSchema = await this.validateSchema(nextProps.schema);
      this.setState({ validatedSchema });
    }
  }

  private validateSchema = async (schema: string | any) => {
    if (typeof schema !== 'string') {
      schema = JSON.stringify(schema);
    }
    return await parser.parse(schema)
  }

  private showComponent = (
    showComponent: boolean,
    component: React.ReactNode,
  ): React.ReactNode | null => {
    const { config } = this.props;

    return showComponent ? component : null;
  };

  public render() {
    const { theme, config } = this.props as Props;
    const { validatedSchema, validated } = this.state;

    return (
      validatedSchema && validated ?
        <ThemeProvider theme={theme}>
          <>
            {this.showComponent(
              config.show.info && Boolean(validatedSchema.info),
              <InfoComponent {...validatedSchema.info} />
            )}
            {this.showComponent(
              config.show.servers && Boolean(validatedSchema.servers),
              <ServersComponent servers={validatedSchema.servers} />
            )}
            {/* {this.showComponent(
              config.show.topics && Boolean(validatedSchema.topics),
              <TopicsComponent baseTopic={validatedSchema.baseTopic} topics={validatedSchema.topics} />
            )} */}
            {this.showComponent(
              config.show.messages && Boolean(validatedSchema.components) && Boolean(validatedSchema.components!.messages),
              <MessagesComponent messages={validatedSchema.components!.messages} />
            )}
            {/* {this.showComponent(
              config.show.messages && Boolean(validatedSchema.components) && Boolean(validatedSchema.components!.schemas),
              <SchemasComponent schemas={validatedSchema.components!.schemas} />
            )} */}
          </>
        </ThemeProvider>
      : null
    );
  }
}

export default AsyncApiComponent;
