import React, { useState, useContext } from 'react';
import { Schema as SchemaType } from '@asyncapi/parser';

import { Href, CollapseButton, Markdown, Extensions } from './index';
import { SchemaHelpers } from '../helpers';

interface Props {
  schemaName?: string;
  schema?: SchemaType;
  required?: boolean;
  isCircular?: boolean;
  isPatternProperty?: boolean;
  isProperty?: boolean;
  dependentRequired?: string[];
  expanded?: boolean;
}

const SchemaContext = React.createContext({ reverse: false });

export const Schema: React.FunctionComponent<Props> = ({
  schemaName,
  schema,
  required = false,
  isCircular = false,
  isPatternProperty = false,
  isProperty = false,
  dependentRequired,
  expanded = false,
}) => {
  const { reverse } = useContext(SchemaContext);
  const [expand, setExpand] = useState(expanded);

  if (
    !schema ||
    schemaName?.startsWith('x-parser-') ||
    schemaName?.startsWith('x-schema-private-')
  ) {
    return null;
  }

  const dependentSchemas = SchemaHelpers.getDependentSchemas(schema);

  const constraints = SchemaHelpers.humanizeConstraints(schema);
  const externalDocs = schema.externalDocs();

  const renderType = schema.ext(SchemaHelpers.extRenderType) !== false;
  const rawValue = schema.ext(SchemaHelpers.extRawValue) === true;
  const parameterLocation = schema.ext(SchemaHelpers.extParameterLocation);

  const isExpandable = SchemaHelpers.isExpandable(schema) || dependentSchemas;
  isCircular = isCircular || schema.ext('x-parser-circular') || false;

  let uid = schema.uid();

  /**
   * checking uid for circular items
   * after fixing https://github.com/asyncapi/parser-js/issues/293 statement should be removed
   * `x-parser-circular` extension is added to every schema which has circular `items` field,
   * so we must check that `items` is schema (not array of schemas) and infer UID of schema to display which schema is circular (by the name of schema)
   */
  if (
    isCircular &&
    !uid &&
    schema.items() &&
    typeof (schema.items() as SchemaType).uid === 'function'
  ) {
    uid = (schema.items() as SchemaType).uid();
  }

  return (
    <SchemaContext.Provider value={{ reverse: !reverse }}>
      <div>
        <div className="aui-flex aui-py-2">
          <div className="aui-w-3/12 aui-min-w-min aui-mr-2">
            {isExpandable && !isCircular ? (
              <CollapseButton
                onClick={() => setExpand(prev => !prev)}
                chevronProps={{
                  className: expand ? 'aui--rotate-180' : 'aui--rotate-90',
                }}
              >
                <span
                  className={`aui-break-words aui-text-sm ${
                    isProperty ? 'aui-italic' : ''
                  }`}
                >
                  {schemaName}
                </span>
              </CollapseButton>
            ) : (
              <span
                className={`aui-break-words aui-text-sm ${
                  isProperty ? 'aui-italic' : ''
                }`}
              >
                {schemaName}
              </span>
            )}
            {isPatternProperty && (
              <div className="aui-text-gray-500 aui-text-xs aui-italic">
                (pattern property)
              </div>
            )}
            {required && (
              <div className="aui-text-red-600 aui-text-xs">required</div>
            )}
            {dependentRequired && (
              <>
                <div className="aui-text-gray-500 aui-text-xs">
                  required when defined:
                </div>
                <div className="aui-text-red-600 aui-text-xs">
                  {dependentRequired.join(', ')}
                </div>
              </>
            )}
            {schema.deprecated() && (
              <div className="aui-text-red-600 aui-text-xs">deprecated</div>
            )}
            {schema.writeOnly() && (
              <div className="aui-text-gray-500 aui-text-xs">write-only</div>
            )}
            {schema.readOnly() && (
              <div className="aui-text-gray-500 aui-text-xs">read-only</div>
            )}
          </div>
          {rawValue ? (
            <div>
              <div className="aui-text-sm">{schema.const()}</div>
            </div>
          ) : (
            <div>
              <div>
                {renderType && (
                  <div className="aui-capitalize aui-text-sm aui-text-teal-500 aui-font-bold aui-inline-block aui-mr-2">
                    {isCircular
                      ? `${SchemaHelpers.toSchemaType(schema)} [CIRCULAR]`
                      : SchemaHelpers.toSchemaType(schema)}
                  </div>
                )}
                <div className="aui-inline-block">
                  {schema.format() && (
                    <span className="aui-bg-yellow-600 aui-font-bold aui-no-underline aui-text-white aui-rounded aui-lowercase aui-mr-2 aui-p-1 aui-text-xs">
                      format: {schema.format()}
                    </span>
                  )}

                  {/* related to string */}
                  {schema.pattern() !== undefined && (
                    <span className="aui-bg-yellow-600 aui-font-bold aui-no-underline aui-text-white aui-rounded aui-lowercase aui-mr-2 aui-p-1 aui-text-xs">
                      must match: {schema.pattern()}
                    </span>
                  )}
                  {schema.contentMediaType() !== undefined && (
                    <span className="aui-bg-yellow-600 aui-font-bold aui-no-underline aui-text-white aui-rounded aui-lowercase aui-mr-2 aui-p-1 aui-text-xs">
                      media type: {schema.contentMediaType()}
                    </span>
                  )}
                  {schema.contentEncoding() !== undefined && (
                    <span className="aui-bg-yellow-600 aui-font-bold aui-no-underline aui-text-white aui-rounded aui-lowercase aui-mr-2 aui-p-1 aui-text-xs">
                      encoding: {schema.contentEncoding()}
                    </span>
                  )}

                  {/* constraints */}
                  {!!constraints.length &&
                    constraints.map(c => (
                      <span
                        className="aui-bg-purple-600 aui-font-bold aui-no-underline aui-text-white aui-rounded aui-lowercase aui-mr-2 aui-p-1 aui-text-xs"
                        key={c}
                      >
                        {c}
                      </span>
                    ))}

                  {uid && !uid.startsWith('<anonymous-') && (
                    <span className="aui-border aui-text-orange-600 aui-rounded aui-mr-2 aui-p-1 aui-text-xs">
                      uid: {uid}
                    </span>
                  )}
                </div>

                {schema.hasDescription() && (
                  <div>
                    <Markdown>{schema.description()}</Markdown>
                  </div>
                )}

                {schema.default() !== undefined && (
                  <div className="aui-text-xs">
                    Default value:
                    <span className="aui-border aui-inline-block aui-text-orange-600 aui-rounded aui-ml-1 aui-py-0 aui-px-2">
                      {SchemaHelpers.prettifyValue(schema.default())}
                    </span>
                  </div>
                )}
                {schema.const() !== undefined && (
                  <div className="aui-text-xs">
                    Const:
                    <span className="aui-border aui-inline-block aui-text-orange-600 aui-rounded aui-ml-1 aui-py-0 aui-px-2">
                      {SchemaHelpers.prettifyValue(schema.const())}
                    </span>
                  </div>
                )}
                {schema.enum() && (
                  <ul className="aui-text-xs">
                    Allowed values:{' '}
                    {schema.enum().map((e, idx) => (
                      <li
                        key={idx}
                        className="aui-border aui-inline-block aui-text-orange-600 aui-rounded aui-ml-1 aui-py-0 aui-px-2"
                      >
                        <span>{SchemaHelpers.prettifyValue(e)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {parameterLocation && (
                  <div className="aui-text-xs">
                    Parameter location:{' '}
                    <span className="aui-border aui-text-orange-600 aui-rounded aui-mr-2 aui-p-1 aui-text-xs">
                      {parameterLocation}
                    </span>
                  </div>
                )}
                {externalDocs && (
                  <span className="aui-border aui-border-solid aui-border-orange-300 hover:aui-bg-orange-300 hover:aui-text-orange-600 aui-text-orange-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-2 aui-py-0">
                    <Href
                      href={externalDocs.url()}
                      title={externalDocs.description() || ''}
                    >
                      Documentation
                    </Href>
                  </span>
                )}
                {schema.examples() && (
                  <ul className="aui-text-xs">
                    Examples values:{' '}
                    {schema.examples().map((e, idx) => (
                      <li
                        key={idx}
                        className="aui-border aui-inline-block aui-text-orange-600 aui-rounded aui-ml-1 aui-py-0 aui-px-2"
                      >
                        <span>{SchemaHelpers.prettifyValue(e)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {isCircular || !isExpandable ? null : (
          <div
            className={`aui-rounded aui-p-4 aui-py-2 aui-bg-gray-100 aui-border aui-bg-gray-100 ${
              reverse ? 'aui-bg-gray-200' : ''
            } ${expand ? 'aui-block' : 'aui-hidden'}`}
          >
            <SchemaProperties schema={schema} />
            <SchemaItems schema={schema} />

            {schema.oneOf() &&
              schema
                .oneOf()
                .map((s, idx) => (
                  <Schema
                    key={idx}
                    schema={s}
                    schemaName={idx === 0 ? 'Adheres to:' : 'Or to:'}
                  />
                ))}
            {schema.anyOf() &&
              schema
                .anyOf()
                .map((s, idx) => (
                  <Schema
                    key={idx}
                    schema={s}
                    schemaName={idx === 0 ? 'Can adhere to:' : 'Or to:'}
                  />
                ))}
            {schema.allOf() &&
              schema
                .allOf()
                .map((s, idx) => (
                  <Schema
                    key={idx}
                    schema={s}
                    schemaName={idx === 0 ? 'Consists of:' : 'And with:'}
                  />
                ))}
            {schema.not() && (
              <Schema schema={schema.not()} schemaName="Cannot adhere to:" />
            )}

            {schema.propertyNames() && (
              <Schema
                schema={schema.propertyNames()}
                schemaName="Property names must adhere to:"
              />
            )}
            {schema.contains() && (
              <Schema
                schema={schema.contains()}
                schemaName="Array must contain at least one of:"
              />
            )}

            {schema.if() && (
              <Schema schema={schema.if()} schemaName="If schema adheres to:" />
            )}
            {schema.then() && (
              <Schema
                schema={schema.then()}
                schemaName="Then must adhere to:"
              />
            )}
            {schema.else() && (
              <Schema schema={schema.else()} schemaName="Otherwise:" />
            )}

            {dependentSchemas && (
              <Schema
                schema={dependentSchemas}
                schemaName="Dependent schemas:"
              />
            )}

            <Extensions item={schema} />

            <AdditionalProperties schema={schema} />
            <AdditionalItems schema={schema} />
          </div>
        )}
      </div>
    </SchemaContext.Provider>
  );
};

interface SchemaPropertiesProps {
  schema: SchemaType;
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
        <Schema
          schema={property}
          schemaName={propertyName}
          required={required.includes(propertyName)}
          isCircular={circularProps.includes(propertyName)}
          isProperty={true}
          dependentRequired={SchemaHelpers.getDependentRequired(
            propertyName,
            schema,
          )}
          key={propertyName}
        />
      ))}
      {Object.entries(patternProperties).map(([propertyName, property]) => (
        <Schema
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
  schema: SchemaType;
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
      <p className="aui-mt-2 aui-text-xs aui-text-gray-700">
        Additional properties are allowed.
      </p>
    );
  }
  if (additionalProperties === false) {
    return (
      <p className="aui-mt-2 aui-text-xs aui-text-gray-700">
        Additional properties are <strong>NOT</strong> allowed.
      </p>
    );
  }
  return (
    <Schema schemaName="Additional properties:" schema={additionalProperties} />
  );
};

interface SchemaItemsProps {
  schema: SchemaType;
}

const SchemaItems: React.FunctionComponent<SchemaItemsProps> = ({ schema }) => {
  let type = schema.type();
  type = Array.isArray(type) ? type : [type];
  if (!type.includes('array')) {
    return null;
  }
  const items = schema.items();

  // object in items
  if (
    items &&
    !Array.isArray(items) &&
    Object.keys(items.properties() || {}).length
  ) {
    return <SchemaProperties schema={items} />;
  } else if (Array.isArray(items)) {
    return (
      <>
        {items.map((item, idx) => (
          <Schema schema={item} schemaName={`${idx + 1} item:`} key={idx} />
        ))}
      </>
    );
  }
  return <Schema schema={items} schemaName="Items:" />;
};

interface AdditionalItemsProps {
  schema: SchemaType;
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
      <p className="aui-mt-2 aui-text-xs aui-text-gray-700">
        Additional items are allowed.
      </p>
    );
  }
  if (additionalItems === false) {
    return (
      <p className="aui-mt-2 aui-text-xs aui-text-gray-700">
        Additional items are <strong>NOT</strong> allowed.
      </p>
    );
  }
  return <Schema schemaName="Additional items:" schema={additionalItems} />;
};
