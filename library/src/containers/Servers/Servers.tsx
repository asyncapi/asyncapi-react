import React from 'react';

import { Server } from './Server';
import { Toggle } from '../../components';

import { bemClasses } from '../../helpers';
import { useSpec } from '../../store';
import { SERVERS, CONTAINER_LABELS } from '../../constants';

export const Servers: React.FunctionComponent = () => {
  const servers = useSpec().servers();

  if (!Object.keys(servers).length) {
    return null;
  }

  const className = CONTAINER_LABELS.SERVERS;
  const header = <h2>{SERVERS}</h2>;

  const serverList = (
    <ul>
      {Object.entries(servers).map(([serverName, server]) => (
        <li key={serverName}>
          <Server serverName={serverName} server={server} key={serverName} />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className={bemClasses.element(className)}
      id={bemClasses.identifier([className])}
    >
      <Toggle
        header={header}
        className={className}
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
