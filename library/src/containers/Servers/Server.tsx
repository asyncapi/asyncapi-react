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
    <div className="ai-server">
      <div>
        <span className="ai-server__url">{server.url()}</span>
        <span className="ai-server__protocol">
          {protocolVersion
            ? `${server.protocol()} ${protocolVersion}`
            : server.protocol()}
        </span>
        <span className="ai-server__name">{serverName}</span>
      </div>

      {server.hasDescription() && (
        <div className="ai-server__description">
          <Markdown>{server.description()}</Markdown>
        </div>
      )}

      {urlVariables && (
        <div className="ai-server__url-variables">
          <Schema
            schemaName="URL Variables"
            schema={urlVariables}
            expanded={true}
          />
        </div>
      )}

      {serverRequirements && (
        <ServerSecurity serverRequirements={serverRequirements} />
      )}

      {server.hasBindings() && (
        <div className="ai-server__bindings">
          <Bindings bindings={server.bindings()} />
        </div>
      )}
    </div>
  );
};
