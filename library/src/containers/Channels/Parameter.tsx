import React from 'react';
import { ChannelParameter } from '@asyncapi/parser';

import { SchemaComponent } from '../Schemas/Schema';

import { bemClasses } from '../../helpers';
import { LOCATION_TEXT } from '../../constants';

interface Props {
  parameterName: string;
  parameter: ChannelParameter;
}

export const Parameter: React.FunctionComponent<Props> = ({
  parameterName = '',
  parameter,
}) => {
  const location = parameter.location();

  return (
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
          name={parameterName}
          schema={parameter.schema().json() as any}
          hideTitle={true}
          description={parameter.description()}
          required={true} // parameters are always required
        />
      </div>
    </div>
  );
};
