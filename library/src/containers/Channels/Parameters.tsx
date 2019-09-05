import React from 'react';

import { Parameter } from './Parameter';

import { bemClasses } from '../../helpers';
import { Parameters as ParametersType } from '../../types';
import { CHANNEL_PARAMETERS } from '../../constants';

interface Props {
  parameters?: ParametersType;
}

export const Parameters: React.FunctionComponent<Props> = ({ parameters }) => {
  if (!parameters) {
    return null;
  }

  return (
    <div className={bemClasses.element(`channel-parameters`)}>
      <header className={bemClasses.element(`channel-parameters-header`)}>
        <h3>{CHANNEL_PARAMETERS}</h3>
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
