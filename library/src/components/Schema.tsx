import React, { useState, useEffect, useContext } from 'react';
import { SchemaInterface } from '@asyncapi/parser';

import { Href, CollapseButton, Markdown, Extensions } from './index';
import { SchemaHelpers } from '../helpers';

interface Props {
  schemaName?: React.ReactNode;
  schema?: SchemaInterface;
  required?: boolean;
  isPatternProperty?: boolean;
  isProperty?: boolean;
  isCircular?: boolean;
  dependentRequired?: string[];
  expanded?: boolean;
  onlyTitle?: boolean;
}

const SchemaContext = React.createContext({
  reverse: false,
  deepExpanded: false,
});

export const Schema: React.FunctionComponent<Props> = ({
  schemaName,
  schema,
  required = false,
  isPatternProperty = false,
  isProperty = false,
  isCircular = false,
  dependentRequired,
  expanded: propExpanded = false,
  onlyTitle = false,
}) => {
  const { reverse, deepExpanded } = useContext(SchemaContext);
  const [expanded, setExpanded] = useState(propExpanded);
  const [deepExpand, setDeepExpand] = useState(false);

  useEffect(() => {
    setDeepExpand(deepExpanded);
  }, [deepExpanded, setDeepExpand]);

  useEffect(() => {
    setExpanded(deepExpand);
  }, [deepExpand, setExpanded]);

  if (
    !schema ||
    (typeof schemaName === 'string' &&
      (schemaName?.startsWith('x-parser-') ||
        schemaName?.startsWith('x-schema-private-')))
  ) {
    return null;
  }

  const dependentSchemas = SchemaHelpers.getDependentSchemas(schema);

  const constraints = SchemaHelpers.humanizeConstraints(schema);
  const externalDocs = schema.externalDocs();

  const rawValueExt = schema.extensions().get(SchemaHelpers.extRawValue);
  const rawValue = rawValueExt?.value() === true;

  const parameterLocationExt = schema
    .extensions()
    .get(SchemaHelpers.extParameterLocation);
  const parameterLocation = parameterLocationExt?.value() === true;

  const schemaType = SchemaHelpers.toSchemaType(schema);
  const isExpandable = SchemaHelpers.isExpandable(schema) || dependentSchemas;

  isCircular = isCircular || schema.isCircular() || false;
  const uid = schema.$id();
  const styledSchemaName = isProperty ? 'italic' : '';
  const renderedSchemaName =
    typeof schemaName === 'string' ? (
      <span className={`break-anywhere text-sm ${styledSchemaName}`}>
        {schemaName}
      </span>
    ) : (
      schemaName
    );

  return (
    <SchemaContext.Provider
      value={{ reverse: !reverse, deepExpanded: deepExpand }}
    >
      <div>
        <div className="flex py-2">
          <div className={`${onlyTitle ? '' : 'min-w-1/4'} mr-2`}>
            {isExpandable && !isCircular ? (
              <>
                <CollapseButton
                  onClick={() => setExpanded(prev => !prev)}
                  expanded={expanded}
                >
                  {renderedSchemaName}
                </CollapseButton>
                <button
                  type="button"
                  onClick={() => setDeepExpand(prev => !prev)}
                  className="ml-1 text-sm text-gray-500"
                >
                  {deepExpand ? 'Collapse all' : 'Expand all'}
                </button>
              </>
            ) : (
              <span
                className={`break-anywhere text-sm ${
                  isProperty ? 'italic' : ''
                }`}
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
              <div className="text-sm">
                {SchemaHelpers.prettifyValue(schema.const(), false)}
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div className="capitalize text-sm text-teal-500 font-bold inline-block mr-2">
                  {isCircular ? `${schemaType} [CIRCULAR]` : schemaType}
                </div>
                <div className="inline-block">
                  {schema.format() && (
                    <span className="bg-yellow-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs">
                      format: {schema.format()}
                    </span>
                  )}

                  {/* related to string */}
                  {schema.pattern() !== undefined && (
                    <span className="bg-yellow-600 font-bold no-underline text-white rounded mr-2 p-1 text-xs">
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

                {schema.description() !== undefined && (
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
                    {schema.enum()?.map((e, idx) => (
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
                    {schema.examples()?.map((e, idx) => (
                      <li
                        key={idx}
                        className="border inline-block text-orange-600 rounded ml-1 py-0 px-2 break-all"
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
            className={`rounded p-4 py-2 border bg-gray-100 ${
              reverse ? 'bg-gray-200' : ''
            } ${expanded ? 'block' : 'hidden'}`}
          >
            <SchemaProperties schema={schema} />
            <SchemaItems schema={schema} />

            {schema.oneOf() &&
              schema
                .oneOf()
                ?.map((s, idx) => (
                  <Schema
                    key={idx}
                    schema={s}
                    schemaName={SchemaHelpers.applicatorSchemaName(
                      idx,
                      'Adheres to',
                      'Or to',
                      s.title(),
                    )}
                  />
                ))}
            {schema.anyOf() &&
              schema
                .anyOf()
                ?.map((s, idx) => (
                  <Schema
                    key={idx}
                    schema={s}
                    schemaName={SchemaHelpers.applicatorSchemaName(
                      idx,
                      'Can adhere to',
                      'Or to',
                      s.title(),
                    )}
                  />
                ))}
            {schema.allOf() &&
              schema
                .allOf()
                ?.map((s, idx) => (
                  <Schema
                    key={idx}
                    schema={s}
                    schemaName={SchemaHelpers.applicatorSchemaName(
                      idx,
                      'Consists of',
                      'And of',
                      s.title(),
                    )}
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
  schema: SchemaInterface;
}

const SchemaProperties: React.FunctionComponent<SchemaPropertiesProps> = ({
  schema,
}) => {
  const properties = schema.properties();
  if (properties === undefined || !Object.keys(properties)) {
    return null;
  }

  const required = schema.required() || [];
  const patternProperties = schema.patternProperties();

  return (
    <>
      {Object.entries(properties).map(([propertyName, property]) => (
        <Schema
          schema={property}
          schemaName={propertyName}
          required={required.includes(propertyName)}
          isProperty={true}
          isCircular={property.isCircular()}
          dependentRequired={SchemaHelpers.getDependentRequired(
            propertyName,
            schema,
          )}
          key={propertyName}
        />
      ))}
      {Object.entries(patternProperties || {}).map(
        ([propertyName, property]) => (
          <Schema
            schema={property}
            schemaName={propertyName}
            isPatternProperty={true}
            isProperty={true}
            isCircular={property.isCircular()}
            key={propertyName}
          />
        ),
      )}
    </>
  );
};

interface AdditionalPropertiesProps {
  schema: SchemaInterface;
}

const AdditionalProperties: React.FunctionComponent<AdditionalPropertiesProps> = ({
  schema,
}) => {
  if (
    schema
      .extensions()
      .get(SchemaHelpers.extRenderAdditionalInfo)
      ?.value() === false
  ) {
    return null;
  }

  const type = schema.type();
  if (type === undefined || !type.includes('object')) {
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
  schema: SchemaInterface;
}

const SchemaItems: React.FunctionComponent<SchemaItemsProps> = ({ schema }) => {
  const type = schema.type();
  if (type === undefined || !type.includes('array')) {
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
  schema: SchemaInterface;
}

const AdditionalItems: React.FunctionComponent<AdditionalItemsProps> = ({
  schema,
}) => {
  if (
    schema
      .extensions()
      .get(SchemaHelpers.extRenderAdditionalInfo)
      ?.value() === false
  ) {
    return null;
  }

  const type = schema.type();
  if (type === undefined || !type.includes('array')) {
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
