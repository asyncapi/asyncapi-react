import React, { Component } from 'react';

import { Schema } from '../../types';
import { generateExample } from '../../helpers/generateExampleSchema';
import { CodeComponent, GeneratedBadge } from '../../components';
import { SchemaExample } from './styled';
import { GENERATED_BADGE } from '../../constants';
interface Props {
  title?: string;
  schema: Schema;
}

export class SchemaExampleComponent extends Component<Props> {
  render() {
    const { title, schema } = this.props;
    const example = JSON.stringify(
      schema.example ? schema.example : generateExample(schema),
      null,
      2,
    );

    if (!example) {
      return null;
    }

    return (
      <SchemaExample>
        <CodeComponent
          code={example}
          title={
            <>
              {title ? title : 'Example'}{' '}
              {!schema.example && (
                <GeneratedBadge>{GENERATED_BADGE}</GeneratedBadge>
              )}
            </>
          }
        />
      </SchemaExample>
    );
  }
}
