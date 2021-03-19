import React from 'react';
import { Schema } from '@asyncapi/parser';

import { Markdown } from '../../components';

interface Props {
  schema?: Schema;
  schemaName?: string;
  root?: boolean;
  required?: boolean;
  isCircular?: boolean;
  odd?: boolean;
}

export const SchemaComponent: React.FunctionComponent<Props> = ({
  schema,
  schemaName,
  root = true,
  required = false,
  isCircular = false,
  odd = false,
}) => {
  if (!schema) {
    return null;
  }

  let rootClassName = '';
  if (odd) {
    rootClassName = 'bg-gray-200 rounded';
  } else {
    rootClassName = 'bg-gray-100 rounded';
  }

  return (
    <div className={rootClassName} style={{ marginLeft: odd ? '20px' : '0' }}>
      <div className="flex property">
        <div className="pr-4">
          <span
            // fix styling from html-template in this place - e.g. line-through on deprecated etc
            className="text-sm italic text-gray-500"
          >
            {schemaName} {schema.uid()}
          </span>
          {required && <div className="text-red-600 text-xs">required</div>}
          {schema.deprecated() && (
            <div className="text-red-600 text-xs">deprecated</div>
          )}
        </div>
        {isCircular ? (
          <div>
            <div className="capitalize text-sm text-teal-500 font-bold">
              [CIRCULAR]
            </div>
          </div>
        ) : (
          <div>
            <div className="capitalize text-sm text-teal-500 font-bold">
              {toSchemaType(schema)}
              <div className="inline-block">
                {schema.format() && (
                  <span
                    className="bg-yellow-600 font-bold no-underline text-black rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    {schema.format()}
                  </span>
                )}

                {schema.minimum() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                    title={`At least ${schema.minimum()}`}
                  >
                    {`>=`} {schema.minimum()}
                  </span>
                )}
                {schema.exclusiveMinimum() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                    title={`Greater than ${schema.exclusiveMinimum()}`}
                  >
                    {`>`} {schema.exclusiveMinimum()}
                  </span>
                )}

                {schema.maximum() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                    title={`At most ${schema.maximum()}`}
                  >
                    {`<=`} {schema.maximum()}
                  </span>
                )}
                {schema.exclusiveMaximum() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                    title={`Less than ${schema.exclusiveMaximum()}`}
                  >
                    {`<`} {schema.exclusiveMaximum()}
                  </span>
                )}

                {schema.minItems() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    {`>=`} {schema.minItems()} items
                  </span>
                )}
                {schema.maxItems() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    {`<=`} {schema.maxItems()} items
                  </span>
                )}
                {schema.uniqueItems() && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                    title="Array items must be unique"
                  >
                    unique items
                  </span>
                )}

                {schema.minLength() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    {`>=`} {schema.minLength()} characters
                  </span>
                )}
                {schema.maxLength() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    {`<=`} {schema.maxLength()} characters
                  </span>
                )}

                {schema.pattern() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    must match {schema.pattern()}
                  </span>
                )}
              </div>

              <Markdown>{schema.description()}</Markdown>

              {schema.default() !== undefined && (
                <div className="text-xs">Default: {schema.default()}</div>
              )}
              {schema.const() !== undefined && (
                <div className="text-xs">Const: {schema.const()}</div>
              )}
              {schema.enum() && (
                <div className="text-xs">
                  Enum:{' '}
                  {schema.enum().map(e => (
                    <span className="border text-orange-600 rounded ml-1 py-0 px-2">
                      {e}
                    </span>
                  ))}
                </div>
              )}
              {schema.examples() && (
                <div className="text-xs">
                  Examples:{' '}
                  {schema.examples().map(e => (
                    <span className="border text-orange-600 rounded ml-1 py-0 px-2">
                      {e}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isCircular ? null : (
        <>
          <SchemaProperties schema={schema} odd={odd} />
          <SchemaAdditionalProperties schema={schema} />

          <SchemaItems schema={schema} />
          <SchemaAdditionalItems schema={schema} />

          {schema.oneOf() && (
            <>
              {schema.oneOf().map((s, idx) => (
                <SchemaComponent schema={s} schemaName={`${idx}`} />
              ))}
            </>
          )}
          {schema.anyOf() && (
            <>
              {schema.anyOf().map((s, idx) => (
                <SchemaComponent schema={s} schemaName={`${idx}`} />
              ))}
            </>
          )}
          {schema.allOf() && (
            <>
              {schema.allOf().map((s, idx) => (
                <SchemaComponent schema={s} schemaName={`${idx}`} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

interface SchemaPropertiesProps {
  schema: Schema;
  odd: boolean;
}

const SchemaProperties: React.FunctionComponent<SchemaPropertiesProps> = ({
  schema,
  odd,
}) => {
  const properties = schema.properties() || {};
  if (!Object.keys(properties)) {
    return null;
  }

  const required = schema.required() || [];
  const circularProps = schema.circularProps() || [];

  return (
    <>
      {Object.entries(properties).map(([propertyName, property]) => (
        <SchemaComponent
          schema={property}
          schemaName={propertyName}
          required={required.includes(propertyName)}
          isCircular={circularProps.includes(propertyName)}
          odd={!odd}
        />
      ))}
    </>
  );
};

interface SchemaAdditionalPropertiesProps {
  schema: Schema;
}

const SchemaAdditionalProperties: React.FunctionComponent<SchemaAdditionalPropertiesProps> = ({
  schema,
}) => {
  let type = schema.type();
  type = Array.isArray(type) ? type : [type];
  if (!type.includes('object')) {
    return null;
  }

  const additionalProperties = schema.additionalProperties();
  if (additionalProperties === true || additionalProperties === undefined) {
    return (
      <p className="pl-6 mb-2 mt-4 text-xs text-gray-700">
        Additional properties are allowed.
      </p>
    );
  }
  if (additionalProperties === false) {
    return (
      <p className="pl-6 mb-2 mt-4 text-xs text-gray-700">
        Additional properties are <strong>NOT</strong> allowed.
      </p>
    );
  }
  return (
    <>
      <p className="pl-6 mb-2 mt-4 text-xs font-bold text-gray-700">
        Additional properties must adhere to the following schema:
      </p>
      <div className="bg-gray-300 pl-6">
        <SchemaComponent schema={additionalProperties} />
      </div>
    </>
  );
};

interface SchemaItemsProps {
  schema: Schema;
}

const SchemaItems: React.FunctionComponent<SchemaItemsProps> = ({ schema }) => {
  let type = schema.type();
  type = Array.isArray(type) ? type : [type];
  if (!type.includes('array')) {
    return null;
  }
  const items = schema.items();

  // object in items
  if (items && !Array.isArray(items) && items.properties()) {
    return <SchemaProperties schema={items} odd={false} />;
  } else if (Array.isArray(items)) {
    return (
      <>
        {items.map((item, idx) => (
          <SchemaComponent schema={item} schemaName={`${idx}`} />
        ))}
      </>
    );
  }
  return <SchemaComponent schema={items} schemaName={'0'} />;
};

interface SchemaAdditionalItemsProps {
  schema: Schema;
}

const SchemaAdditionalItems: React.FunctionComponent<SchemaAdditionalItemsProps> = ({
  schema,
}) => {
  let type = schema.type();
  type = Array.isArray(type) ? type : [type];
  if (!type.includes('array')) {
    return null;
  }

  const additionalItems = schema.additionalItems() as any;
  if (additionalItems === true || additionalItems === undefined) {
    return (
      <p className="pl-6 mb-2 mt-4 text-xs text-gray-700">
        Additional items are allowed.
      </p>
    );
  }
  if (additionalItems === false) {
    return (
      <p className="pl-6 mb-2 mt-4 text-xs text-gray-700">
        Additional items are <strong>NOT</strong> allowed.
      </p>
    );
  }
  return (
    <>
      <p className="pl-6 mb-2 mt-4 text-xs font-bold text-gray-700">
        Additional items must adhere to the following schema:
      </p>
      <div className="bg-gray-300 pl-6">
        <SchemaComponent schema={additionalItems} />
      </div>
    </>
  );
};

interface SchemaExtensionProps {
  schema: Schema;
}

const SchemaExtension: React.FunctionComponent<SchemaExtensionProps> = ({
  schema,
}) => {
  const extensions = Object.entries(schema.extensions()).filter(ext => {
    return !ext[0].startsWith('x-parser-');
  });

  if (!extensions.length) {
    return null;
  }

  return (
    <>
      {extensions.map(([extensionName, extensionValue]) => {
        return <>{`${extensionName}: ${extensionValue}`}</>;
      })}
    </>
  );
};

// TODO: this function doesn't support combined schema, we should support it
function toSchemaType(schema: Schema): string {
  const type = schema.type();
  if (Array.isArray(type)) {
    return type.map(t => toType(t, schema)).join(' | ');
  }
  return toType(type, schema);
}

function toType(type: string, schema: Schema): string {
  if (type === 'array') {
    const items = schema.items();
    let types = 'Unknown';
    if (Array.isArray(items)) {
      types = items.map(item => toSchemaType(item)).join(', ');
    } else if (items) {
      types = toSchemaType(items);
    }
    return `Array<${types}>`;
  }
  return type;
}
