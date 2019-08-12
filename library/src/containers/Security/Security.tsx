import React, { FunctionComponent } from 'react';
import { StageSecurity } from './StageSecurity';
import { Servers } from '../../types';
interface Props {
  servers: Servers;
}

export const Security: FunctionComponent<Props> = ({ servers }) => {
  const security = Object.keys(servers).map(key => ({
    stage: key,
    security: servers[key].security,
  }));

  return (
    <div>
      {security.map(elem => (
        <StageSecurity
          security={elem.security}
          stage={elem.stage}
          key={elem.stage}
        />
      ))}
    </div>
  );
};
