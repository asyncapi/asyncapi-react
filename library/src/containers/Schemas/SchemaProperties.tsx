import React from 'react';
import merge from 'merge';

import { bemClasses } from '../../helpers';
import { TypeWithKey, Schema } from '../../types';
import {
  Markdown,
  TableAccessor,
  TableRow,
  TreeSpace,
  TreeLeaf,
} from '../../components';

type SchemaWithKey = TypeWithKey<string, Schema>;
interface SchemaElement {
  schema: SchemaWithKey;
  treeSpace: number;
}

const schemaPropertiesAccessors: Array<TableAccessor<SchemaElement>> = [
  el => (
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
  ),
  el => <span>{el.schema.content.title}</span>,
  el => (
    <span>
      {el.schema.content.type}
      {el.schema.content.anyOf ? ` ${el.schema.content.anyOf}` : ''}
      {el.schema.content.oneOf ? ` ${el.schema.content.oneOf}` : ''}
      {el.schema.content.items && el.schema.content.items.type
        ? ` (${el.schema.content.items.type})`
        : ''}
    </span>
  ),
  el => <span>{el.schema.content.format}</span>,
  el => <span>{el.schema.content.default}</span>,
  el => {
    const enumElements = getEnumHTMLElements(el.schema);
    return (
      el.schema.content.description && (
        <div>
          <Markdown>{el.schema.content.description}</Markdown>
          {enumElements.length > 0 && <div>Enum: {enumElements}</div>}
        </div>
      )
    );
  },
];

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
    <>
      <TableRow accessors={schemaPropertiesAccessors} element={element} />
      {renderOf(space, alteredProperties.anyOf)}
      {renderOf(space, alteredProperties.oneOf)}
      {renderProperties(alteredProperties, space)}
      {renderItems(alteredProperties, space)}
    </>
  );
};
