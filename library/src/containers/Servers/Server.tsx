import React from 'react';
import { Server as ServerType } from '@asyncapi/parser';

import { ServerSecurity } from './ServerSecurity';
import { Markdown, Schema, Bindings } from '../../components';

import { SchemaHelpers } from '../../helpers';

interface Props {
  serverName: string;
  server: ServerType;
}

export const Server: React.FunctionComponent<Props> = ({
  serverName,
  server,
}) => {
  const urlVariables = SchemaHelpers.serverVariablesToSchema(
    server.variables(),
  );
  const protocolVersion = server.protocolVersion();
  const serverRequirements = server.security();

  return (
    <div className="bg-gray-200 rounded p-4 mt-2">
      <div className="pr-4 font-mono">
        <span>{server.url()}</span>
        <span className="bg-teal-500 font-bold no-underline text-white uppercase rounded ml-2">
          {protocolVersion
            ? `${server.protocol()} ${protocolVersion}`
            : server.protocol()}
        </span>
        <span>{serverName}</span>
      </div>

      <Markdown>{server.description()}</Markdown>

      {urlVariables && (
        <Schema
          schemaName="URL Variables"
          schema={urlVariables}
          expanded={true}
        />
      )}

      {serverRequirements && (
        <ServerSecurity serverRequirements={serverRequirements} />
      )}

      {server.hasBindings() && <Bindings bindings={server.bindings()} />}
    </div>
  );
};
