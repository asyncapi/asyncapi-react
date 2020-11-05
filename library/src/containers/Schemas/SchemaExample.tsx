import React from 'react';

import { CodeComponent, Badge, BadgeType } from '../../components';

import { bemClasses, generateExampleSchema } from '../../helpers';
import { Schema } from '../../types';
import { SCHEMA_EXAMPLE_TEXT } from '../../constants';

interface Props {
  title?: string;
  schema?: Schema;
  example?: object;
}

export const SchemaExampleComponent: React.FunctionComponent<Props> = ({
  title,
  schema,
  example,
}) => {
  const schemaExample =
    schema && schema.example
      ? schema.example
      : schema && generateExampleSchema(schema);
  const exampleString = JSON.stringify(example || schemaExample, null, 2);

  if (!exampleString) {
    return null;
  }

  return (
    <div className={bemClasses.element(`schema-example`)}>
      <CodeComponent
        code={exampleString}
        title={
          <div className={bemClasses.element(`schema-example-header`)}>
            <span className={bemClasses.element(`schema-example-header-title`)}>
              {title ? title : SCHEMA_EXAMPLE_TEXT}
            </span>
            {example || (schema && schema.example) ? null : (
              <div
                className={bemClasses.element(
                  `schema-example-header-generated-badge`,
                )}
              >
                <Badge type={BadgeType.GENERATED} />
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};
