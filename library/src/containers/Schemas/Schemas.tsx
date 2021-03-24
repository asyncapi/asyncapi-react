import React from 'react';

// import { SchemaComponent } from './Schema';
import { SchemaComponent } from './NewSchema';

import { ExpandNestedConfig } from '../../config';
import { bemClasses } from '../../helpers';
import { Toggle } from '../../components';
import { SCHEMAS_TEXT, CONTAINER_LABELS } from '../../constants';
import { useSpec } from '../../store';

interface Props {
  expand?: ExpandNestedConfig;
}

export const SchemasComponent: React.FunctionComponent<Props> = ({
  expand,
}) => {
  const schemas = useSpec().allSchemas();
  if (!schemas.size) {
    return null;
  }

  const className = CONTAINER_LABELS.SCHEMAS;
  const header = <h2>{SCHEMAS_TEXT}</h2>;

  const content = (
    <ul className={bemClasses.element(`${className}-list`)}>
      {Array.from(schemas).map(([schemaName, schema]) => (
        <li
          key={schemaName}
          className={bemClasses.element(`${className}-list-item`)}
        >
          <SchemaComponent
            schemaName={schemaName}
            schema={schema}
            // name={key}
            // toggle={true}
            // toggleExpand={expand && expand.elements}
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
        expanded={true}
        // expanded={expand && expand.root}
        label={CONTAINER_LABELS.SCHEMAS}
        toggleInState={true}
      >
        {content}
      </Toggle>
    </section>
  );
};
