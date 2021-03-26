import React from 'react';

import { SchemaComponent } from '../Schemas/NewSchema';

import { SchemaHelpers } from '../../helpers';

interface Props {
  name?: string;
  bindings: any;
}

export const Bindings: React.FunctionComponent<Props> = ({
  name = 'Bindings',
  bindings,
}) => {
  if (!bindings || !Object.keys(bindings).length) {
    return null;
  }
  const schema = SchemaHelpers.jsonToSchema(bindings);

  return <SchemaComponent schemaName={name} schema={schema} />;
};
