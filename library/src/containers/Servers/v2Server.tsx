import React from 'react';

import { Server } from '../../types';

import ServerComponent from './Server';

import {
  H2,
  TableColumnName,
  TableWrapper,
  TableHeader,
  TableBodyWrapper,
} from '../../components';
import { Servers, ServersHeader } from './styled';

const serversColumnsName: TableColumnName[] = ['URL', 'Scheme', 'Description'];

interface Props {
  servers?: Server[];
}

const ServersComponent: React.FunctionComponent<Props> = ({ servers }) => {
  if (!servers) {
    return null;
  }

  console.log(servers);

  return (
    <Servers>
      <ServersHeader>
        <H2>Connection details</H2>
      </ServersHeader>
      <TableWrapper>
        <TableHeader columns={serversColumnsName} />
        <TableBodyWrapper>
          {servers.map(server => (
            <ServerComponent
              key={`${server.url}${server.scheme}`}
              server={server}
            />
          ))}
        </TableBodyWrapper>
      </TableWrapper>
    </Servers>
  );
};

export default ServersComponent;
