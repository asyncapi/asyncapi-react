import React from 'react';

import { Servers } from '../../types';

import { ServerComponent } from './Server';

import {
  H2,
  TableWrapper,
  TableHeader,
  TableBodyWrapper,
} from '../../components';
import { Servers as StyledServers, ServersHeader } from './styled';
import { CONNECTION_DETAILS, SERVER_COLUMN_NAMES } from '../../constants';

interface Props {
  servers?: Servers;
}

export const ServersComponent: React.FunctionComponent<Props> = ({
  servers,
}) => {
  if (!servers) {
    return null;
  }

  return (
    <StyledServers>
      <ServersHeader>
        <H2>{CONNECTION_DETAILS}</H2>
      </ServersHeader>
      <TableWrapper>
        <TableHeader columns={SERVER_COLUMN_NAMES} />
        <TableBodyWrapper>
          {Object.entries(servers).map(([stage, server]) => {
            const { url, protocol } = server;
            return (
              <ServerComponent
                key={`${url}${protocol}${stage}`}
                server={server}
                stage={stage}
              />
            );
          })}
        </TableBodyWrapper>
      </TableWrapper>
    </StyledServers>
  );
};
