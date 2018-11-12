import React, { Component } from 'react';

import { Header, H4, Markdown, TableAccesor, TableRow, RequiredBadge, TreeSpace, TreeLeaf } from '../../components';

import { Map, TypeWithKey, Schema } from '../../common';

type SchemaWithKey = TypeWithKey<string, Schema>;
type SchemaElement = {
  schema: SchemaWithKey,
  required: boolean,
  treeSpace: number,
}

const schemaPropertiesAccesors: TableAccesor[] = [
  (el: SchemaElement) => (
    <>
      {(() => {
        let treeSpaces = []
        if (el.treeSpace) {
          for (let i = 0; i < el.treeSpace; i++) {
            treeSpaces.push(<TreeSpace key={i} />)
          }
          treeSpaces.push(<TreeLeaf key={el.treeSpace}/>)
        }
        return treeSpaces
      })()}
      {el.schema.key}
      {el.required ? <RequiredBadge>(Reguired)</RequiredBadge> : null}
    </>
  ),
  (el: SchemaElement) => el.schema.content.title,
  (el: SchemaElement) => (
    <>
      {el.schema.content.type}
      {el.schema.content.anyOf ? ` ${el.schema.content.anyOf}` : ""}
      {el.schema.content.oneOf ? ` ${el.schema.content.oneOf}` : ""}
      {el.schema.content.items && el.schema.content.items.type ? ` (${el.schema.content.items.type})` : ""}
    </>
  ),
  (el: SchemaElement) => el.schema.content.format,
  (el: SchemaElement) => el.schema.content.default,
  (el: SchemaElement) => el.schema.content.description ? <Markdown>{el.schema.content.description}</Markdown> : null, 
]

export interface SchemaPropertiesProps {
  name: string,
  required: boolean,
  properties: Schema,
  treeSpace: number,
}

class SchemaPropertiesComponent extends Component<SchemaPropertiesProps> {
  private renderOf(type: string, treeSpace: number, schemas?: Schema[]): React.ReactNode {
    if (schemas) {
      return schemas.map((schema, index) => {
        const required = schema.required ? schema.required : [] as string[]
        const id = index.toString()

        return <SchemaPropertiesComponent key={index} name={id} properties={schema} required={required.some(r => r === id)} treeSpace={treeSpace} />
      })
    }

    return null;
  }

  private renderProperties(schema: Schema, required: string[], treeSpace: number): React.ReactNode {
    const properties = schema.properties;

    if (properties) {
      return Object.keys(properties).map(key => {
        return <SchemaPropertiesComponent key={key} name={key} properties={properties[key]} required={required.some(r => r === key)} treeSpace={treeSpace} />
      })
    }
    return null;
  }

  private renderItems(schema: Schema, treeSpace: number): React.ReactNode {
    const properties = schema.items && schema.items.properties ? schema.items.properties : null;
  
    if (properties) {
      const required = schema.items!.required ? schema.items!.required as string[] : [] as string[]
      
      return this.renderProperties(schema.items!, required, treeSpace)
    }
    return null
  }

  public render() {
    const { name, properties, required, treeSpace } = this.props;

    const requiredItems = properties.required ? properties.required : [] as string[]
    const space = treeSpace + 1;
    const element: SchemaElement = {
      schema: {
        key: name,
        content: properties,
      },
      required: required,
      treeSpace: treeSpace,
    }

    return (
      <>
        <TableRow accesors={schemaPropertiesAccesors} element={element} />
        {this.renderOf("anyOf", space, properties.anyOf)}
        {this.renderOf("oneOf", space, properties.oneOf)}
        {this.renderProperties(properties, requiredItems, space)}
        {this.renderItems(properties, space)}
      </>

    );
  }
}

export default SchemaPropertiesComponent;
