import React from 'react';

import { ServerComponent } from './Server';

import { bemClasses } from '../../helpers';
import { Servers } from '../../types';
import { Table } from '../../components';
import { CONNECTION_DETAILS, SERVER_COLUMN_NAMES } from '../../constants';

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
    <div className={bemClasses.element(`servers`)}>
      <header className={bemClasses.element(`servers-header`)}>
        <h2>{CONNECTION_DETAILS}</h2>
      </header>
      <Table
        header={{
          columns: SERVER_COLUMN_NAMES,
        }}
      >
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
      </Table>
    </div>
  );
};
