import React from 'react';

import { Server } from './Server';
import { Toggle } from '../../components';

import { useSpec } from '../../store';
import { SERVERS, CONTAINER_LABELS } from '../../constants';

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
    <section id="servers" className="mt-16 2xl:w-7/12 px-8">
      <Toggle
        header={header}
        expanded={true}
        // expanded={expand && expand.root}
        label={CONTAINER_LABELS.SERVERS}
        toggleInState={true}
      >
        {serverList}
      </Toggle>
    </section>
  );
};
