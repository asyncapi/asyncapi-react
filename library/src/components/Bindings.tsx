/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Schema } from './Schema/Schema';
import { SchemaHelpers } from '../helpers/no-parser';

interface BindingValue {
  protocol?: () => string;
  value?: () => unknown;
}

interface BindingsValue {
  isEmpty?: () => boolean;
  all?: () => BindingValue[];
  length?: number;
}

interface Props {
  name?: string;
  bindings: BindingsValue | Record<string, unknown> | unknown[];
}

export const Bindings: React.FunctionComponent<Props> = ({
  name = 'Binding specific information',
  bindings,
}) => {
  if (!bindings) {
    return null;
  }

  const entries: Array<{ protocol: string; value: unknown }> = [];
  if (Array.isArray(bindings)) {
    entries.push(
      ...bindings.map((binding) => {
        const value = binding as BindingValue;
        return {
          protocol: value.protocol?.() ?? '',
          value: value.value?.(),
        };
      }),
    );
  } else {
    const bindingCollection = bindings as BindingsValue;
    if (typeof bindingCollection.all === 'function') {
      for (const binding of bindingCollection.all()) {
        entries.push({
          protocol: binding.protocol?.() ?? '',
          value: binding.value?.(),
        });
      }
    } else {
      for (const [protocol, value] of Object.entries(
        bindings as Record<string, unknown>,
      )) {
      if (typeof value !== 'function') {
        entries.push({ protocol, value });
      }
      }
    }
  }

  if (entries.length === 0) {
    return null;
  }

  const renderedBindings = entries.map(({ protocol, value: bindingValue }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const schema = SchemaHelpers.jsonToSchema(bindingValue);
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
        <Schema schemaName={schemaName} schema={schema} key={protocol} />
      )
    );
  });

  return <>{renderedBindings}</>;
};
