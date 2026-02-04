import React from 'react';
import { Props, Schema } from './Schema';

export const SchemaItems = ({
  schema,
}: Pick<Props, 'schema'>) => {
  if (!schema) {
    return null;
  }

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
    return <Schema schema={items} isArray />;
  } else if (Array.isArray(items)) {
    return (
      <>
        {items.map((item, idx) => (
          <Schema
            schema={item}
            isArray
            schemaName={`${idx + 1} item:`}
            key={idx}
          />
        ))}
      </>
    );
  }
  return <Schema schema={items} isArray schemaName="Items:" />;
};
