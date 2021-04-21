import React from 'react';

import { Server } from './Server';

import { useSpec } from '../../contexts';
import { SERVERS } from '../../constants';

export const Servers: React.FunctionComponent = () => {
  const servers = useSpec().servers();

  if (!Object.keys(servers).length) {
    return null;
  }

  const header = <h2>{SERVERS}</h2>;
  const serverList = (
    <ul>
      {Object.entries(servers).map(([serverName, server]) => (
        <li className="mb-4" key={serverName}>
          <Server serverName={serverName} server={server} key={serverName} />
        </li>
      ))}
    </ul>
  );

  return (
    <section id="servers">
      {header}
      {serverList}
    </section>
  );
};
