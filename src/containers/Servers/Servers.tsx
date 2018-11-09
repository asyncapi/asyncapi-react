import React, { Component } from 'react';

import { Header, H2 } from '../../components';

import { Server } from '../../common';

export interface ServersProps {
  servers?: Server[];
}

class ServersComponent extends Component<ServersProps> {
  render() {
    const { servers = [] } = this.props;

    return (
      <Header>
        <H2>Connection details</H2>
      </Header>
    );
  }
}

export default ServersComponent;
