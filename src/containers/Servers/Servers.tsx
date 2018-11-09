import React, { Component } from 'react';

import { Header, H2 } from '../../components';

import { Server } from '../../common';

export interface AsyncApiProps {
  servers?: Server[];
}

class ServersComponent extends Component<AsyncApiProps> {
  render() {
    return (
      <Header>
        <H2>Connection details</H2>
      </Header>
    );
  }
}

export default ServersComponent;
