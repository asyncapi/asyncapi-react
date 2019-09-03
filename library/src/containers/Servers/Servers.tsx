import React from 'react';

import { ServerComponent } from './Server';

import { bemClasses } from '../../helpers';
import { Servers, SecurityScheme } from '../../types';
import { Table } from '../../components';
import { SERVERS, SERVER_COLUMN_NAMES } from '../../constants';

interface Props {
  servers?: Servers;
  securitySchemes?: Record<string, SecurityScheme>;
}

export const ServersComponent: React.FunctionComponent<Props> = ({
  servers,
  securitySchemes,
}) => {
  if (!servers) {
    return null;
  }

  const rows = Object.entries(servers).map(([stage, server]) => {
    const { url } = server;

    return (
      <ServerComponent
        key={`${url}${stage}`}
        server={server}
        stage={stage}
        securitySchemes={securitySchemes}
      />
    );
  });

  return (
    <div className={bemClasses.element(`servers`)}>
      <header className={bemClasses.element(`servers-header`)}>
        <h2>{SERVERS}</h2>
      </header>
      <div className={bemClasses.element(`servers-table`)}>
        <Table
          header={{
            columns: SERVER_COLUMN_NAMES,
          }}
        >
          {rows}
        </Table>
      </div>
    </div>
  );
};
