import React, { useState, useContext } from 'react';
import { Schema as SchemaType } from '@asyncapi/parser';

import { Extensions } from './Extensions';
import { Chevron, Markdown } from './index';
import { SchemaHelpers } from '../helpers';

interface Props {
  schemaName?: string;
  schema?: SchemaType;
  required?: boolean;
  isCircular?: boolean;
  isPatternProperty?: boolean;
  isProperty?: boolean;
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
  expanded = false,
}) => {
  const { reverse } = useContext(SchemaContext);
  const [expand, setExpand] = useState(expanded);

  if (!schema) {
    return null;
  }

  const constraints = SchemaHelpers.humanizeConstraints(schema);
  const isExpandable = SchemaHelpers.isExpandable(schema);
  const externalDocs = schema.externalDocs();

  const renderType = schema.ext(SchemaHelpers.extRenderType) !== false;
  const rawValue = schema.ext(SchemaHelpers.extRawValue) === true;

  const uid = schema.uid();

  return (
    <SchemaContext.Provider value={{ reverse: !reverse }}>
      <div className={`ai-schema ${expand ? 'ai-schema--open' : ''}`}>
        <div className="ai-schema__property">
          <div className="ai-schema__property__left">
            <span
              className={`ai-schema__property__name ${
                isProperty ? 'italic' : ''
              }`}
            >
              {schemaName}
            </span>
            {isExpandable && !isCircular && (
              <span onClick={() => setExpand(prev => !prev)}>
                <Chevron />
              </span>
            )}
            {isPatternProperty && (
              <div className="ai-schema__property__pattern-property">
                (pattern property)
              </div>
            )}
            {required && (
              <div className="ai-schema__property__required">required</div>
            )}
            {schema.deprecated() && (
              <div className="ai-schema__property__deprecated">deprecated</div>
            )}
            {schema.writeOnly() && (
              <div className="ai-schema__property__write-only">write-only</div>
            )}
            {schema.readOnly() && (
              <div className="ai-schema__property__read-only">read-only</div>
            )}
          </div>
          {rawValue ? (
            <div className="ai-schema__property__right">
              <div className="ai-schema__property__raw-value">
                {schema.const()}
              </div>
            </div>
          ) : (
            <div className="ai-schema__property__right">
              <div>
                {renderType && (
                  <div className="ai-schema__property__type">
                    {isCircular
                      ? '[CIRCULAR]'
                      : SchemaHelpers.toSchemaType(schema)}
                  </div>
                )}
                <div className="ai-schema__property__constraints">
                  {schema.format() && (
                    <span className="ai-schema__property__constraint ai-schema__property__constraint--reverse">
                      format: {schema.format()}
                    </span>
                  )}

                  {/* constraints */}
                  {!!constraints.length &&
                    constraints.map(c => (
                      <span className="ai-schema__property__constraint" key={c}>
                        {c}
                      </span>
                    ))}

                  {/* related to string */}
                  {schema.pattern() !== undefined && (
                    <span className="ai-schema__property__constraint ai-schema__property__constraint--reverse">
                      must match: {schema.pattern()}
                    </span>
                  )}
                  {schema.contentMediaType() !== undefined && (
                    <span className="ai-schema__property__constraint ai-schema__property__constraint--reverse">
                      media type: {schema.contentMediaType()}
                    </span>
                  )}
                  {schema.contentEncoding() !== undefined && (
                    <span className="ai-schema__property__constraint ai-schema__property__constraint--reverse">
                      encoding: {schema.contentEncoding()}
                    </span>
                  )}
                  {uid && !uid.startsWith('<anonymous-') && (
                    <span className="ai-schema__property__uid">uid: {uid}</span>
                  )}
                </div>

                {schema.hasDescription() && (
                  <div className="ai-schema__property__description">
                    <Markdown>{schema.description()}</Markdown>
                  </div>
                )}

                {schema.default() !== undefined && (
                  <div className="ai-schema__property__default">
                    Default value: {schema.default()}
                  </div>
                )}
                {schema.const() !== undefined && (
                  <div className="ai-schema__property__const">
                    Const: {schema.const()}
                  </div>
                )}
                {schema.enum() && (
                  <ul className="ai-schema__property__enum">
                    Allowed values:{' '}
                    {schema.enum().map((e, idx) => (
                      <li key={idx} className="ai-schema__property__enum-item">
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {schema.examples() && (
                  <ul className="ai-schema__property__examples">
                    Examples values:{' '}
                    {schema.examples().map((e, idx) => (
                      <li
                        key={idx}
                        className="ai-schema__property__examples-item"
                      >
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {externalDocs && (
                  <a
                    href={externalDocs.url()}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    title={externalDocs.description() || ''}
                  >
                    Documentation
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {isCircular || !isExpandable
          ? null
          : expand && (
              <div
                className={`ai-schema__children ${
                  reverse ? 'ai-schema__children--reverse' : ''
                }`}
              >
                <SchemaProperties schema={schema} />
                <SchemaItems schema={schema} />

                {schema.oneOf() &&
                  schema
                    .oneOf()
                    .map((s, idx) => (
                      <Schema key={idx} schema={s} schemaName={`${idx}`} />
                    ))}
                {schema.anyOf() &&
                  schema
                    .anyOf()
                    .map((s, idx) => (
                      <Schema key={idx} schema={s} schemaName={`${idx}`} />
                    ))}
                {schema.allOf() &&
                  schema
                    .allOf()
                    .map((s, idx) => (
                      <Schema key={idx} schema={s} schemaName={`${idx}`} />
                    ))}
                {schema.not() && (
                  <Schema
                    schema={schema.not()}
                    schemaName="Cannot adhere to:"
                  />
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
                  <Schema
                    schema={schema.if()}
                    schemaName="If schema adheres to:"
                  />
                )}
                {schema.then() && (
                  <Schema
                    schema={schema.then()}
                    schemaName="Then it must adhere to:"
                  />
                )}
                {schema.else() && (
                  <Schema
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
      <p className="ai-schema__additional-info">
        Additional properties are allowed.
      </p>
    );
  }
  if (additionalProperties === false) {
    return (
      <p className="ai-schema__additional-info">
        Additional properties are <strong>NOT</strong> allowed.
      </p>
    );
  }
  return (
    <Schema
      schemaName="Additional properties must adhere to:"
      schema={additionalProperties}
    />
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
      <p className="ai-schema__additional-info">
        Additional items are allowed.
      </p>
    );
  }
  if (additionalItems === false) {
    return (
      <p className="ai-schema__additional-info">
        Additional items are <strong>NOT</strong> allowed.
      </p>
    );
  }
  return (
    <Schema
      schemaName="Additional items must adhere to:"
      schema={additionalItems}
    />
  );
};
