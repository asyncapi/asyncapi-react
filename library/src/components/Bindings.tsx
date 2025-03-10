import React from "react";

import { BindingsInterface } from "@asyncapi/parser";
import { SchemaHelpers } from "../helpers";
import { Schema } from "./Schema";

interface Props {
  name?: string;
  bindings: BindingsInterface;
}

export const Bindings: React.FunctionComponent<Props> = ({
  name = 'Binding specific information',
  bindings,
}) => {
  if (!bindings || bindings.isEmpty()) {
    return null;
  }

  const renderedBindings = bindings.all().map((binding) => {
    const bindingValue = binding.value();
    
    const schema = SchemaHelpers.jsonToSchema(bindingValue);
    const protocol = binding.protocol();
    const schemaName = (
      <div className="inline-block text-sm">
        <span>{name}</span>
        <strong className="px-2 py-1 mx-2 text-xs text-white no-underline bg-teal-500 rounded upper">
          {protocol}
        </strong>
      </div>
    );
    return (
      schema !== undefined && (
        <Schema
          schemaName={schemaName}
          schema={schema}
          key={protocol}
          onlyTitle
        />
      )
    );
  });

  return <>{renderedBindings}</>;
};
