import React from 'react';
import { SchemaInterface } from '@asyncapi/parser';
import { Payload } from './Payload';

interface SchemaItemsProps {
  schema: SchemaInterface;
}

export const SchemaItems: React.FunctionComponent<SchemaItemsProps> = ({
  schema,
}) => {
  const type = schema.type();
  if (!type?.includes('array')) {
    return null;
  }
  const items = schema.items();

  // object in items
  if (
    items &&
    !Array.isArray(items) &&
    Object.keys(items.properties() ?? {}).length
  ) {
    return <Payload schema={items} isArray />;
  } else if (Array.isArray(items)) {
    return (
      <>
        {items.map((item, idx) => (
          <Payload
            schema={item}
            isArray
            schemaName={`${idx + 1} item:`}
            key={idx}
          />
        ))}
      </>
    );
  }
  return (
    <Payload
      schema={items}
      isArray
      schemaName="Items:"
    />
  );
};
