import React from 'react';

import { Schema } from './Schema';
import type { SchemaInterface } from '@asyncapi/parser';

import { SchemaHelpers } from '../helpers';

interface Props {
  name?: string;
  item: SchemaInterface;
}

export const Extensions: React.FunctionComponent<Props> = ({
  name = 'Extensions',
  item,
}) => {
  const extensions = SchemaHelpers.getCustomExtensions(item);
  if (!extensions || !Object.keys(extensions).length) {
    return null;
  }

  const schema: SchemaInterface = SchemaHelpers.jsonToSchema(extensions);

  return (
    schema && (
      <div className="mt-2">
        <Schema schemaName={name} schema={schema} onlyTitle />
      </div>
    )
  );
};
