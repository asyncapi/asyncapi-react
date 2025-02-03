import React from 'react';
import { SchemaInterface } from '@asyncapi/parser';
import { Payload } from '../Payload';
import { SchemaHelpers } from '../../../helpers';

interface ConditionsProps {
  schema: SchemaInterface;
  recursionCounter?: number;
  dependentSchemas?: SchemaInterface;
}

export const Conditions = ({
  schema,
  recursionCounter = 0,
  dependentSchemas,
}: ConditionsProps) => {
  return (
    <>
      <p
        className={`text-sm font-semibold text-gray-900 bg-gray-400 p-2 rounded-t w-min`}
      >
        Conditions
      </p>
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
                  recursionCounter={recursionCounter + 1}
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
                  recursionCounter={recursionCounter + 1}
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
                  recursionCounter={recursionCounter + 1}
                />
              ))}
          </div>
        )}

        {schema.not() && (
          <Payload
            schema={schema.not()}
            schemaName="Can NOT adhere to:"
            recursionCounter={recursionCounter + 1}
          />
        )}

        {schema.propertyNames() && (
          <Payload
            schema={schema.propertyNames()}
            schemaName="Property names must adhere to:"
            recursionCounter={recursionCounter + 1}
          />
        )}

        {schema.contains() && (
          <Payload
            schema={schema.contains()}
            schemaName="Array must contain at least one of:"
            recursionCounter={recursionCounter + 1}
          />
        )}

        {schema.if() && (
          <div className="">
            {schema.if() && (
              <Payload
                schema={schema.if()}
                schemaName="If schema adheres to:"
                recursionCounter={recursionCounter + 1}
              />
            )}
            {schema.then() && (
              <Payload
                schema={schema.then()}
                schemaName="Then must adhere to:"
                recursionCounter={recursionCounter + 1}
              />
            )}
            {schema.else() && (
              <Payload
                schema={schema.else()}
                schemaName="Otherwise:"
                recursionCounter={recursionCounter + 1}
              />
            )}
          </div>
        )}
        
        {dependentSchemas && (
          <Payload
            schema={dependentSchemas}
            schemaName="Dependent schemas:"
            recursionCounter={recursionCounter + 1}
          />
        )}
      </div>
    </>
  );
};
