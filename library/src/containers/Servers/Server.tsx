import React, { useState } from 'react';

import { ServerVariablesComponent } from './Variables';
import { ServerSecurityComponent } from './Security';

import { bemClasses } from '../../helpers';
import { Server, SecurityScheme } from '../../types';
import { Markdown, TableAccessor, TableRow } from '../../components';

interface ServerWithVariables {
  server: Server;
  stage: string;
  serverVariables: boolean;
  openAccordion: boolean;
  toggleVariables: (event: any) => void;
}

const serverAccessors: TableAccessor<ServerWithVariables>[] = [
  el => (
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
      <span>{el.server.url}</span>
    </>
  ),
  el => <span>{el.stage}</span>,
  el => (
    <span>{`${el.server.protocol}${
      el.server.protocolVersion ? ` ${el.server.protocolVersion}` : ``
    }`}</span>
  ),
  el => el.server.description && <Markdown>{el.server.description}</Markdown>,
];

interface Props {
  server: Server;
  stage: string;
  securitySchemes?: Record<string, SecurityScheme>;
}

export const ServerComponent: React.FunctionComponent<Props> = ({
  server,
  stage,
  securitySchemes,
}) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);

  const variables = server.variables
    ? Object.entries(server.variables).map(([key, variable]) => ({
        key,
        content: variable,
      }))
    : [];

  const serverWithVariables: ServerWithVariables = {
    stage,
    server,
    serverVariables: variables.length > 0,
    openAccordion,
    toggleVariables: (_: any) => setOpenAccordion(state => !state),
  };

  return (
    <>
      <TableRow element={serverWithVariables} accessors={serverAccessors} />
      <ServerVariablesComponent
        variables={variables}
        openAccordion={openAccordion}
      />
      {server.security && securitySchemes && (
        <ServerSecurityComponent
          requirements={server.security}
          schemes={securitySchemes}
          openAccordion={openAccordion}
        />
      )}
    </>
  );
};
