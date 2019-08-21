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
  input: Record<string, any>,
  key: string,
): Record<string, any> | null => {
  if (!input) {
    return null;
  }
  if (input.hasOwnProperty(key)) {
    return input;
  }

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < Object.keys(input).length; i++) {
    const nextInputObject = input[Object.keys(input)[i]];

    if (typeof nextInputObject === 'object') {
      const o = searchForNestedObject(nextInputObject, key);
      if (o !== null) {
        return o;
      }
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
    const hasNotField = searchForNestedObject(schema, 'not');

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
    if (!schema.properties) {
      return (
        <SchemaProperties name={schemaName} properties={schema} treeSpace={0} />
      );
    }

    const properties = schema.properties;

    return Object.entries(properties).map(([key, prop]) => (
      <SchemaProperties key={key} name={key} properties={prop} treeSpace={0} />
    ));
  }
}
