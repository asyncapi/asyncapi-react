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
      {el.schema.content.pattern && (
        <div>
          Must Match{' '}
          <span className={bemClasses.element(`pattern`)}>
            {el.schema.content.pattern}
          </span>
        </div>
      )}
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
        <div className="flex-1">{renderPropertyName(element)}</div>
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
          <div className="py-2">{renderPropertyDescription(element)}</div>
        </div>
      </div>
      {renderOf(space, alteredProperties.anyOf)}
      {renderOf(space, alteredProperties.oneOf)}
      {renderProperties(alteredProperties, space)}
      {renderItems(alteredProperties, space)}
    </div>
  );
};
