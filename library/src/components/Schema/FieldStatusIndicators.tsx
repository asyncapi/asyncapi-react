import React from 'react';
import type { Props as SchemaProps } from './Schema';

export const FieldStatusIndicator = ({
  schema,
  required = false,
  isPatternProperty,
  dependentRequired,
}: Pick<
  SchemaProps,
  'schema' | 'required' | 'isPatternProperty' | 'dependentRequired'
>) => {
  if (!schema) {
    return null;
  }

  const isRequired = required ?? false;
  const isDeprecated = schema.deprecated() ?? false;
  const isWriteOnly = schema.writeOnly() ?? false;
  const isReadOnly = schema.readOnly() ?? false;
  const isPattern = isPatternProperty ?? false;

  return (
    <>
      {(isRequired ||
        isDeprecated ||
        isWriteOnly ||
        isReadOnly ||
        isPattern) && (
        <div className="flex items-center space-x-2">
          {isRequired && (
            <span className="text-red-600 text-xs rounded">required</span>
          )}
          {dependentRequired && (
            <>
              <div className="text-gray-500 text-xs">
                required when defined:
              </div>
              <div className="text-red-600 text-xs">
                {dependentRequired.join(', ')}
              </div>
            </>
          )}
          {isDeprecated && (
            <span className="text-red-700 text-xs px-2 py-1 bg-red-200 border border-red-700 rounded">
              deprecated
            </span>
          )}
          {isPatternProperty && (
            <div className="text-gray-500 text-xs italic">
              (pattern property)
            </div>
          )}
          {isWriteOnly && (
            <span className="text-gray-600 text-xs rounded">write-only</span>
          )}
          {isReadOnly && (
            <span className="text-gray-500 text-xs rounded">read-only</span>
          )}
        </div>
      )}
    </>
  );
};
