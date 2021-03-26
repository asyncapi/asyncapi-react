import React from 'react';

import { SchemaComponent } from '../Schemas/NewSchema';

import { SchemaHelpers } from '../../helpers';

interface Props {
  name?: string;
  item: any;
}

export const Extensions: React.FunctionComponent<Props> = ({
  name = 'Extensions',
  item,
}) => {
  const extensions = SchemaHelpers.getCustomExtensions(item);
  if (!extensions || !Object.keys(extensions).length) {
    return null;
  }

  const schema = SchemaHelpers.jsonToSchema(extensions);
  return <SchemaComponent schemaName={name} schema={schema} />;
};
