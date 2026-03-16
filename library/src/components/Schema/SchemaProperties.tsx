import React from 'react';
import { SchemaHelpers } from '../../helpers';
import { Props, Schema } from './Schema';

export const SchemaProperties = ({ schema }: Pick<Props, 'schema'>) => {
  if (!schema) {
    return null;
  }

  const properties = Object.entries(schema.properties() ?? {});
  const patternProperties = Object.entries(schema.patternProperties() ?? {});

  if (!properties.length && !patternProperties.length) {
    return null;
  }

  const required = schema.required() ?? [];

  return (
    <>
      {properties.map(([propertyName, property]) => (
        <Schema
          key={propertyName}
          schema={property}
          schemaName={propertyName}
          required={required.includes(propertyName)}
          isProperty
          isCircular={property.isCircular()}
          dependentRequired={SchemaHelpers.getDependentRequired(
            propertyName,
            schema,
          )}
        />
      ))}
      {patternProperties.map(([propertyName, property]) => (
        <Schema
          key={propertyName}
          schema={property}
          schemaName={propertyName}
          isPatternProperty
          isProperty
          isCircular={property.isCircular()}
        />
      ))}
    </>
  );
};
