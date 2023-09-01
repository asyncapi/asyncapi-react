import React from 'react';
import { Schema } from './Schema';
import { SchemaHelpers } from '../helpers';
import { BindingsInterface } from '@asyncapi/parser';

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

  const renderedBindings = bindings.all().map(binding => {
    const bindingValue = binding.value();
    const schema = SchemaHelpers.jsonToSchema(bindingValue);
    const protocol = binding.protocol();
    const schemaName = (
      <div className="inline-block text-sm">
        <span>{name}</span>
        <span className="bg-teal-500 font-bold no-underline text-white uppercase rounded mx-2 px-2 py-1 text-xs">
          {protocol}
        </span>
      </div>
    );
    return (
      schema !== undefined && (
        <Schema
          schemaName={schemaName}
          schema={schema}
          key={protocol}
          onlyTitle={true}
        />
      )
    );
  });

  return <>{renderedBindings}</>;
};
