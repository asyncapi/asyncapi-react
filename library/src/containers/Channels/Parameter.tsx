import React, { FunctionComponent } from 'react';

import { SchemaComponent } from '../Schemas/Schema';

import { bemClasses } from '../../helpers';
import { Parameter as ParamType } from '../../types';
import { LOCATION_TEXT } from '../../constants';

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
          {LOCATION_TEXT}: {location}
        </h4>
      )}
    </header>
    <div className={bemClasses.element(`channel-parameter-schema`)}>
      <SchemaComponent
        name={name}
        schema={schema}
        hideTitle={true}
        description={description}
        required={true} // parameters are always required
      />
    </div>
  </div>
);
