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
    <ul className="ai-servers__list">
      {Object.entries(servers).map(([serverName, server]) => (
        <li className="ai-servers__list-item" key={serverName}>
          <Server serverName={serverName} server={server} key={serverName} />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="ai-servers" id="servers">
      <Toggle
        header={header}
        className="ai-servers"
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
