import React, { Component } from 'react';

import { Header, H4, TableAccesor, TableRow, CodeComponent } from '../../components';

import { Map, TypeWithKey, Schema } from '../../common';

import { SchemaExample } from './styled';

export interface SchemaExampleProps {
  title?: string
  schema: Schema; 
}

class SchemaExampleComponent extends Component<SchemaExampleProps> {
  private generateExample(schema: Schema) {
    try {
      return require('openapi-sampler').sample(schema)
    } catch(e) {
      return;
    }
  }

  public render() {
    const { title, schema } = this.props;
    const example = JSON.stringify(schema.example ? schema.example : this.generateExample(schema), null, 2);

    return (
      example ? 
        <SchemaExample>
          <CodeComponent code={example} title={<>{title ? title : "Example"} {schema.example ? "" : (<em>(generated)</em>)}</>} />
        </SchemaExample>
      : null
    );
  }
}

export default SchemaExampleComponent;
