import React, { useState, useEffect, useContext } from 'react';
import { SchemaInterface } from '@asyncapi/parser';

import { Href, CollapseButton, Markdown, Extensions } from './index';
import { SchemaHelpers } from '../helpers';

interface Props {
  schemaName?: React.ReactNode;
  schema?: SchemaInterface;
  showSchemaType?: boolean;
  required?: boolean;
  isPatternProperty?: boolean;
  isProperty?: boolean;
  isCircular?: boolean;
  dependentRequired?: string[];
  expanded?: boolean;
  onlyTitle?: boolean;
  isArray?: boolean;
}

const PayloadSchemaContext = React.createContext({
  reverse: false,
  deepExpanded: false,
});

export const Payload: React.FunctionComponent<Props> = ({
  schemaName,
  schema,
  showSchemaType = true,
  required = false,
  isPatternProperty = false,
  isProperty = false,
  isCircular = false,
  dependentRequired,
  expanded: propExpanded = false,
  onlyTitle = false,
  isArray = false,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { reverse, deepExpanded } = useContext(PayloadSchemaContext);
  const [expanded, setExpanded] = useState(propExpanded || isArray);
  const [deepExpand, setDeepExpand] = useState(false);
  const [tabOpen, setTabOpen] = useState<'Rules' | 'Conditions'>('Rules');

  useEffect(() => {
    if (!isArray) {
      setDeepExpand(deepExpanded);
    }
  }, [isArray, deepExpanded, setDeepExpand]);

  useEffect(() => {
    if (!isArray) {
      setExpanded(deepExpand);
    }
  }, [isArray, deepExpand, setExpanded]);

  useEffect(() => {
    setTabOpen(showRules ? 'Rules' : 'Conditions');
  }, [schema]);

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

  isCircular = isCircular || schema.isCircular() || false;

  const uid = schema.$id();

  const styledSchemaName = isProperty ? 'italic' : '';
  const renderedSchemaName =
    typeof schemaName === 'string' ? (
      <span className={`break-anywhere text-sm w-full ${styledSchemaName}`}>
        {schemaName}
      </span>
    ) : (
      schemaName
    );

  // comes in Rules section
  const showRules =
    schema.format() ||
    schema.pattern() ||
    constraints.length > 0 ||
    schema.contentEncoding() ||
    schema.enum() ||
    schema.const();

  // comes in Conditions section
  const showConditions =
    schema.oneOf()?.length ||
    schema.anyOf()?.length ||
    schema.allOf()?.length ||
    schema.not() ||
    schema.propertyNames() ||
    schema.contains() ||
    schema.if() ||
    schema.then() ||
    schema.else() ||
    dependentSchemas;

  // we want the expanding dropdown to be present if schema has got other stuff, rules or conditions
  const isExpandable =
    SchemaHelpers.isExpandable(schema) || showRules || showConditions;

  return (
    <PayloadSchemaContext.Provider
      value={{ reverse: !reverse, deepExpanded: deepExpand }}
    >
      <div className="border rounded mb-4 overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col justify-center p-4 bg-gray-100">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 w-full">
              {isExpandable && !isCircular && !isArray ? (
                <div className="flex items-center gap-2">
                  <CollapseButton
                    onClick={() => setExpanded((prev) => !prev)}
                    expanded={expanded}
                  >
                    {renderedSchemaName}
                  </CollapseButton>
                </div>
              ) : (
                <span className={`text-sm ${isProperty ? 'italic' : ''}`}>
                  {schemaName}
                </span>
              )}
              <span className="capitalize text-sm text-teal-500 font-bold">
                {isCircular ? `${schemaType} [CIRCULAR]` : schemaType}
              </span>
              {schema.contentMediaType() !== undefined && (
                <strong className="bg-yellow-600 no-underline text-white rounded lowercase mr-2 p-1 text-xs">
                  media type: {schema.contentMediaType()}
                </strong>
              )}
              {uid && !uid.startsWith('<anonymous-') && (
                <span className="border text-orange-600 rounded mr-2 p-1 text-xs">
                  uid: {uid}
                </span>
              )}
              {/* TODO: find out if below is really needed ?? 
              cuz schema.const() is already shown in a strict manner in Rules */}
              {SchemaHelpers.prettifyValue(schema.const(), false) && (
                <span className="text-sm">
                  {SchemaHelpers.prettifyValue(schema.const(), false)}
                </span>
              )}

              {/* Field Status Indicators */}
              {(required ||
                schema.deprecated() ||
                schema.writeOnly() ||
                schema.readOnly()) && (
                <div className="flex items-center space-x-2">
                  {required && (
                    <span className="text-red-600 text-xs rounded">
                      required
                    </span>
                  )}
                  {schema.deprecated() && (
                    <span className="text-red-700 text-xs px-2 py-1 bg-red-200 border border-red-700 rounded">
                      deprecated
                    </span>
                  )}
                  {schema.writeOnly() && (
                    <span className="text-gray-600 text-xs rounded">
                      write-only
                    </span>
                  )}
                  {schema.readOnly() && (
                    <span className="text-gray-500 text-xs rounded">
                      read-only
                    </span>
                  )}
                </div>
              )}

              {isExpandable && !isCircular && !isArray && (
                <button
                  type="button"
                  onClick={() => setDeepExpand((prev) => !prev)}
                  className="ml-auto text-sm text-gray-500 hover:text-gray-700"
                >
                  {deepExpand ? 'Collapse all' : 'Expand all'}
                </button>
              )}
            </div>
          </div>

          {/* Description */}
          {schema.description() && (
            <div className="mt-2 text-sm text-gray-600">
              <Markdown>{schema.description()}</Markdown>
            </div>
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
            <strong className="w-min border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 no-underline text-xs uppercase rounded px-2 py-0 mt-2">
              <Href
                href={externalDocs.url()}
                title={externalDocs.description() ?? ''}
              >
                Documentation
              </Href>
            </strong>
          )}
        </div>

        {/* Expandable Content */}
        {!isCircular && isExpandable && expanded && (
          <div className="p-4 border-t bg-white">
            <div className="flex gap-1">
              {showRules && (
                <button
                  className={`text-sm font-semibold text-gray-900 ${tabOpen == 'Rules' ? 'bg-gray-400' : 'bg-gray-200'} p-2 rounded-t cursor-pointer`}
                  onClick={() => setTabOpen('Rules')}
                  role="tab"
                  aria-selected={tabOpen === 'Rules'}
                  aria-controls="rules-panel"
                >
                  Rules
                </button>
              )}
              {showConditions && (
                <button
                  className={`text-sm font-semibold text-gray-900 ${tabOpen == 'Conditions' ? 'bg-gray-400' : 'bg-gray-200'} p-2 rounded-t cursor-pointer`}
                  onClick={() => setTabOpen('Conditions')}
                  role="tab"
                  aria-selected={tabOpen === 'Conditions'}
                  aria-controls="conditions-panel"
                >
                  Conditions
                </button>
              )}
            </div>
            {/* Rules Section: it generally doesnt have any recursion in it */}
            {showRules && tabOpen == 'Rules' && (
              <div className="mb-4">
                <div className="space-y-2 bg-blue-100 p-4 rounded-b border">
                  {schema.format() && (
                    <span className="no-underline rounded lowercase mr-2 p-1 text-sm">
                      format:{' '}
                      <span className="rounded font-bold p-1 text-sm">
                        {schema.format()}
                      </span>
                    </span>
                  )}
                  {schema.pattern() && (
                    <span className="no-underline rounded lowercase mr-2 p-1 text-sm">
                      must match:{' '}
                      <span className="rounded font-bold p-1 text-sm">
                        {schema.pattern()}
                      </span>
                    </span>
                  )}
                  {schema.contentEncoding() !== undefined && (
                    <span className="no-underline rounded lowercase mr-2 p-1 text-sm">
                      encoding:{' '}
                      <span className="rounded font-bold p-1 text-sm">
                        {schema.contentEncoding()}
                      </span>
                    </span>
                  )}
                  {constraints.map((constraint) => (
                    <strong
                      key={constraint}
                      className="bg-purple-50 text-purple-700 px-3 py-1 rounded-md text-sm"
                    >
                      {constraint}
                    </strong>
                  ))}
                  {schema.const() !== undefined && (
                    <div className="text-sm">
                      <span className="">Constant value: </span>
                      <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded">
                        {SchemaHelpers.prettifyValue(schema.const())}
                      </span>
                    </div>
                  )}
                  {schema.enum() && (
                    <div className="text-sm">
                      <span className="">Allowed values: </span>
                      {schema.enum()?.map((e, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"
                        >
                          {SchemaHelpers.prettifyValue(e)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Conditions Section: has hella recursion in it*/}
            {showConditions && tabOpen == 'Conditions' && (
              <div className="mb-4">
                <div className="space-y-2">
                  {schema.oneOf()?.length && (
                    <div className="border rounded bg-gray-100 p-4">
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
                    <div className="border rounded bg-gray-100 p-4">
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
                    <div className="border rounded bg-gray-100 p-4">
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
                    <Payload
                      schema={schema.not()}
                      schemaName="Can NOT adhere to:"
                    />
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
                    <Payload
                      schema={schema.if()}
                      schemaName="If schema adheres to:"
                    />
                  )}
                  {schema.then() && (
                    <Payload
                      schema={schema.then()}
                      schemaName="Then must adhere to:"
                    />
                  )}
                  {schema.else() && (
                    <Payload schema={schema.else()} schemaName="Otherwise:" />
                  )}
                  {dependentSchemas && (
                    <Payload
                      schema={dependentSchemas}
                      schemaName="Dependent schemas:"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Properties Section */}
            <SchemaProperties schema={schema} />

            {/* Array Items Section */}
            <SchemaItems schema={schema} />

            {/* Additional Properties/Items Section */}
            <div className="mt-4">
              <AdditionalProperties schema={schema} />
              <AdditionalItems schema={schema} />
            </div>

            {/* Extensions Section */}
            <Extensions item={schema} />
          </div>
        )}
      </div>
    </PayloadSchemaContext.Provider>
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

  const required = schema.required() ?? [];
  const patternProperties = schema.patternProperties();

  return (
    <>
      {Object.entries(properties).map(([propertyName, property]) => (
        <Payload
          schema={property}
          schemaName={propertyName}
          required={required.includes(propertyName)}
          isProperty
          isCircular={property.isCircular()}
          dependentRequired={SchemaHelpers.getDependentRequired(
            propertyName,
            schema,
          )}
          key={propertyName}
        />
      ))}
      {Object.entries(patternProperties ?? {}).map(
        ([propertyName, property]) => (
          <Payload
            schema={property}
            schemaName={propertyName}
            isPatternProperty
            isProperty
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

const AdditionalProperties: React.FunctionComponent<
  AdditionalPropertiesProps
> = ({ schema }) => {
  if (
    schema.extensions().get(SchemaHelpers.extRenderAdditionalInfo)?.value() ===
    false
  ) {
    return null;
  }

  const type = schema.type();
  if (!type?.includes('object')) {
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
    <Payload
      schemaName="Additional properties:"
      schema={additionalProperties}
    />
  );
};

interface SchemaItemsProps {
  schema: SchemaInterface;
}

const SchemaItems: React.FunctionComponent<SchemaItemsProps> = ({ schema }) => {
  const type = schema.type();
  if (!type?.includes('array')) {
    return null;
  }
  const items = schema.items();

  // object in items
  if (
    items &&
    !Array.isArray(items) &&
    Object.keys(items.properties() ?? {}).length
  ) {
    return <Payload schema={items} isArray />;
  } else if (Array.isArray(items)) {
    return (
      <>
        <span>SchemaItems</span>
        {items.map((item, idx) => (
          <Payload
            schema={item}
            isArray
            schemaName={`${idx + 1} item:`}
            key={idx}
          />
        ))}
      </>
    );
  }
  return <Payload schema={items} isArray schemaName="Items:" />;
};

interface AdditionalItemsProps {
  schema: SchemaInterface;
}

const AdditionalItems: React.FunctionComponent<AdditionalItemsProps> = ({
  schema,
}) => {
  if (
    schema.extensions().get(SchemaHelpers.extRenderAdditionalInfo)?.value() ===
    false
  ) {
    return null;
  }

  const type = schema.type();
  if (!type?.includes('array')) {
    return null;
  }
  if (!Array.isArray(schema.items())) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <Payload schemaName="Additional items:" schema={additionalItems} />;
};
