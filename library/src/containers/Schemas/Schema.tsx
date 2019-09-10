import React from 'react';

import { SchemaPropertiesComponent as SchemaProperties } from './SchemaProperties';
import { SchemaExampleComponent } from './SchemaExample';

import { Table, Toggle, ToggleLabel } from '../../components';
import { Schema } from '../../types';
import { bemClasses, searchForNestedObject } from '../../helpers';
import { SCHEMA_COLUMN_NAMES } from '../../constants';

interface Props {
  name: string;
  schema?: Schema;
  description?: React.ReactNode;
  exampleTitle?: string;
  hideTitle?: boolean;
  toggle?: boolean;
  toggleExpand?: boolean;
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
  description,
  exampleTitle,
  hideTitle = false,
  toggle = false,
  toggleExpand = false,
}) => {
  if (!schema) {
    return null;
  }
  schema.description = schema.description || description || '';

  const className = `schema`;
  const hasNotField = searchForNestedObject(schema, 'not');

  const header = (
    <h3>
      <span className={bemClasses.element(`${className}-header-title`)}>
        {name}
      </span>
    </h3>
  );

  const content = (
    <>
      <div className={bemClasses.element(`${className}-table`)}>
        <Table
          header={{
            columns: SCHEMA_COLUMN_NAMES,
          }}
        >
          {renderSchemaProps(name, schema)}
        </Table>
      </div>
      {/* we need to disable this component if schema has "not" field anywhere in it */}
      {hasNotField ? null : (
        <SchemaExampleComponent title={exampleTitle} schema={schema} />
      )}
    </>
  );

  return (
    <section className={bemClasses.element(className)}>
      {toggle ? (
        <Toggle
          header={header}
          className={className}
          label={ToggleLabel.SCHEMA}
          toggleInState={true}
        >
          {content}
        </Toggle>
      ) : (
        <>
          {hideTitle ? null : (
            <header className={bemClasses.element(`${className}-header`)}>
              {header}
            </header>
          )}
          {content}
        </>
      )}
    </section>
  );
};
