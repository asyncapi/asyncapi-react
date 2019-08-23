import React, { FunctionComponent } from 'react';

import { Schema } from '../../types';

import { SchemaComponent } from './Schema';

import { H2 } from '../../components';
import { Schemas, SchemasHeader } from './styled';
import { SCHEMAS_TEXT } from '../../constants';

interface Props {
  schemas?: Record<string, Schema>;
}

export const SchemasComponent: FunctionComponent<Props> = ({ schemas }) => {
  if (!schemas) {
    return null;
  }

  return (
    <Schemas>
      <SchemasHeader>
        <H2>{SCHEMAS_TEXT}</H2>
      </SchemasHeader>
      {Object.entries(schemas).map(([key, schema]) => (
        <SchemaComponent key={key} name={key} schema={schema} />
      ))}
    </Schemas>
  );
};
