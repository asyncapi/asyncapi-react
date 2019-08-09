import React from 'react';

import { Servers } from '../../types';

import ServerComponent from './Server';

import {
  H2,
  TableColumnName,
  TableWrapper,
  TableHeader,
  TableBodyWrapper,
} from '../../components';
import { Servers as StyledServers, ServersHeader } from './styled';

const serversColumnsName: TableColumnName[] = ['URL', 'Scheme', 'Description'];

interface Props {
  servers?: Servers;
}

const ServersComponent: React.FunctionComponent<Props> = ({ servers }) => {
  if (!servers) {
    return null;
  }

  return (
    <StyledServers>
      <ServersHeader>
        <H2>Connection details</H2>
      </ServersHeader>
      <TableWrapper>
        <TableHeader columns={serversColumnsName} />
        <TableBodyWrapper>
          {Object.keys(servers).map(stage => {
            const server = servers[stage];
            return (
              <ServerComponent
                key={`${server.url}${server.protocol}`}
                server={server}
              />
            );
          })}
        </TableBodyWrapper>
      </TableWrapper>
    </StyledServers>
  );
};

export default ServersComponent;
