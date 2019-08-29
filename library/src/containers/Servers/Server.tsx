import React, { useState } from 'react';

import { ServerVariablesComponent } from './ServerVariables';

import { bemClasses } from '../../helpers';
import { Server } from '../../types';
import { Markdown, TableAccessor, TableRow } from '../../components';

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
      {el.serverVariables && el.toggleVariables instanceof Function && (
        <span
          className={`${bemClasses.element(`server-expand-icon`)}${
            el.openAccordion
              ? ` ${bemClasses.modifier(`open`, `server-expand-icon`)}`
              : ''
          }`}
          onClick={el.toggleVariables}
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

export const ServerComponent: React.FunctionComponent<Props> = ({
  server,
  stage,
}) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);

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
    toggleVariables: (_: any) => setOpenAccordion(state => !state),
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
};
