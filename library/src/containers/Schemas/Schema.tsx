import React from 'react';
import { SchemaInterface } from '@asyncapi/parser';

import { Schema as SchemaComponent } from '../../components';

interface Props {
  schemaName: string;
  schema: SchemaInterface;
}

export const Schema: React.FunctionComponent<Props> = ({
  schemaName,
  schema,
}) => {
  if (!schema) {
    return null;
  }

  return (
    <div>
      <div className="panel-item--center px-8">
        <div className="shadow rounded px-4 py-2 border bg-gray-200">
          <SchemaComponent schemaName={schemaName} schema={schema} />
        </div>
      </div>

      <div className="w-full mt-4" />
    </div>
  );
};
