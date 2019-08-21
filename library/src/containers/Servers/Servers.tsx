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

const serversColumnsName: TableColumnName[] = [
  'URL',
  'Stage',
  'Protocol',
  'Description',
];

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

export default ServersComponent;
