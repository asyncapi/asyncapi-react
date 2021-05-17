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

  const uid = schema.uid();
  const dependentSchemas = SchemaHelpers.getDependentSchemas(schema);

  const constraints = SchemaHelpers.humanizeConstraints(schema);
  const isExpandable = SchemaHelpers.isExpandable(schema) || dependentSchemas;
  const externalDocs = schema.externalDocs();

  const renderType = schema.ext(SchemaHelpers.extRenderType) !== false;
  const rawValue = schema.ext(SchemaHelpers.extRawValue) === true;
  const parameterLocation = schema.ext(SchemaHelpers.extParameterLocation);

  return (
    <SchemaContext.Provider value={{ reverse: !reverse }}>
      <div>
        <div className="flex py-2">
          <div className="w-3/12 min-w-min mr-2">
            {isExpandable && !isCircular ? (
              <CollapseButton
                onClick={() => setExpand(prev => !prev)}
                chevronProps={{
                  className: expand ? '-rotate-180' : '-rotate-90',
                }}
              >
                <span
                  className={`break-words text-sm ${
                    isProperty ? 'italic' : ''
                  }`}
                >
                  {schemaName}
                </span>
              </CollapseButton>
            ) : (
              <span
                className={`break-words text-sm ${isProperty ? 'italic' : ''}`}
              >
                {schemaName}
              </span>
            )}
            {isPatternProperty && (
              <div className="text-gray-500 text-xs italic">
                (pattern property)
              </div>
            )}
            {required && <div className="text-red-600 text-xs">required</div>}
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
            {schema.deprecated() && (
              <div className="text-red-600 text-xs">deprecated</div>
            )}
            {schema.writeOnly() && (
              <div className="text-gray-500 text-xs">write-only</div>
            )}
            {schema.readOnly() && (
              <div className="text-gray-500 text-xs">read-only</div>
            )}
          </div>
          {rawValue ? (
            <div>
              <div className="text-sm">{schema.const()}</div>
            </div>
          ) : (
            <div>
              <div>
                {renderType && (
                  <div className="capitalize text-sm text-teal-500 font-bold inline-block mr-2">
                    {isCircular
                      ? '[CIRCULAR]'
                      : SchemaHelpers.toSchemaType(schema)}
                  </div>
                )}
                <div className="inline-block">
                  {schema.format() && (
                    <span className="bg-yellow-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs">
                      format: {schema.format()}
                    </span>
                  )}

                  {/* related to string */}
                  {schema.pattern() !== undefined && (
                    <span className="bg-yellow-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs">
                      must match: {schema.pattern()}
                    </span>
                  )}
                  {schema.contentMediaType() !== undefined && (
                    <span className="bg-yellow-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs">
                      media type: {schema.contentMediaType()}
                    </span>
                  )}
                  {schema.contentEncoding() !== undefined && (
                    <span className="bg-yellow-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs">
                      encoding: {schema.contentEncoding()}
                    </span>
                  )}

                  {/* constraints */}
                  {!!constraints.length &&
                    constraints.map(c => (
                      <span
                        className="bg-purple-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs"
                        key={c}
                      >
                        {c}
                      </span>
                    ))}

                  {uid && !uid.startsWith('<anonymous-') && (
                    <span className="border text-orange-600 rounded mr-2 p-1 text-xs">
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
                  <div className="text-xs">
                    Default value:
                    <span className="border inline-block text-orange-600 rounded ml-1 py-0 px-2">
                      {SchemaHelpers.prettifyValue(schema.default())}
                    </span>
                  </div>
                )}
                {schema.const() !== undefined && (
                  <div className="text-xs">
                    Const:
                    <span className="border inline-block text-orange-600 rounded ml-1 py-0 px-2">
                      {SchemaHelpers.prettifyValue(schema.const())}
                    </span>
                  </div>
                )}
                {schema.enum() && (
                  <ul className="text-xs">
                    Allowed values:{' '}
                    {schema.enum().map((e, idx) => (
                      <li
                        key={idx}
                        className="border inline-block text-orange-600 rounded ml-1 py-0 px-2"
                      >
                        <span>{SchemaHelpers.prettifyValue(e)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {parameterLocation && (
                  <div className="text-xs">
                    Parameter location:{' '}
                    <span className="border text-orange-600 rounded mr-2 p-1 text-xs">
                      {parameterLocation}
                    </span>
                  </div>
                )}
                {externalDocs && (
                  <span className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-2 py-0">
                    <Href
                      href={externalDocs.url()}
                      title={externalDocs.description() || ''}
                    >
                      Documentation
                    </Href>
                  </span>
                )}
                {schema.examples() && (
                  <ul className="text-xs">
                    Examples values:{' '}
                    {schema.examples().map((e, idx) => (
                      <li
                        key={idx}
                        className="border inline-block text-orange-600 rounded ml-1 py-0 px-2"
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
            className={`rounded p-4 py-2 bg-gray-100 ${
              reverse ? 'bg-gray-200' : ''
            } ${expand ? 'block' : 'hidden'}`}
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
      <p className="mt-2 text-xs text-gray-700">
        Additional properties are allowed.
      </p>
    );
  }
  if (additionalProperties === false) {
    return (
      <p className="mt-2 text-xs text-gray-700">
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
  if (items && !Array.isArray(items) && items.properties()) {
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
      <p className="mt-2 text-xs text-gray-700">
        Additional items are allowed.
      </p>
    );
  }
  if (additionalItems === false) {
    return (
      <p className="mt-2 text-xs text-gray-700">
        Additional items are <strong>NOT</strong> allowed.
      </p>
    );
  }
  return <Schema schemaName="Additional items:" schema={additionalItems} />;
};
