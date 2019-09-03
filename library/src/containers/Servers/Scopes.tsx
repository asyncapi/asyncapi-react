import React from 'react';

import { bemClasses } from '../../helpers';

interface Props {
  scopes: Record<string, string>;
}

export const ServerSecurityFlowScopes: React.FunctionComponent<Props> = ({
  scopes,
}) => (
  <ul className={bemClasses.element(`server-security-scopes-list`)}>
    {Object.entries(scopes).map(([name, description]) => (
      <li
        className={bemClasses.element(`server-security-scopes-list-item`)}
        title={description}
        key={name}
      >
        <span className={bemClasses.element(`server-security-scope`)}>
          {name}
        </span>
      </li>
    ))}
  </ul>
);
