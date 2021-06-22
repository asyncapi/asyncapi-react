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
  if (!server) {
    return null;
  }

  const urlVariables = SchemaHelpers.serverVariablesToSchema(
    server.variables(),
  );
  const protocolVersion = server.protocolVersion();
  const serverRequirements = server.security();

  return (
    <div className="panel-item">
      <div className="panel-item--center aui-px-8">
        <div className="aui-shadow aui-rounded aui-bg-gray-200 aui-p-4 aui-border aui-bg-gray-100">
          <div>
            <span className="aui-font-mono aui-text-base">{server.url()}</span>
            <span className="aui-bg-teal-500 aui-font-bold aui-no-underline aui-text-white aui-uppercase aui-rounded aui-mx-2 aui-px-2 aui-py-1 aui-text-sm">
              {protocolVersion
                ? `${server.protocol()} ${protocolVersion}`
                : server.protocol()}
            </span>
            <span className="aui-bg-blue-500 aui-font-bold aui-no-underline aui-text-white aui-uppercase aui-rounded aui-px-2 aui-py-1 aui-text-sm">
              {serverName}
            </span>
          </div>

          {server.hasDescription() && (
            <div className="aui-mt-2">
              <Markdown>{server.description()}</Markdown>
            </div>
          )}

          {urlVariables && (
            <div className="aui-mt-2">
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
            <div className="aui-mt-2">
              <Bindings bindings={server.bindings()} />
            </div>
          )}
        </div>
      </div>

      <div className="panel-item--right" />
    </div>
  );
};
