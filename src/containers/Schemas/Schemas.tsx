import React, { Component } from 'react';

import { Header, H2 } from '../../components';

import { Map, Schema } from '../../common';

import { Schemas, SchemasHeader } from './styled';

import SchemaComponent from './Schema';

export interface SchemasProps {
  schemas?: Map<string, Schema>;
}

class SchemasComponent extends Component<SchemasProps> {
  public render() {
    const { schemas } = this.props;

    return (
      <Schemas>
        <SchemasHeader>
          <H2>Schemas</H2>
        </SchemasHeader>
        {Object.keys(schemas!).map(key => <SchemaComponent key={key} name={key} schema={schemas![key]} />)}
      </Schemas>
    );
  }
}

export default SchemasComponent;
