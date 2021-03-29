import React, { useState } from 'react';
import { Schema } from '@asyncapi/parser';

import { Extensions } from '../Extensions/Extensions';
import { Chevron, Markdown } from '../../components';
import { SchemaHelpers } from '../../helpers';

interface Props {
  schemaName?: string;
  schema?: Schema;
  required?: boolean;
  isCircular?: boolean;
  isPatternProperty?: boolean;
  isProperty?: boolean;
  expanded?: boolean;
}

export const SchemaComponent: React.FunctionComponent<Props> = ({
  schemaName,
  schema,
  required = false,
  isCircular = false,
  isPatternProperty = false,
  isProperty = false,
  expanded = false,
}) => {
  const [expand, setExpand] = useState(expanded);

  if (!schema) {
    return null;
  }

  const constraints = SchemaHelpers.humanizeConstraints(schema);
  const isExpandable = SchemaHelpers.isExpandable(schema);

  const renderType = schema.ext(SchemaHelpers.extRenderType) !== false;
  const rawValue = schema.ext(SchemaHelpers.extRawValue) === true;

  return (
    <div
      className={`json-schema pl-8 pr-8 py-2 rounded ${
        expand ? 'json-schema-open' : ''
      }`}
    >
      <div className="flex property">
        <div className="pr-4" style={{ minWidth: '25%' }}>
          <span
            className={`text-sm text-gray-500 ${isProperty ? 'italic' : ''}`}
          >
            {schemaName || schema.uid()}
          </span>
          {isExpandable && (
            <span onClick={() => setExpand(prev => !prev)}>
              <Chevron />
            </span>
          )}
          {isPatternProperty && (
            <div className="text-teal-500 text-xs">(pattern property)</div>
          )}
          {required && <div className="text-red-600 text-xs">required</div>}
          {schema.deprecated() && (
            <div className="text-red-600 text-xs">deprecated</div>
          )}
          {schema.writeOnly() && (
            <div className="text-teal-500 text-xs">write-only</div>
          )}
          {schema.readOnly() && (
            <div className="text-teal-500 text-xs">read-only</div>
          )}
        </div>
        {isCircular ? (
          <div>
            <div className="capitalize text-sm text-teal-500 font-bold">
              [CIRCULAR]
            </div>
          </div>
        ) : rawValue ? (
          <div>
            <div className="text-sm text-teal-500 font-bold">
              {schema.const()}
            </div>
          </div>
        ) : (
          <div>
            <div className="capitalize text-sm text-teal-500 font-bold">
              {renderType && SchemaHelpers.toSchemaType(schema)}
              <div className="inline-block">
                {schema.format() && (
                  <span
                    className="bg-yellow-600 font-bold no-underline text-black rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    format: {schema.format()}
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
                    media type: {schema.contentMediaType()}
                  </span>
                )}
                {schema.contentEncoding() !== undefined && (
                  <span
                    className="bg-purple-600 font-bold no-underline text-white rounded lowercase ml-2"
                    style={{ height: '20px', fontSize: '11px', padding: '3px' }}
                  >
                    encoding: {schema.contentEncoding()}
                  </span>
                )}
              </div>

              <Markdown>{schema.description()}</Markdown>

              {schema.default() !== undefined && (
                <div className="text-xs">Default value: {schema.default()}</div>
              )}
              {schema.const() !== undefined && (
                <div className="text-xs">Const: {schema.const()}</div>
              )}
              {schema.enum() && (
                <div className="text-xs">
                  Allowed values:{' '}
                  {schema.enum().map((e, idx) => (
                    <span
                      key={idx}
                      className="border text-orange-600 rounded ml-1 py-0 px-2"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              )}
              {schema.examples() && (
                <div className="text-xs">
                  Examples values:{' '}
                  {schema.examples().map((e, idx) => (
                    <span
                      key={idx}
                      className="border text-orange-600 rounded ml-1 py-0 px-2"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isCircular || !isExpandable
        ? null
        : expand && (
            <div className="json-schema">
              <SchemaProperties schema={schema} />
              <SchemaItems schema={schema} />

              {schema.oneOf() &&
                schema
                  .oneOf()
                  .map((s, idx) => (
                    <SchemaComponent
                      key={idx}
                      schema={s}
                      schemaName={`${idx}`}
                    />
                  ))}
              {schema.anyOf() &&
                schema
                  .anyOf()
                  .map((s, idx) => (
                    <SchemaComponent
                      key={idx}
                      schema={s}
                      schemaName={`${idx}`}
                    />
                  ))}
              {schema.allOf() &&
                schema
                  .allOf()
                  .map((s, idx) => (
                    <SchemaComponent
                      key={idx}
                      schema={s}
                      schemaName={`${idx}`}
                    />
                  ))}
              {schema.not() && (
                <SchemaComponent
                  schema={schema.not()}
                  schemaName="Cannot adhere to:"
                />
              )}

              {schema.propertyNames() && (
                <SchemaComponent
                  schema={schema.propertyNames()}
                  schemaName="Property names must adhere to:"
                />
              )}
              {schema.contains() && (
                <SchemaComponent
                  schema={schema.contains()}
                  schemaName="Array must contain at least one of:"
                />
              )}

              {schema.if() && (
                <SchemaComponent
                  schema={schema.if()}
                  schemaName="If schema adheres to:"
                />
              )}
              {schema.then() && (
                <SchemaComponent
                  schema={schema.then()}
                  schemaName="Then it must adhere to:"
                />
              )}
              {schema.else() && (
                <SchemaComponent
                  schema={schema.else()}
                  schemaName="Otherwise it must adhere to:"
                />
              )}

              <AdditionalProperties schema={schema} />
              <AdditionalItems schema={schema} />

              <Extensions item={schema} />
            </div>
          )}
    </div>
  );
};

interface SchemaPropertiesProps {
  schema: Schema;
}

const SchemaProperties: React.FunctionComponent<SchemaPropertiesProps> = ({
  schema,
}) => {
  const properties = schema.properties() || {};
  if (!Object.keys(properties)) {
    return null;
  }

  const required = schema.required() || [];
  const patternProperties = schema.patternProperties();
  const circularProps = schema.circularProps() || [];

  return (
    <>
      {Object.entries(properties).map(([propertyName, property]) => (
        <SchemaComponent
          schema={property}
          schemaName={propertyName}
          required={required.includes(propertyName)}
          isCircular={circularProps.includes(propertyName)}
          isProperty={true}
          key={propertyName}
        />
      ))}
      {Object.entries(patternProperties).map(([propertyName, property]) => (
        <SchemaComponent
          schema={property}
          schemaName={propertyName}
          isCircular={circularProps.includes(propertyName)}
          isPatternProperty={true}
          isProperty={true}
          key={propertyName}
        />
      ))}
    </>
  );
};

interface AdditionalPropertiesProps {
  schema: Schema;
}

const AdditionalProperties: React.FunctionComponent<AdditionalPropertiesProps> = ({
  schema,
}) => {
  if (schema.ext(SchemaHelpers.extRenderAdditionalInfo) === false) {
    return null;
  }

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
    <SchemaComponent
      schemaName="Additional properties must adhere to:"
      schema={additionalProperties}
    />
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
    return <SchemaProperties schema={items} />;
  } else if (Array.isArray(items)) {
    return (
      <>
        {items.map((item, idx) => (
          <SchemaComponent
            schema={item}
            schemaName={`${idx + 1} item:`}
            key={idx}
          />
        ))}
      </>
    );
  }
  return <SchemaComponent schema={items} schemaName="Items:" />;
};

interface AdditionalItemsProps {
  schema: Schema;
}

const AdditionalItems: React.FunctionComponent<AdditionalItemsProps> = ({
  schema,
}) => {
  if (schema.ext(SchemaHelpers.extRenderAdditionalInfo) === false) {
    return null;
  }

  let type = schema.type();
  type = Array.isArray(type) ? type : [type];
  if (!type.includes('array')) {
    return null;
  }
  if (!Array.isArray(schema.items())) {
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
    <SchemaComponent
      schemaName="Additional items must adhere to:"
      schema={additionalItems}
    />
  );
};
