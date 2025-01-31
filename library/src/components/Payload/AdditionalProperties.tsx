import React from 'react';
import { SchemaInterface } from '@asyncapi/parser';
import { SchemaHelpers } from '../../helpers';
import { Payload } from './Payload';

interface AdditionalPropertiesProps {
  schema: SchemaInterface;
  recursionCounter?: number;
}

export const AdditionalProperties: React.FunctionComponent<
  AdditionalPropertiesProps
> = ({ schema, recursionCounter = 0 }) => {
  if (
    schema.extensions().get(SchemaHelpers.extRenderAdditionalInfo)?.value() ===
    false
  ) {
    return null;
  }

  const type = schema.type();
  if (!type?.includes('object')) {
    return null;
  }

  const additionalProperties = schema.additionalProperties();
  if (additionalProperties === true || additionalProperties === undefined) {
    return (
      <p className="mt-2 text-xs text-gray-700">
        Additional properties are allowed.
      </p>
    );
  }
  if (additionalProperties === false) {
    return (
      <p className="mt-2 text-xs text-gray-700">
        Additional properties are <strong>NOT</strong> allowed.
      </p>
    );
  }
  return (
    <Payload
      schemaName="Additional properties:"
      schema={additionalProperties}
      recursionCounter={recursionCounter + 1}
    />
  );
};
