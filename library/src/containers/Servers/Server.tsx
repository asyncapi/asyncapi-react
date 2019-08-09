import React, { Component } from 'react';

import { Server } from '../../types';

import ServerVariablesComponent from './ServerVariables';

import { Markdown, TableAccessor, TableRow } from '../../components';
import { ServerExpandIcon } from './styled';

interface ServerWithVariables {
  server: Server;
  serverVariables: boolean;
  openAccordion: boolean;
  toggleVariables: (event: any) => void;
}

const serverAccessors: TableAccessor[] = [
  (el: ServerWithVariables) => (
    <>
      {el.serverVariables && typeof el.toggleVariables === 'function' && (
        <ServerExpandIcon
          onClick={el.toggleVariables}
          open={el.openAccordion}
        />
      )}
      {el.server.url}
    </>
  ),
  (el: ServerWithVariables) => el.server.protocol,
  (el: ServerWithVariables) =>
    el.server.description && <Markdown>{el.server.description}</Markdown>,
];

interface Props {
  server: Server;
}

interface State {
  openAccordion: boolean;
}

class ServerComponent extends Component<Props, State> {
  state = {
    openAccordion: false,
  };

  render() {
    const {
      props: { server },
      state: { openAccordion },
    } = this;

    const vars = server.variables
      ? Object.keys(server.variables).map(key => ({
          key,
          content: server.variables![key],
        }))
      : [];

    const serverWithVariables: ServerWithVariables = {
      server,
      serverVariables: vars.length > 0,
      openAccordion,
      toggleVariables: this.toggle,
    };

    return (
      <>
        <TableRow element={serverWithVariables} accessors={serverAccessors} />
        <ServerVariablesComponent
          variables={vars}
          openAccordion={openAccordion}
        />
      </>
    );
  }

  private toggle = () => {
    this.setState(prevState => ({ openAccordion: !prevState.openAccordion }));
  };
}

export default ServerComponent;
