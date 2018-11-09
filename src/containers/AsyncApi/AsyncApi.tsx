import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import { AsyncApi, Theme, Config, PropsWithDefaults, defaultTheme, defaultConfig, parser } from '../../common';

import InfoComponent from '../Info/Info';
import ServersComponent from '../Servers/Servers';

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
    return await parser.parseText(schema)
  }

  private showComponent = (
    showComponent: boolean,
    component: React.ReactNode,
    items?: any,
  ): React.ReactNode | null => {
    const { config } = this.props;

    return showComponent && typeof items !== undefined ? component : null;
  };

  public render() {
    const { theme, config } = this.props as Props;
    const { validatedSchema, validated } = this.state;

    console.log(validatedSchema)

    return (
      validatedSchema && validated ?
        <ThemeProvider theme={theme}>
          <>
            {this.showComponent(
              config.show.info,
              <InfoComponent {...validatedSchema.info} />,
              validatedSchema.info,
            )}
            {this.showComponent(
              config.show.servers,
              <ServersComponent servers={validatedSchema.servers} />,
              validatedSchema.servers,
            )}
          </>
        </ThemeProvider>
      : null
    );
  }
}

export default AsyncApiComponent;
