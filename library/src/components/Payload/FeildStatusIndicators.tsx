import React from 'react';
import { SchemaInterface } from '@asyncapi/parser';

interface FeildStatusIndicatorProps {
  schema: SchemaInterface;
  required?: boolean;
  isPatternProperty?: boolean;
}

export const FeildStatusIndicator = ({
  schema,
  required = false,
  isPatternProperty
}: FeildStatusIndicatorProps) => {
  return (
    <>
      {(required ||
        schema.deprecated() ||
        schema.writeOnly() ||
        schema.readOnly() ||
        isPatternProperty) && (
        <div className="flex items-center space-x-2">
          {required && (
            <span className="text-red-600 text-xs rounded">required</span>
          )}
          {schema.deprecated() && (
            <span className="text-red-700 text-xs px-2 py-1 bg-red-200 border border-red-700 rounded">
              deprecated
            </span>
          )}
          {isPatternProperty && (
            <div className="text-gray-500 text-xs italic">
              (pattern property)
            </div>
          )}
          {schema.writeOnly() && (
            <span className="text-gray-600 text-xs rounded">write-only</span>
          )}
          {schema.readOnly() && (
            <span className="text-gray-500 text-xs rounded">read-only</span>
          )}
        </div>
      )}
    </>
  );
};
