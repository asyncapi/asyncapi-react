import React, { Component } from 'react';

import { Header, H4, TableRow, CodeComponent, GeneratedBadge } from '../../components';

import { Map, TypeWithKey, Schema } from '../../common';

import { SchemaExample } from './styled';

interface Props {
  title?: string
  schema: Schema; 
}

class SchemaExampleComponent extends Component<Props> {
  private generateExample(schema: Schema) {
    try {
      return require('openapi-sampler').sample(schema)
    } catch(e) {
      return;
    }
  }

  render() {
    const { title, schema } = this.props;
    const example = JSON.stringify(schema.example ? schema.example : this.generateExample(schema), null, 2);

    if (!example) return null;

    return (
      <SchemaExample>
        <CodeComponent code={example} title={<>{title ? title : "Example"} {!schema.example && (<GeneratedBadge>generated</GeneratedBadge>)}</>} />
      </SchemaExample>
    );
  }
}

export default SchemaExampleComponent;
