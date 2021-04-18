import React from 'react';

import { Server } from './Server';

import { useSpec } from '../../store';
import { SERVERS } from '../../constants';

export const Servers: React.FunctionComponent = () => {
  const servers = useSpec().servers();

  if (!Object.keys(servers).length) {
    return null;
  }

  return (
    <section id="servers" className="mt-16">
      <h2 className="2xl:w-7/12 text-3xl font-light mb-4 px-8">{SERVERS}</h2>
      <ul>
        {Object.entries(servers).map(([serverName, server]) => (
          <li className="mb-4" key={serverName}>
            <Server serverName={serverName} server={server} key={serverName} />
          </li>
        ))}
      </ul>
    </section>
  );
};
