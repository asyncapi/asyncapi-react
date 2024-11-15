/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

  const renderedBindings = bindings.all().map((binding) => {
    const bindingValue = binding.value();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const schema = SchemaHelpers.jsonToSchema(bindingValue);
    const protocol = binding.protocol();
    const schemaName = (
      <div className="inline-block text-sm">
        <span>{name}</span>
        <strong className="bg-teal-500 no-underline text-white uppercase rounded mx-2 px-2 py-1 text-xs">
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
