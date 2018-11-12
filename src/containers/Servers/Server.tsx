import React, { Component } from 'react';

import { Header, H4, Markdown, TableAccesor, TableRow } from '../../components';

import { Server } from '../../common';

import ServerVariablesComponent from './ServerVariables';

const serverAccesors: TableAccesor[] = [
  (el: Server) => el.url,
  (el: Server) => el.scheme,
  (el: Server) => el.description ? <Markdown>{el.description}</Markdown> : null,
]

export interface ServerProps {
  server: Server;
}

class ServerComponent extends Component<ServerProps> {
  public render() {
    const { server } = this.props;

    const vars = server.variables ? Object.keys(server.variables).map(key => ({ key: key, content: server.variables![key] })) : []

    return (
      <>
        <TableRow element={server} accesors={serverAccesors} />
        <ServerVariablesComponent variables={vars} />
      </>
    );
  }
}

export default ServerComponent;
