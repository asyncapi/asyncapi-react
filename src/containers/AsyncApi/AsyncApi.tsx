import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import { AsyncApi, Theme, Config, PropsWithDefaults, defaultTheme, defaultConfig } from '../../common';

import InfoComponent from '../Info/Info';
import ServersComponent from '../Servers/Servers';

export interface AsyncApiProps {
  asyncApi: AsyncApi;
  theme?: Theme;
  config?: Config;
}

interface AsyncApiDefaultProps {
  asyncApi: AsyncApi;
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
  asyncApi: defaultAsyncApi,
  theme: defaultTheme,
  config: defaultConfig,
}

type Props = PropsWithDefaults<AsyncApiProps, AsyncApiDefaultProps>;

class AsyncApiComponent extends Component<AsyncApiProps> {
  static defaultProps: AsyncApiDefaultProps = defaultProps;

  constructor(props: AsyncApiProps) {
    super(props);
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
    const { asyncApi, theme, config } = this.props as Props;

    return (
      <ThemeProvider theme={theme}>
        <>
          {this.showComponent(
            config.show.info,
            <InfoComponent {...asyncApi.info} />,
            asyncApi.info,
          )}
          {this.showComponent(
            config.show.servers,
            <ServersComponent servers={asyncApi.servers} />,
            asyncApi.servers,
          )}
        </>
      </ThemeProvider>
    );
  }
}

export default AsyncApiComponent;
