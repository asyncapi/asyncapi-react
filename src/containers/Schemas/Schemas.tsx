import React, { Component } from 'react';

import { Header, H2 } from '../../components';

import { Map, Schema, Reference } from '../../common';

export interface SchemasProps {
  schemas?: Map<string, Schema | Reference>;
}

class SchemasComponent extends Component<SchemasProps> {
  render() {
    const { schemas } = this.props;

    return (
      <Header>
        <H2>Schemas</H2>
      </Header>
    );
  }
}

export default SchemasComponent;
