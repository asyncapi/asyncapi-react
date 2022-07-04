import React from 'react';

import { Server } from './Server';
import { AnchorWrapper } from '../../components';

import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { SERVERS_TEXT } from '../../constants';

export const Servers: React.FunctionComponent = () => {
  const servers = useSpec().servers();
  const config = useConfig();

  if (!Object.keys(servers).length) {
    return null;
  }

  return (
    <section
      id={CommonHelpers.getIdentifier('servers', config)}
      className="mt-16"
    >
      <AnchorWrapper
        anchor={CommonHelpers.getIdentifier('servers', config)}
        iconProps={{
          className: 'top-3.5',
        }}
      >
        <h2 className="2xl:w-7/12 text-3xl font-light mb-4 px-8">
          {SERVERS_TEXT}
        </h2>
      </AnchorWrapper>
      <ul>
        {Object.entries(servers).map(([serverName, server]) => (
          <li
            className="mb-4"
            key={serverName}
            id={CommonHelpers.getIdentifier(`server-${serverName}`, config)}
          >
            <AnchorWrapper
              anchor={CommonHelpers.getIdentifier(
                `server-${serverName}`,
                config,
              )}
              iconProps={{
                className: 'top-4',
              }}
            >
              <Server
                serverName={serverName}
                server={server}
                key={serverName}
              />
            </AnchorWrapper>
          </li>
        ))}
      </ul>
    </section>
  );
};
