import React from 'react';
import { SchemaHelpers } from '../../helpers/no-parser';
import { Props, Schema } from './Schema';

export const AdditionalItems = ({ schema }: Pick<Props, 'schema'>) => {
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
  if (!typeIncludes('array')) {
    return null;
  }
  if (!Array.isArray(schema.items())) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const additionalItems = schema.additionalItems() as any;
  if (additionalItems === true || additionalItems === undefined) {
    return (
      <p className="mt-2 text-xs text-gray-700">
        Additional items are allowed.
      </p>
    );
  }
  if (additionalItems === false) {
    return (
      <p className="mt-2 text-xs text-gray-700">
        Additional items are <strong>NOT</strong> allowed.
      </p>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <Schema schemaName="Additional items:" schema={additionalItems} />;
};
