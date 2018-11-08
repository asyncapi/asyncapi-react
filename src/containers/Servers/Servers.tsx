import React, { Component } from 'react';

import { Header, H2 } from '../../components';

import { IServersProps } from '../../common';

class ServersComponent extends Component<IServersProps> {
  render() {
    return (
      <Header>
        <H2>Connection details</H2>
      </Header>
    );
  }
}

export default ServersComponent;
