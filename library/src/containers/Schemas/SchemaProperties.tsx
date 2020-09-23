import React from 'react';
import merge from 'merge';

import { bemClasses } from '../../helpers';
import { TypeWithKey, Schema } from '../../types';
import { Markdown, TreeSpace, TreeLeaf } from '../../components';

type SchemaWithKey = TypeWithKey<string, Schema>;
interface SchemaElement {
  schema: SchemaWithKey;
  treeSpace: number;
}

const getEnumHTMLElements = (schema: SchemaWithKey): HTMLElement[] => {
  let enumElements: any[] = [];
  if (schema.content.enum && schema.content.enum.length) {
    enumElements = schema.content.enum.map((value: any, i: number) => (
      <span className={bemClasses.element(`enum`)} key={i}>
        "{value}"
      </span>
    ));
  }

  return enumElements;
};

const handleNotProperty = (prop: Schema): Schema => {
  if (prop.not) {
    const arrayOfChangedObjects = Object.entries(prop).map(([key, val]) => {
      if (key === 'not') {
        return { properties: { [key]: val } };
      }
      return prop[key];
    });

    return merge.recursive(...arrayOfChangedObjects);
  }
  return prop;
};

const renderItems = (schema: Schema, treeSpace: number): React.ReactNode => {
  const properties =
    schema.items && schema.items.properties ? schema.items.properties : null;

  if (!properties) {
    return null;
  }

  return renderProperties(schema.items as Schema, treeSpace);
};

const renderProperties = (
  schema: Schema,
  treeSpace: number,
): React.ReactNode => {
  const properties = schema.properties;

  if (!properties) {
    return null;
  }

  return Object.entries(properties).map(([key, prop]) => (
    <SchemaPropertiesComponent
      key={key}
      name={key}
      properties={prop}
      treeSpace={treeSpace}
    />
  ));
};

const renderAdditionalProperties = (
  schema: Schema,
  treeSpace: number,
): React.ReactNode => {
  const additionalProperties = schema.additionalProperties;

  if (!additionalProperties || typeof additionalProperties === 'boolean') {
    return null;
  }

  return (
    <div>
      <SchemaPropertiesComponent
        key="property-name"
        name="(property name)"
        hasDynamicName
        properties={additionalProperties as Schema}
        treeSpace={treeSpace}
      />
    </div>
  );
};

const renderOf = (treeSpace: number, schemas?: Schema[]): React.ReactNode => {
  if (!schemas) {
    return null;
  }

  return schemas.map((schema, index) => {
    const id = index.toString();

    return (
      <SchemaPropertiesComponent
        key={index}
        name={id}
        properties={schema}
        treeSpace={treeSpace}
      />
    );
  });
};

interface Props {
  name: string;
  hasDynamicName?: boolean;
  properties: Schema;
  treeSpace: number;
  description?: React.ReactNode;
}

const renderPropertyName = (el: SchemaElement): React.ReactNode => (
  <>
    {(() => {
      const treeSpaces = [];
      if (el.treeSpace) {
        for (let i = 0; i < el.treeSpace; i++) {
          treeSpaces.push(<TreeSpace key={i} />);
        }
        treeSpaces.push(<TreeLeaf key={el.treeSpace} />);
      }
      return treeSpaces;
    })()}
    {el.schema.key}
  </>
);

const renderPropertyDescription = (el: SchemaElement): React.ReactNode => {
  const enumElements = getEnumHTMLElements(el.schema);
  return (
    <div>
      {el.schema.content.description && (
        <Markdown>{el.schema.content.description}</Markdown>
      )}
      {enumElements.length > 0 && <div>Enum: {enumElements}</div>}
      {el.schema.content.default && (
        <div>
          Default: <span>{el.schema.content.default}</span>
        </div>
      )}
    </div>
  );
};

