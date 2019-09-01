import React from 'react';

import { CodeComponent, Badge, BadgeType } from '../../components';

import { bemClasses, generateExample } from '../../helpers';
import { Schema } from '../../types';
import { SCHEMA_EXAMPLE_TEXT } from '../../constants';

interface Props {
  title?: string;
  schema: Schema;
}

export const SchemaExampleComponent: React.FunctionComponent<Props> = ({
  title,
  schema,
}) => {
  const example = JSON.stringify(
    schema.example ? schema.example : generateExample(schema),
    null,
    2,
  );

  if (!example) {
    return null;
  }

  return (
    <div className={bemClasses.element(`schema-example`)}>
      <CodeComponent
        code={example}
        title={
          <div className={bemClasses.element(`schema-example-header`)}>
            <span className={bemClasses.element(`schema-example-header-title`)}>
              {title ? title : SCHEMA_EXAMPLE_TEXT}
            </span>
            {!schema.example ? (
              <div
                className={bemClasses.element(
                  `schema-example-header-generated-badge`,
                )}
              >
                <Badge type={BadgeType.GENERATED} />
              </div>
            ) : null}
          </div>
        }
      />
    </div>
  );
};
