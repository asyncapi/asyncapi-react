import React from 'react';

import { SchemaPropertiesComponent as SchemaProperties } from './SchemaProperties';
import { SchemaExampleComponent } from './SchemaExample';

import { Table, Toggle } from '../../components';
import { Schema } from '../../types';
import {
  bemClasses,
  searchForNestedObject,
  removeSpecialChars,
} from '../../helpers';
import {
  SCHEMA_COLUMN_NAMES,
  ITEM_LABELS,
  CONTAINER_LABELS,
} from '../../constants';

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

  const className = ITEM_LABELS.SCHEMA;
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

  const schemaID = toggle
    ? bemClasses.identifier([CONTAINER_LABELS.SCHEMAS, name])
    : undefined;
  const schemaDataID = toggle
    ? bemClasses.identifier([
        CONTAINER_LABELS.SCHEMAS,
        removeSpecialChars(name),
      ])
    : undefined;
  return (
    <section
      className={bemClasses.element(className)}
      id={schemaID}
      data-asyncapi-id={schemaDataID}
    >
      {toggle ? (
        <Toggle
          header={header}
          className={className}
          expanded={toggleExpand}
          label={ITEM_LABELS.SCHEMA}
          itemName={name}
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
