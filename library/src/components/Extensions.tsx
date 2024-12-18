/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

import { Schema } from './Schema';

import { SchemaHelpers } from '../helpers';

interface Props {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  return (
    schema && (
      <div className="mt-2">
        <Schema schemaName={name} schema={schema} onlyTitle />
      </div>
    )
  );
};
