import React from 'react';
import { SchemaInterface } from '@asyncapi/parser';
import { SchemaHelpers } from '../../../helpers';

interface RulesProps {
  schema: SchemaInterface;
  constraints: string[];
}

export const Rules = ({ schema, constraints }: RulesProps) => {
  return (
    <>
      <p
        className={`text-sm font-semibold text-gray-900 bg-gray-400 p-2 rounded-t w-min`}
      >
        Rules
      </p>
      <div className="flex flex-col space-y-2 bg-blue-100 p-4 rounded-b border">
        {schema.format() && (
          <span className="no-underline rounded lowercase p-1 text-sm">
            format:{' '}
            <span className="rounded font-bold p-1 text-sm">
              {schema.format()}
            </span>
          </span>
        )}
        {schema.pattern() && (
          <span className="no-underline rounded lowercase p-1 text-sm">
            must match:{' '}
            <span className="rounded font-bold p-1 text-sm">
              {schema.pattern()}
            </span>
          </span>
        )}
        {schema.contentEncoding() !== undefined && (
          <span className="no-underline rounded lowercase p-1 text-sm">
            encoding:{' '}
            <span className="rounded font-bold p-1 text-sm">
              {schema.contentEncoding()}
            </span>
          </span>
        )}
        {constraints.map((constraint) => (
          <strong
            key={constraint}
            className="text-purple-700 p-1 rounded-md text-sm"
          >
            {constraint}
          </strong>
        ))}
        {schema.default() !== undefined && (
          <div className="text-sm">
            <span className="">Default value:</span>
            <span className="bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded">
              {SchemaHelpers.prettifyValue(schema.default())}
            </span>
          </div>
        )}
        {schema.const() !== undefined && (
          <div className="text-sm">
            <span className="">Constant value: </span>
            <span className="bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded">
              {SchemaHelpers.prettifyValue(schema.const())}
            </span>
          </div>
        )}
        {schema.enum() && (
          <div className="text-sm">
            <span className="">Allowed values: </span>
            {schema.enum()?.map((e, idx) => (
              <span
                key={idx}
                className="bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"
              >
                {SchemaHelpers.prettifyValue(e)}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
