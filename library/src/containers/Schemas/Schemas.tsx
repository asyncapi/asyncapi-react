import React from 'react';

import { SchemaComponent } from './Schema';

import { CollapseNestedConfig } from '../../config';
import { bemClasses } from '../../helpers';
import { Toggle, ToggleLabel } from '../../components';
import { SCHEMAS_TEXT } from '../../constants';
import { Schema } from '../../types';

interface Props {
  schemas?: Record<string, Schema>;
  collapse?: CollapseNestedConfig;
}

export const SchemasComponent: React.FunctionComponent<Props> = ({
  schemas,
  collapse,
}) => {
  if (!schemas) {
    return null;
  }
  const className = `schemas`;

  const header = <h2>{SCHEMAS_TEXT}</h2>;

  const content = (
    <ul className={bemClasses.element(`${className}-list`)}>
      {Object.entries(schemas).map(([key, schema]) => (
        <li key={key} className={bemClasses.element(`${className}-list-item`)}>
          <SchemaComponent
            name={key}
            schema={schema}
            toggle={true}
            toggleExpand={collapse && collapse.elements}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className={bemClasses.element(className)}>
      <Toggle
        header={header}
        className={className}
        expanded={collapse && collapse.root}
        label={ToggleLabel.SCHEMAS}
        toggleInState={true}
      >
        {content}
      </Toggle>
    </section>
  );
};
