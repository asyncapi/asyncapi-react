import React from 'react';

import { SchemaComponent } from './Schema';

import { ExpandNestedConfig } from '../../config';
import { bemClasses } from '../../helpers';
import { Toggle } from '../../components';
import { SCHEMAS_TEXT, CONTAINER_LABELS } from '../../constants';
import { Schema } from '../../types';

interface Props {
  schemas?: Record<string, Schema>;
  expand?: ExpandNestedConfig;
}

export const SchemasComponent: React.FunctionComponent<Props> = ({
  schemas,
  expand,
}) => {
  if (!schemas) {
    return null;
  }
  const className = CONTAINER_LABELS.SCHEMAS;

  const header = <h2>{SCHEMAS_TEXT}</h2>;

  const content = (
    <ul className={bemClasses.element(`${className}-list`)}>
      {Object.entries(schemas).map(([key, schema]) => (
        <li key={key} className={bemClasses.element(`${className}-list-item`)}>
          <SchemaComponent
            name={key}
            schema={schema}
            toggle={true}
            toggleExpand={expand && expand.elements}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className={bemClasses.element(className)}
      id={bemClasses.identifier([className])}
    >
      <Toggle
        header={header}
        className={className}
        expanded={expand && expand.root}
        label={CONTAINER_LABELS.SCHEMAS}
        toggleInState={true}
      >
        {content}
      </Toggle>
    </section>
  );
};
