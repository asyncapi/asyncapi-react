import React, { Component } from 'react';
import merge from 'merge';
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

const schemaPropertiesAccesors: TableAccessor[] = [
  (el: SchemaElement) => (
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
  (el: SchemaElement) => el.schema.content.title,
  (el: SchemaElement) => (
    <>
      {el.schema.content.type}
      {el.schema.content.anyOf ? ` ${el.schema.content.anyOf}` : ''}
      {el.schema.content.oneOf ? ` ${el.schema.content.oneOf}` : ''}
      {el.schema.content.items && el.schema.content.items.type
        ? ` (${el.schema.content.items.type})`
        : ''}
    </>
  ),
  (el: SchemaElement) => el.schema.content.format,
  (el: SchemaElement) => el.schema.content.default,

  (el: SchemaElement) =>
    el.schema.content.description && (
      <Markdown>{el.schema.content.description}</Markdown>
    ),
];

export const handleNotProperty = (prop: Schema): Schema => {
  if (prop.not) {
    const arrayOfChangedObjects = Object.keys(prop).map(elem => {
      if (elem === 'not') {
        return { properties: { [elem]: prop[elem] } };
      }
      return prop[elem];
    });

    return merge.recursive(...arrayOfChangedObjects);
  }
  return prop;
};

interface Props {
  name: string;
  properties: Schema;
  treeSpace: number;
}

class SchemaPropertiesComponent extends Component<Props> {
  render() {
    const { name, properties, treeSpace } = this.props;

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
        <TableRow accessors={schemaPropertiesAccesors} element={element} />
        {this.renderOf('anyOf', space, alteredProperties.anyOf)}
        {this.renderOf('oneOf', space, alteredProperties.oneOf)}
        {this.renderProperties(alteredProperties, space)}
        {this.renderItems(alteredProperties, space)}
      </>
    );
  }

  private renderOf(
    type: string,
    treeSpace: number,
    schemas?: Schema[],
  ): React.ReactNode {
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
  }

  private renderProperties(schema: Schema, treeSpace: number): React.ReactNode {
    const properties = schema.properties;

    if (!properties) {
      return null;
    }

    return Object.keys(properties).map(key => (
      <SchemaPropertiesComponent
        key={key}
        name={key}
        properties={properties[key]}
        treeSpace={treeSpace}
      />
    ));
  }

  private renderItems(schema: Schema, treeSpace: number): React.ReactNode {
    const properties =
      schema.items && schema.items.properties ? schema.items.properties : null;

    if (!properties) {
      return null;
    }

    return this.renderProperties(schema.items as Schema, treeSpace);
  }
}

export default SchemaPropertiesComponent;
