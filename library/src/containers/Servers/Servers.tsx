import React from 'react';

import { Servers } from '../../types';
import { Security } from '../Security/Security';
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
          {Object.keys(servers).map(stage => {
            const server = servers[stage];
            return (
              <ServerComponent
                key={`${server.url}${server.protocol}${stage}`}
                server={server}
                stage={stage}
              />
            );
          })}
        </TableBodyWrapper>
      </TableWrapper>
      <ServersHeader>
        <H2>Security</H2>
      </ServersHeader>
      <Security servers={servers} />
    </StyledServers>
  );
};

export default ServersComponent;
