import React, { Component } from 'react';

import { Server } from '../../types';

import { ServerVariablesComponent } from './ServerVariables';

import { Markdown, TableAccessor, TableRow } from '../../components';
import { ServerExpandIcon } from './styled';

interface ServerWithVariables {
  server: Server;
  stage: string;
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
  (el: ServerWithVariables) => el.stage,
  (el: ServerWithVariables) => el.server.protocol,
  (el: ServerWithVariables) =>
    el.server.description && <Markdown>{el.server.description}</Markdown>,
];

interface Props {
  server: Server;
  stage: string;
}

interface State {
  openAccordion: boolean;
}

export class ServerComponent extends Component<Props, State> {
  state = {
    openAccordion: false,
  };

  render() {
    const {
      props: { server, stage },
      state: { openAccordion },
    } = this;

    const vars = server.variables
      ? Object.entries(server.variables).map(([key, variable]) => ({
          key,
          content: variable,
        }))
      : [];

    const serverWithVariables: ServerWithVariables = {
      stage,
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
