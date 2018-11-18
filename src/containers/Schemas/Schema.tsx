import React, { Component } from 'react';

import { Header, H4, TableColumnName, TableWrapper, TableHeader, TableBodyWrapper } from '../../components';

import { Map, Schema } from '../../common';

import { Schema as SchemaWrapper, SchemaHeader } from './styled';

import SchemaProperties from './SchemaProperties';
import SchemaExample from './SchemaExample';

const schemaColumnsName: TableColumnName[] = [
  "Name",
  "Title",
  "Type",
  "Format",
  "Default",
  "Description",
]

interface Props {
  name: string,
  schema?: Schema;
  exampleTitle?: string,
  hideTitle?: boolean;
}

class SchemaComponent extends Component<Props> {
  private renderSchemaProps(schemaName: string, schema: Schema): React.ReactNode {
    const required = schema.required ? schema.required : [];

    if (schema.properties) {
      const properties = schema.properties;

      return Object.keys(properties).map(key => {
        return <SchemaProperties key={key} name={key} properties={properties[key]} required={required.some(r => r === key)} treeSpace={0} />
      })
    }
    return (
      <SchemaProperties name={schemaName} properties={schema} required={required.some(r => r === schemaName)} treeSpace={0} />
    )
  }

  render() {
    const { name, schema, exampleTitle, hideTitle } = this.props;

    if (!schema) return null;

    return (
      <SchemaWrapper>
        {!hideTitle &&
          <SchemaHeader>
            <H4>{name}</H4>
          </SchemaHeader> 
        }
        <TableWrapper>
          <TableHeader columns={schemaColumnsName} />
          <TableBodyWrapper>
            {this.renderSchemaProps(name, schema!)}
          </TableBodyWrapper>
        </TableWrapper>
        
        <SchemaExample title={exampleTitle} schema={schema} />
      </SchemaWrapper>
    );
  }
}

export default SchemaComponent;
