import React from 'react';

import { Schema } from './Schema';
import { AnchorWrapper } from '../../components';

import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { SCHEMAS_TEXT } from '../../constants';

export const Schemas: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const config = useConfig();
  const schemas = asyncapi.hasComponents() && asyncapi.components().schemas();

  if (!schemas || Object.keys(schemas).length === 0) {
    return null;
  }

  return (
    <section
      id={`${CommonHelpers.getIdentifier('schemas', config)}`}
      className="mt-16"
    >
      <AnchorWrapper
        anchor={CommonHelpers.getIdentifier('schemas', config)}
        iconProps={{
          className: 'top-3.5',
        }}
      >
        <h2 className="2xl:w-7/12 text-3xl font-light mb-4 px-8">
          {SCHEMAS_TEXT}
        </h2>
      </AnchorWrapper>
      <ul>
        {Object.entries(schemas).map(([schemaName, schema]) => (
          <li
            className="mb-4"
            key={schemaName}
            id={CommonHelpers.getIdentifier(`schema-${schemaName}`, config)}
          >
            <AnchorWrapper
              anchor={CommonHelpers.getIdentifier(
                `schema-${schemaName}`,
                config,
              )}
              iconProps={{
                className: 'top-4',
              }}
            >
              <Schema schemaName={schemaName} schema={schema} />
            </AnchorWrapper>
          </li>
        ))}
      </ul>
    </section>
  );
};
