import React from 'react';

import { Schema } from './Schema';

import { SchemaHelpers } from '../helpers';

interface Props {
  name?: string;
  bindings: any;
}

export const Bindings: React.FunctionComponent<Props> = ({
  name = 'Binding specific information',
  bindings,
}) => {
  if (!bindings || !Object.keys(bindings).length) {
    return null;
  }

  const renderedBindings = Object.entries(bindings).map(
    ([bindingName, binding]) => {
      const schema = SchemaHelpers.jsonToSchema(binding);
      const schemaName = (
        <div className="inline-block text-sm">
          <span>{name}</span>
          <span className="bg-teal-500 font-bold no-underline text-white uppercase rounded mx-2 px-2 py-1 text-xs">
            {bindingName}
          </span>
        </div>
      );
      return (
        schema && (
          <Schema
            schemaName={schemaName}
            schema={schema}
            key={bindingName}
            onlyTitle={true}
          />
        )
      );
    },
  );
  return <>{renderedBindings}</>;
};
