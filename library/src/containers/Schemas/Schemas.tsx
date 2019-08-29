import React from 'react';

import { SchemaComponent } from './Schema';

import { bemClasses } from '../../helpers';
import { SCHEMAS_TEXT } from '../../constants';
import { Schema } from '../../types';

interface Props {
  schemas?: Record<string, Schema>;
}

export const SchemasComponent: React.FunctionComponent<Props> = ({
  schemas,
}) => {
  if (!schemas) {
    return null;
  }

  return (
    <div className={bemClasses.element(`schemas`)}>
      <header className={bemClasses.element(`schemas-header`)}>
        <h2>{SCHEMAS_TEXT}</h2>
      </header>
      <ul className={bemClasses.element(`schemas-list`)}>
        {Object.entries(schemas).map(([key, schema]) => (
          <li key={key} className={bemClasses.element(`schemas-list-item`)}>
            <SchemaComponent name={key} schema={schema} />
          </li>
        ))}
      </ul>
    </div>
  );
};
