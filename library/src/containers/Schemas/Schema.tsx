import React, { Component } from 'react';

import { Schema } from '../../types';

import SchemaProperties from './SchemaProperties';
import SchemaExample from './SchemaExample';

import {
  H4,
  TableColumnName,
  TableWrapper,
  TableHeader,
  TableBodyWrapper,
} from '../../components';
import { Schema as SchemaWrapper, SchemaHeader } from './styled';

export const searchForNestedObject = (
  object: any,
  key: string,
  predicate: (key: string, data: string) => boolean,
): Record<string, any> | null => {
  if (object.hasOwnProperty(key) && predicate(key, object[key]) === true)
    return object;

  for (let i = 0; i < Object.keys(object).length; i++) {
    if (typeof object[Object.keys(object)[i]] === 'object') {
      let o = searchForNestedObject(
        object[Object.keys(object)[i]],
        key,
        predicate,
      );
      if (o != null) return o;
    }
  }
  return null;
};

const schemaColumnsName: TableColumnName[] = [
  'Name',
  'Title',
  'Type',
  'Format',
  'Default',
  'Description',
];

interface Props {
  name: string;
  schema?: Schema;
  exampleTitle?: string;
  hideTitle?: boolean;
}

export class SchemaComponent extends Component<Props> {
  render() {
    const { name, schema, exampleTitle, hideTitle } = this.props;

    if (!schema) {
      return null;
    }
    const hasNotField = searchForNestedObject(schema, 'not', (k, v) => true);

    return (
      <SchemaWrapper>
        {!hideTitle && (
          <SchemaHeader>
            <H4>{name}</H4>
          </SchemaHeader>
        )}
        <TableWrapper>
          <TableHeader columns={schemaColumnsName} />
          <TableBodyWrapper>
            {this.renderSchemaProps(name, schema)}
          </TableBodyWrapper>
        </TableWrapper>
        {/* we need to disable this component if schema has "not" field anywhere in it */}
        {!hasNotField && <SchemaExample title={exampleTitle} schema={schema} />}
      </SchemaWrapper>
    );
  }
  private renderSchemaProps(
    schemaName: string,
    schema: Schema,
  ): React.ReactNode {
    if (schema.properties) {
      const properties = schema.properties;

      return Object.keys(properties).map(key => (
        <SchemaProperties
          key={key}
          name={key}
          properties={properties[key]}
          treeSpace={0}
        />
      ));
    }
    return (
      <SchemaProperties name={schemaName} properties={schema} treeSpace={0} />
    );
  }
}
