import React, { FunctionComponent } from 'react';

import { Schema } from '../../types';

import { SchemaComponent } from './Schema';

import { H2 } from '../../components';
import { Schemas, SchemasHeader } from './styled';

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
        <H2>Schemas</H2>
      </SchemasHeader>
      {Object.entries(schemas).map(([key, schema]) => (
        <SchemaComponent key={key} name={key} schema={schema} />
      ))}
    </Schemas>
  );
};
