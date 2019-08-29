import React from 'react';

import { SchemaPropertiesComponent as SchemaProperties } from './SchemaProperties';
import { SchemaExampleComponent } from './SchemaExample';

import { Table } from '../../components';
import { Schema } from '../../types';
import { bemClasses, searchForNestedObject } from '../../helpers';
import { SCHEMA_COLUMN_NAMES } from '../../constants';

interface Props {
  name: string;
  schema?: Schema;
  exampleTitle?: string;
  hideTitle?: boolean;
}

const renderSchemaProps = (
  schemaName: string,
  schema: Schema,
): React.ReactNode => {
  const properties = schema.properties;

  if (!properties) {
    return (
      <SchemaProperties name={schemaName} properties={schema} treeSpace={0} />
    );
  }

  return Object.entries(properties).map(([key, prop]) => (
    <SchemaProperties key={key} name={key} properties={prop} treeSpace={0} />
  ));
};

export const SchemaComponent: React.FunctionComponent<Props> = ({
  name,
  schema,
  exampleTitle,
  hideTitle,
}) => {
  if (!schema) {
    return null;
  }
  const hasNotField = searchForNestedObject(schema, 'not');

  return (
    <div className={bemClasses.element(`schema`)}>
      {hideTitle ? null : (
        <header className={bemClasses.element(`schema-header`)}>
          <h4>{name}</h4>
        </header>
      )}
      <Table
        header={{
          columns: SCHEMA_COLUMN_NAMES,
        }}
      >
        {renderSchemaProps(name, schema)}
      </Table>
      {/* we need to disable this component if schema has "not" field anywhere in it */}
      {hasNotField ? null : (
        <SchemaExampleComponent title={exampleTitle} schema={schema} />
      )}
    </div>
  );
};
