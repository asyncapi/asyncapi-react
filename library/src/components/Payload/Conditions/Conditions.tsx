import React from 'react';
import { SchemaInterface } from '@asyncapi/parser';
import { Payload } from '../Payload';
import { SchemaHelpers } from '../../../helpers';

interface ConditionsProps {
  schema: SchemaInterface;
  dependentSchemas?: SchemaInterface;
}

export const Conditions = ({ schema, dependentSchemas }: ConditionsProps) => {
  return (
    <div className={`space-y-2 bg-blue-100 border rounded rounded-tl-none p-4`}>
      {schema.oneOf()?.length && (
        <div className="">
          <h5 className="text-sm font-semibold text-gray-700 mb-2">
            Can be <strong>One Of</strong> the following:
          </h5>
          {schema
            .oneOf()
            ?.map((s, idx) => (
              <Payload
                key={idx}
                schema={s}
                schemaName={SchemaHelpers.applicatorSchemaName(
                  idx,
                  '',
                  '',
                  s.title() ?? s.id(),
                )}
              />
            ))}
        </div>
      )}

      {schema.anyOf()?.length && (
        <div className="">
          <h5 className="text-sm font-semibold text-gray-700 mb-2">
            Can be <strong>Any Of</strong> the following:
          </h5>
          {schema
            .anyOf()
            ?.map((s, idx) => (
              <Payload
                key={idx}
                schema={s}
                schemaName={SchemaHelpers.applicatorSchemaName(
                  idx,
                  '',
                  '',
                  s.title() ?? s.id(),
                )}
              />
            ))}
        </div>
      )}

      {schema.allOf()?.length && (
        <div className="">
          <h5 className="text-sm font-semibold text-gray-700 mb-2">
            Must consist <strong>All Of</strong> the following:
          </h5>
          {schema
            .allOf()
            ?.map((s, idx) => (
              <Payload
                key={idx}
                schema={s}
                schemaName={SchemaHelpers.applicatorSchemaName(
                  idx,
                  '',
                  '',
                  s.title() ?? s.id(),
                )}
              />
            ))}
        </div>
      )}

      {schema.not() && (
        <Payload schema={schema.not()} schemaName="Can NOT adhere to:" />
      )}

      {schema.propertyNames() && (
        <Payload
          schema={schema.propertyNames()}
          schemaName="Property names must adhere to:"
        />
      )}

      {schema.contains() && (
        <Payload
          schema={schema.contains()}
          schemaName="Array must contain at least one of:"
        />
      )}

      {schema.if() && (
        <div className="">
          {schema.if() && (
            <Payload schema={schema.if()} schemaName="If schema adheres to:" />
          )}
          {schema.then() && (
            <Payload schema={schema.then()} schemaName="Then must adhere to:" />
          )}
          {schema.else() && (
            <Payload schema={schema.else()} schemaName="Otherwise:" />
          )}
        </div>
      )}

      {dependentSchemas && (
        <Payload schema={dependentSchemas} schemaName="Dependent schemas:" />
      )}
    </div>
  );
};
