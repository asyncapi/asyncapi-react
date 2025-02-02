import React from 'react';
import { SchemaInterface } from '@asyncapi/parser';
import { SchemaHelpers } from '../../helpers';
import { Payload } from './Payload';

interface AdditionalItemsProps {
  schema: SchemaInterface;
  recursionCounter?: number;
}

export const AdditionalItems: React.FunctionComponent<AdditionalItemsProps> = ({
  schema,
  recursionCounter = 0,
}) => {
  if (
    schema.extensions().get(SchemaHelpers.extRenderAdditionalInfo)?.value() ===
    false
  ) {
    return null;
  }

  const type = schema.type();
  if (!type?.includes('array')) {
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
  return (
    <Payload
      schemaName="Additional items:"
      schema={additionalItems}
      recursionCounter={recursionCounter + 1}
    />
  );
};
