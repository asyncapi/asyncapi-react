import React, { useState } from 'react';
import { Schema } from '@asyncapi/parser';

import { Chevron, Markdown } from '../../components';
import { SchemaHelpers } from '../../helpers';

interface Props {
  schemaName?: string;
  schema?: Schema;
  required?: boolean;
  isCircular?: boolean;
  odd?: boolean;
}

export const SchemaComponent: React.FunctionComponent<Props> = ({
  schemaName,
  schema,
  required = false,
  isCircular = false,
  odd = false,
}) => {
  const [expand, setExpand] = useState(false);

  if (!schema) {
    return null;
  }

  const constraints = SchemaHelpers.humanizeConstraints(schema);
  const isExpandable = SchemaHelpers.isExpandable(schema);

  return (
    <div
      className={`${
        odd ? 'bg-gray-200' : 'bg-gray-100'
      } pl-8 pr-8 py-2 rounded`}
    >
      <div className="flex property">
        <div className="pr-4" style={{ marginTop: '-2px', minWidth: '25%' }}>
          <span className="text-sm italic text-gray-500">
            {schemaName || schema.uid()}
          </span>
          {isExpandable && (
            <span onClick={() => setExpand(prev => !prev)}>
              <Chevron />
            </span>
          )}
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
              {SchemaHelpers.toSchemaType(schema)}
              <div className="inline-block">
                {schema.format() && (
                  <span
                    className="bg-yellow-600 font-bold no-underline text-black rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    {schema.format()}
                  </span>
                )}

                {/* constraints */}
                {!!constraints.length && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    {constraints.join(', ')}
                  </span>
                )}

                {/* related to string */}
                {schema.pattern() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    must match {schema.pattern()}
                  </span>
                )}
                {schema.contentMediaType() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    {schema.contentMediaType()} media type
                  </span>
                )}
                {schema.contentEncoding() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    {schema.contentEncoding()} encoding
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

      {isCircular || !isExpandable ? null : expand ? (
        <div className={`${odd ? 'bg-gray-100' : 'bg-gray-200'}`}>
          <SchemaProperties schema={schema} odd={!odd} />
          <SchemaItems schema={schema} odd={!odd} />

          {schema.oneOf() &&
            schema
              .oneOf()
              .map((s, idx) => (
                <SchemaComponent schema={s} schemaName={`${idx}`} odd={!odd} />
              ))}
          {schema.anyOf() &&
            schema
              .anyOf()
              .map((s, idx) => (
                <SchemaComponent schema={s} schemaName={`${idx}`} odd={!odd} />
              ))}
          {schema.allOf() &&
            schema
              .allOf()
              .map((s, idx) => (
                <SchemaComponent schema={s} schemaName={`${idx}`} odd={!odd} />
              ))}
        </div>
      ) : null}
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
          odd={odd}
        />
      ))}
      <SchemaAdditionalProperties schema={schema} odd={odd} />
    </>
  );
};

interface SchemaAdditionalPropertiesProps {
  schema: Schema;
  odd: boolean;
}

const SchemaAdditionalProperties: React.FunctionComponent<SchemaAdditionalPropertiesProps> = ({
  schema,
  odd,
}) => {
  let type = schema.type();
  type = Array.isArray(type) ? type : [type];
  if (!type.includes('object')) {
    return null;
  }

  const additionalProperties = schema.additionalProperties();
  if (additionalProperties === true || additionalProperties === undefined) {
    return (
      <p className="pl-6 pb-2 mb-2 mt-4 text-xs text-gray-700">
        Additional properties are allowed.
      </p>
    );
  }
  if (additionalProperties === false) {
    return (
      <p className="pl-6 pb-2 mb-2 mt-4 text-xs text-gray-700">
        Additional properties are <strong>NOT</strong> allowed.
      </p>
    );
  }
  return (
    <>
      <p className="pl-6 pb-2 mb-2 mt-4 text-xs font-bold text-gray-700">
        Additional properties must adhere to the following schema:
      </p>
      <div className="bg-gray-300 pl-6">
        <SchemaComponent schema={additionalProperties} odd={odd} />
      </div>
    </>
  );
};

interface SchemaItemsProps {
  schema: Schema;
  odd: boolean;
}

const SchemaItems: React.FunctionComponent<SchemaItemsProps> = ({
  schema,
  odd,
}) => {
  let type = schema.type();
  type = Array.isArray(type) ? type : [type];
  if (!type.includes('array')) {
    return null;
  }
  const items = schema.items();

  // object in items
  if (items && !Array.isArray(items) && items.properties()) {
    return <SchemaProperties schema={items} odd={odd} />;
  } else if (Array.isArray(items)) {
    return (
      <>
        {items.map((item, idx) => (
          <SchemaComponent schema={item} schemaName={`${idx}`} odd={odd} />
        ))}
        <SchemaAdditionalItems schema={schema} odd={odd} />
      </>
    );
  }
  return <SchemaComponent schema={items} schemaName={'0'} odd={odd} />;
};

interface SchemaAdditionalItemsProps {
  schema: Schema;
  odd: boolean;
}

const SchemaAdditionalItems: React.FunctionComponent<SchemaAdditionalItemsProps> = ({
  schema,
  odd,
}) => {
  let type = schema.type();
  type = Array.isArray(type) ? type : [type];
  if (!type.includes('array')) {
    return null;
  }

  const additionalItems = schema.additionalItems() as any;
  if (additionalItems === true || additionalItems === undefined) {
    return (
      <p className="pl-6 pb-2 mb-2 mt-4 text-xs text-gray-700">
        Additional items are allowed.
      </p>
    );
  }
  if (additionalItems === false) {
    return (
      <p className="pl-6 pb-2 mb-2 mt-4 text-xs text-gray-700">
        Additional items are <strong>NOT</strong> allowed.
      </p>
    );
  }
  return (
    <>
      <p className="pl-6 pb-2 mb-2 mt-4 text-xs font-bold text-gray-700">
        Additional items must adhere to the following schema:
      </p>
      <div className="bg-gray-300 pl-6">
        <SchemaComponent schema={additionalItems} odd={odd} />
      </div>
    </>
  );
};
