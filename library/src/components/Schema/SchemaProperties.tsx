import React from 'react';
import { SchemaInterface } from '@asyncapi/parser';

import { Schema } from './Schema';
import { SchemaHelpers } from '../../helpers';

interface SchemaPropertiesProps {
    schema: SchemaInterface;
}

export const SchemaProperties: React.FunctionComponent<SchemaPropertiesProps> = ({
    schema,
}) => {
    const properties = schema.properties();
    if (properties === undefined || !Object.keys(properties).length) {
        return null;
    }

    const required = schema.required() ?? [];
    const patternProperties = schema.patternProperties();

    return (
        <>
            {Object.entries(properties).map(([propertyName, property]) => (
                <Schema
                    schema={property}
                    schemaName={propertyName}
                    required={required.includes(propertyName)}
                    isProperty
                    isCircular={property.isCircular()}
                    dependentRequired={SchemaHelpers.getDependentRequired(
                        propertyName,
                        schema,
                    )}
                    key={propertyName}
                />
            ))}
            {Object.entries(patternProperties ?? {}).map(
                ([propertyName, property]) => (
                    <Schema
                        schema={property}
                        schemaName={propertyName}
                        isPatternProperty
                        isProperty
                        isCircular={property.isCircular()}
                        key={propertyName}
                    />
                ),
            )}
        </>
    );
};
