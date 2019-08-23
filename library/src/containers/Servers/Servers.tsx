import React from 'react';

import { Servers } from '../../types';

import { ServerComponent } from './Server';

import {
  H2,
  TableColumnName,
  TableWrapper,
  TableHeader,
  TableBodyWrapper,
} from '../../components';
import { Servers as StyledServers, ServersHeader } from './styled';
import { CONNECTION_DETAILS } from '../../constants';
const serversColumnsName: TableColumnName[] = [
  'URL',
  'Stage',
  'Protocol',
  'Description',
];

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
