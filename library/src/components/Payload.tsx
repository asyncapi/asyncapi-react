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
  //   if (schemaName == "Payload") {
  //     console.log("schema = ",schema)
  //   }
  const { reverse, deepExpanded } = useContext(PayloadSchemaContext);
  const [expanded, setExpanded] = useState(propExpanded || isArray);
  const [deepExpand, setDeepExpand] = useState(false);

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
      <span className={`break-anywhere text-sm w-full ${styledSchemaName}`}>
        {schemaName}
      </span>
    ) : (
      schemaName
    );

    if (schemaName == "dependencies") {
      console.log("schema = ",schema)
    }

  return (
    <PayloadSchemaContext.Provider
      value={{ reverse: !reverse, deepExpanded: deepExpand }}
    >
      <div className="border rounded-lg mb-4 overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col justify-center p-4 bg-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {isExpandable && !isCircular && !isArray ? (
                <div className="flex items-center gap-2">
                  <CollapseButton
                    onClick={() => setExpanded((prev) => !prev)}
                    expanded={expanded}
                  >
                    {renderedSchemaName}
                  </CollapseButton>
                  <button
                    type="button"
                    onClick={() => setDeepExpand((prev) => !prev)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {deepExpand ? 'Collapse all' : 'Expand all'}
                  </button>
                </div>
              ) : (
                <span className={`text-sm ${isProperty ? 'italic' : ''}`}>
                  {schemaName}
                </span>
              )}
              <span className="capitalize text-sm text-teal-500 font-bold">
                {isCircular ? `${schemaType} [CIRCULAR]` : schemaType}
              </span>
            </div>
          </div>

          {/* Field Status Indicators */}
          {required ||
            schema.deprecated() ||
            schema.writeOnly() ||
            (schema.readOnly() && (
              <div className="mt-2 space-x-2">
                {required && (
                  <span className="text-red-600 text-xs px-2 py-1 bg-red-50 rounded">
                    required
                  </span>
                )}
                {schema.deprecated() && (
                  <span className="text-red-600 text-xs px-2 py-1 bg-red-50 rounded">
                    deprecated
                  </span>
                )}
                {schema.writeOnly() && (
                  <span className="text-gray-500 text-xs px-2 py-1 bg-gray-50 rounded">
                    write-only
                  </span>
                )}
                {schema.readOnly() && (
                  <span className="text-gray-500 text-xs px-2 py-1 bg-gray-50 rounded">
                    read-only
                  </span>
                )}
              </div>
            ))}
          {/* Description */}
          {schema.description() && (
            <div className="mt-2 text-sm text-gray-600">
              <Markdown>{schema.description()}</Markdown>
            </div>
          )}
        </div>

        {/* Expandable Content */}
        {!isCircular && isExpandable && expanded && (
          <div className="p-4 border-t">
            {/* Rules Section */}
            {(constraints.length > 0 || schema.enum() || schema.const()) && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Rules & Constraints
                </h4>
                <div className="space-y-2 bg-white p-4 rounded-lg border">
                  {constraints.map((constraint) => (
                    <div
                      key={constraint}
                      className="bg-purple-50 text-purple-700 px-3 py-1 rounded-md text-sm"
                    >
                      {constraint}
                    </div>
                  ))}
                  {schema.enum() && (
                    <div className="text-sm">
                      <span className="text-gray-600">Allowed values: </span>
                      {schema.enum()?.map((e, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-50 text-orange-700 px-2 py-1 rounded mr-1"
                        >
                          {SchemaHelpers.prettifyValue(e)}
                        </span>
                      ))}
                    </div>
                  )}
                  {schema.const() !== undefined && (
                    <div className="text-sm">
                      <span className="text-gray-600">Constant value: </span>
                      <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded">
                        {SchemaHelpers.prettifyValue(schema.const())}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Conditions Section */}
            {(schema.if() ||
              schema.then() ||
              schema.else() ||
              schema.oneOf()?.length ||
              dependentSchemas) && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Conditions
                </h4>
                <div className="space-y-2">
                  {schema.oneOf()?.length && (
                    <div className="border rounded-lg bg-white p-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">
                        Can be <strong>One Of</strong> these:
                      </h5>
                      {schema
                        .oneOf()
                        ?.map((s, idx) => (
                          <Payload
                            key={idx}
                            schema={s}
                            schemaName={SchemaHelpers.applicatorSchemaName(
                              idx,
                              'Adheres to',
                              'Or to',
                              s.title() ?? s.id(),
                            )}
                            onlyTitle={true}
                          />
                        ))}
                    </div>
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
