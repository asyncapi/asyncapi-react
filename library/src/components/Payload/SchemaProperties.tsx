import React from "react"
import { SchemaInterface } from "@asyncapi/parser";
import { SchemaHelpers } from "../../helpers";
import { Payload } from "./Payload";

interface SchemaPropertiesProps {
  schema: SchemaInterface;
  recursionCounter?: number;
}

export const SchemaProperties: React.FunctionComponent<SchemaPropertiesProps> = ({
  schema,
  recursionCounter = 0,
}) => {
  const properties = schema.properties();
  if (properties === undefined || !Object.keys(properties)) {
    return null;
  }

  const required = schema.required() ?? [];
  const patternProperties = schema.patternProperties();

  return (
    <>
      {Object.entries(properties).map(([propertyName, property]) => (
        <Payload
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
          recursionCounter={recursionCounter + 1}
        />
      ))}
      {Object.entries(patternProperties ?? {}).map(
        ([propertyName, property]) => (
          <Payload
            schema={property}
            schemaName={propertyName}
            isPatternProperty
            isProperty
            isCircular={property.isCircular()}
            key={propertyName}
            recursionCounter={recursionCounter + 1}
          />
        ),
      )}
    </>
  );
};
