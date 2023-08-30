import React from 'react';
import { ServerInterface } from '@asyncapi/parser';

import { Security } from './Security';
import { Markdown, Schema, Bindings, Tags, Extensions } from '../../components';

import { useConfig } from '../../contexts';
import { CommonHelpers, SchemaHelpers } from '../../helpers';

interface Props {
  serverName: string;
  server: ServerInterface;
}

export const Server: React.FunctionComponent<Props> = ({
  serverName,
  server,
}) => {
  const config = useConfig();

  if (!server) {
    return null;
  }

  const urlVariables = SchemaHelpers.serverVariablesToSchema(
    server.variables(),
  );
  const protocolVersion = server.protocolVersion();
  const security = server.security();

  return (
    <div className="panel-item">
      <div className="panel-item--center px-8">
        <div className="shadow rounded bg-gray-200 p-4 border bg-gray-100">
          <div>
            <span className="font-mono text-base">{server.url()}</span>
            <span className="bg-teal-500 font-bold no-underline text-white uppercase rounded mx-2 px-2 py-1 text-sm">
              {protocolVersion
                ? `${server.protocol()} ${protocolVersion}`
                : server.protocol()}
            </span>
            <span className="bg-blue-500 font-bold no-underline text-white uppercase rounded px-2 py-1 text-sm">
              {serverName}
            </span>
          </div>

          {server.hasDescription() && (
            <div className="mt-2">
              <Markdown>{server.description()}</Markdown>
            </div>
          )}

          {urlVariables && (
            <div
              className="mt-2"
              id={`${CommonHelpers.getIdentifier(
                `server-${serverName}-url-variables`,
                config,
              )}`}
            >
              <Schema
                schemaName="URL Variables"
                schema={urlVariables}
                expanded={true}
              />
            </div>
          )}

          {
            <div
              id={`${CommonHelpers.getIdentifier(
                `server-${serverName}-security`,
                config,
              )}`}
            >
              <Security protocol={server.protocol()} security={security} />
            </div>
          }

          {server.bindings() && (
            <div className="mt-2">
              <Bindings
                name="Server specific information"
                bindings={server.bindings()}
              />
            </div>
          )}

          <Extensions name="Server Extensions" item={server} />

          {server.tags().length > 0 && (
            <div className="mt-2">
              <Tags tags={server.tags()} />
            </div>
          )}
        </div>
      </div>

      <div className="panel-item--right" />
    </div>
  );
};
