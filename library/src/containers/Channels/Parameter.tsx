import React, { FunctionComponent } from 'react';

import { SchemaComponent } from '../Schemas/Schema';

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
  <div className={bemClasses.element(`channel-parameter`)}>
    <header className={bemClasses.element(`channel-parameter-header`)}>
      {location && (
        <h4>
          {LOCATION}: {location}
        </h4>
      )}
    </header>
    <div className={bemClasses.element(`channel-parameter-schema`)}>
      <SchemaComponent
        name={name}
        schema={schema}
        hideTitle={true}
        description={description}
      />
    </div>
  </div>
);