export const SchemaPropertiesComponent: React.FunctionComponent<Props> = ({
  name,
  hasDynamicName = false,
  properties,
  treeSpace,
}) => {
  const alteredProperties = handleNotProperty(properties);
  const space = treeSpace + 1;
  const element: SchemaElement = {
    schema: {
      key: name,
      content: alteredProperties,
    },
    treeSpace,
  };

  return (
    <div>
      <div className="flex py-2">
        <div className={`flex-1 ${hasDynamicName && 'font-italic'}`}>
          {renderPropertyName(element)}
        </div>
        <div className="flex-1">
          <span className="capitalize text-sm text-teal font-bold">
            {element.schema.content.type}
            {element.schema.content.anyOf
              ? ` ${element.schema.content.anyOf}`
              : ''}
            {element.schema.content.oneOf
              ? ` ${element.schema.content.oneOf}`
              : ''}
            {element.schema.content.items && element.schema.content.items.type
              ? ` (${element.schema.content.items.type})`
              : ''}
          </span>
          {element.schema.content.format && (
            <span
              className="bg-yellow-dark font-bold no-underline text-black rounded lowercase ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
            >
              {element.schema.content.format}
            </span>
          )}
          {element.schema.content.pattern && (
            <span
              className="bg-purple-dark font-bold no-underline text-white rounded normal-case ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
            >
              must match {element.schema.content.pattern}
            </span>
          )}
          {element.schema.content.uniqueItems && (
            <span
              className="bg-red-700 font-bold no-underline text-white rounded lowercase ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
            >
              Unique
            </span>
          )}
          {element.schema.content.minItems && (
            <span
              className="bg-purple-dark font-bold no-underline text-white rounded lowercase ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
              title={`At least ${element.schema.content.minItems} items`}
            >
              &gt;= {element.schema.content.minItems} items
            </span>
          )}
          {element.schema.content.maxItems && (
            <span
              className="bg-purple-dark font-bold no-underline text-white rounded lowercase ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
              title={`At most ${element.schema.content.maxItems} items`}
            >
              &lt;= {element.schema.content.maxItems} items
            </span>
          )}
          {element.schema.content.minLength && (
            <span
              className="bg-purple-dark font-bold no-underline text-white rounded lowercase ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
              title={`At least ${element.schema.content.minLength} characters long`}
            >
              length &gt;= {element.schema.content.minLength}
            </span>
          )}
          {element.schema.content.maxLength && (
            <span
              className="bg-purple-dark font-bold no-underline text-white rounded lowercase ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
              title={`At most ${element.schema.content.maxLength} characters long`}
            >
              length &lt;= {element.schema.content.maxLength}
            </span>
          )}
          {element.schema.content.minimum && (
            <span
              className="bg-purple-dark font-bold no-underline text-white rounded lowercase ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
              title={`At least ${element.schema.content.minimum}`}
            >
              &gt;= {element.schema.content.minimum}
            </span>
          )}
          {element.schema.content.maximum && (
            <span
              className="bg-purple-dark font-bold no-underline text-white rounded lowercase ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
              title={`At most ${element.schema.content.maximum}`}
            >
              &lt;= {element.schema.content.maximum}
            </span>
          )}
          {element.schema.content.exclusiveMinimum && (
            <span
              className="bg-purple-dark font-bold no-underline text-white rounded lowercase ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
              title={`Greater than ${element.schema.content.exclusiveMinimum}`}
            >
              &gt; {element.schema.content.exclusiveMinimum}
            </span>
          )}
          {element.schema.content.exclusiveMaximum && (
            <span
              className="bg-purple-dark font-bold no-underline text-white rounded lowercase ml-2"
              style={{ height: '20px', fontSize: '11px', padding: '3px' }}
              title={`Less than ${element.schema.content.exclusiveMaximum}`}
            >
              &lt; {element.schema.content.exclusiveMaximum}
            </span>
          )}
          <div className="py-2">{renderPropertyDescription(element)}</div>
          {element.schema.content.type === 'object' && (
            <div className="font-italic text-gray-600 text-sm">
              {(!element.schema.content.additionalProperties ||
                typeof element.schema.content.additionalProperties ===
                  'boolean') && (
                <p className="my-0">
                  Additional properties are{' '}
                  {element.schema.content.additionalProperties === false &&
                    'NOT'}{' '}
                  allowed.
                </p>
              )}
              {element.schema.content.additionalProperties &&
                typeof element.schema.content.additionalProperties ===
                  'object' && (
                  <p className="my-0">
                    Additional properties must adhere to the following schema.
                  </p>
                )}
            </div>
          )}
          {element.schema.content.items && (
            <div className="font-italic text-gray-600 text-sm">
              {element.schema.content.items &&
                typeof element.schema.content.items === 'object' && (
                  <p className="my-0">
                    Array items must adhere to the following schema.
                  </p>
                )}
            </div>
          )}
        </div>
      </div>
      {renderOf(space, alteredProperties.anyOf)}
      {renderOf(space, alteredProperties.oneOf)}
      {renderProperties(alteredProperties, space)}
      {renderAdditionalProperties(alteredProperties, space)}
      {renderItems(alteredProperties, space)}
    </div>
  );
};
