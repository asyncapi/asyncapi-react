import React, { Component } from 'react';

import { H2 } from '../../components';
import { Map, Schema } from '../../common';
import { Schemas, SchemasHeader } from './styled';

import SchemaComponent from './Schema';

interface Props {
  schemas?: Map<string, Schema>;
}

class SchemasComponent extends Component<Props> {
  render() {
    const { schemas } = this.props;

    if (!schemas) return null;

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
