import React, { FunctionComponent } from 'react';

import { SchemaComponent } from '../Schemas/Schema';
import { Markdown } from '../../components';

import { bemClasses } from '../../helpers';
import { Parameter as ParamType } from '../../types';
import { LOCATION } from '../../constants';

interface Props {
  name: string;
  param: ParamType;
}

export const Parameter: FunctionComponent<Props> = ({
  param: { description, location, schema },
  name = '',
}) => (
  <div className={bemClasses.element(`parameter`)}>
    <header className={bemClasses.element(`parameter-header`)}>
      {description && <Markdown>{description}</Markdown>}
      {location && (
        <h4>
          {LOCATION}: {location}
        </h4>
      )}
    </header>
    <div className={bemClasses.element(`parameter-schema`)}>
      <SchemaComponent name={name} schema={schema} hideTitle={true} />
    </div>
  </div>
);
