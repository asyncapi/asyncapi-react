import React, { Component } from 'react';

import { Server } from '../../types';

import ServerComponent from './Server';

import { H2, TableColumnName, TableWrapper, TableHeader, TableBodyWrapper } from '../../components';
import { Servers, ServersHeader } from './styled';

const serversColumnsName: TableColumnName[] = [
  "URL",
  "Scheme",
  "Description",
]

interface Props {
  servers?: Server[];
}

class ServersComponent extends Component<Props> {
  render() {
    const { servers } = this.props;

    if (!servers) return null;

    return (
      <Servers>
        <ServersHeader>
          <H2>Connection details</H2>
        </ServersHeader>
        <TableWrapper>
          <TableHeader columns={serversColumnsName} />
          <TableBodyWrapper>
            {servers.map(server => <ServerComponent key={`${server.url}${server.scheme}`} server={server} />)}
          </TableBodyWrapper>
        </TableWrapper>
      </Servers>
    );
  }
}

export default ServersComponent;
