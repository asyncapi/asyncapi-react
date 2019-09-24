import React from 'react';

import { Parameter } from './Parameter';

import { bemClasses } from '../../helpers';
import { Parameters as ParametersType } from '../../types';
import { PARAMETERS_TEXT } from '../../constants';

interface Props {
  parameters?: ParametersType;
  identifier: string;
}

export const Parameters: React.FunctionComponent<Props> = ({
  parameters,
  identifier,
}) => {
  if (!parameters) {
    return null;
  }

  return (
    <div className={bemClasses.element(`channel-parameters`)} id={identifier}>
      <header className={bemClasses.element(`channel-parameters-header`)}>
        <h4>{PARAMETERS_TEXT}</h4>
      </header>
      <ul className={bemClasses.element(`channel-parameters-list`)}>
        {Object.entries(parameters).map(([name, param]) => (
          <li
            key={name}
            className={bemClasses.element(`channel-parameters-list-item`)}
          >
            <Parameter param={param} name={name} />
          </li>
        ))}
      </ul>
    </div>
  );
};
