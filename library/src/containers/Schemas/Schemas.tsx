import React from 'react';

import { Schema } from './Schema';

import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { SCHEMAS_TEXT } from '../../constants';

export const Schemas: React.FunctionComponent = () => {
  const schemas = useSpec().allSchemas();
  const config = useConfig();

  if (!schemas.size) {
    return null;
  }

  return (
    <section
      id={`${CommonHelpers.getIdentifier('schemas', config)}`}
      className="mt-16"
    >
      <h2 className="2xl:w-7/12 text-3xl font-light mb-4 px-8">
        {SCHEMAS_TEXT}
      </h2>
      <ul>
        {Array.from(schemas).map(([schemaName, schema]) => (
          <li
            className="mb-4"
            key={schemaName}
            id={CommonHelpers.getIdentifier(`schema-${schemaName}`, config)}
          >
            <Schema schemaName={schemaName} schema={schema} />
          </li>
        ))}
      </ul>
    </section>
  );
};
