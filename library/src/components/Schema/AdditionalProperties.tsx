import React from 'react';
import { SchemaHelpers } from '../../helpers/no-parser';
import { Props, Schema } from './Schema';

export const AdditionalProperties = ({ schema }: Pick<Props, 'schema'>) => {
  if (!schema) {
    return null;
  }

  if (
    schema.extensions().get(SchemaHelpers.extRenderAdditionalInfo)?.value() ===
    false
  ) {
    return null;
  }

  const type = schema.type();
  const typeIncludes = (t: string) =>
    Array.isArray(type) ? type.includes(t) : type === t;
  if (!typeIncludes('object')) {
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
    <Schema schemaName="Additional properties:" schema={additionalProperties} />
  );
};
