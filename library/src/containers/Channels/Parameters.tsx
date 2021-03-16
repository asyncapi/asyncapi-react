import React from 'react';
import { ChannelParameter } from '@asyncapi/parser';

import { Parameter } from './Parameter';

import { bemClasses } from '../../helpers';
import { PARAMETERS_TEXT } from '../../constants';

interface Props {
  parameters?: Record<string, ChannelParameter>;
  identifier: string;
  dataIdentifier: string;
}

export const Parameters: React.FunctionComponent<Props> = ({
  parameters = {},
  identifier,
  dataIdentifier,
}) => {
  if (!Object.keys(parameters).length) {
    return null;
  }

  return (
    <div
      className={bemClasses.element(`channel-parameters`)}
      id={identifier}
      data-asyncapi-id={dataIdentifier}
    >
      <header className={bemClasses.element(`channel-parameters-header`)}>
        <h4>{PARAMETERS_TEXT}</h4>
      </header>
      <ul className={bemClasses.element(`channel-parameters-list`)}>
        {Object.entries(parameters).map(([parameterName, parameter]) => (
          <li
            key={parameterName}
            className={bemClasses.element(`channel-parameters-list-item`)}
          >
            <Parameter parameterName={parameterName} parameter={parameter} />
          </li>
        ))}
      </ul>
    </div>
  );
};
