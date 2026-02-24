import React from 'react';
import { SchemaInterface } from '@asyncapi/parser';

import { Schema } from './Schema';

interface SchemaItemsProps {
    schema: SchemaInterface;
}

export const SchemaItems: React.FunctionComponent<SchemaItemsProps> = ({ schema }) => {
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
