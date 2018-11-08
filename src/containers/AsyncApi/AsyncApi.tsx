import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import { IAsyncApiProps } from '../../common';

import InfoComponent from '../Info/Info';
import ServersComponent from '../Servers/Servers';

class AsyncApiComponent extends Component<IAsyncApiProps> {
  constructor(props: IAsyncApiProps) {
    super(props);
  }

  showComponent = (
    showComponent: boolean,
    component: React.ReactNode,
    items?: any,
  ): React.ReactNode | null => {
    const { config } = this.props;

    return showComponent && typeof items !== undefined ? component : null;
  };

  public render() {
    const { asyncApi, theme, config } = this.props;

    return (
      <ThemeProvider theme={theme}>
        {this.showComponent(
          config.showInfo,
          <InfoComponent info={asyncApi.info} />,
          asyncApi.info,
        )}
        {this.showComponent(
          config.showServers,
          <ServersComponent servers={asyncApi.servers} />,
          asyncApi.servers,
        )}
      </ThemeProvider>
    );
  }
}

export default AsyncApiComponent;
