import React from 'react';
import { Server } from '@asyncapi/parser';

import { ServerVariablesComponent } from './Variables';
import { ServerSecurityComponent } from './Security';

import { bemClasses, removeSpecialChars } from '../../helpers';
import { Toggle, Markdown } from '../../components';
import { ITEM_LABELS, CONTAINER_LABELS } from '../../constants';

interface Props {
  serverName: string;
  server: Server;
  toggleExpand?: boolean;
}

export const ServerComponent: React.FunctionComponent<Props> = ({
  serverName,
  server,
  toggleExpand = false,
}) => {
  const serverUrl = server.url();
  const serverSecurity = server.security();

  const className = ITEM_LABELS.SERVER;

  const protocol = server.protocol();
  const protocolVersion = server.protocolVersion();
  const protocolTitle = `${protocol}${
    protocolVersion ? ` ${protocolVersion}` : ``
  }`;

  const header = (
    <h4>
      <span
        className={bemClasses.concatenate([
          bemClasses.element(`${className}-header-protocol`),
          bemClasses.element(`badge`),
        ])}
      >
        {protocolTitle}
      </span>
      <span
        className={bemClasses.concatenate([
          bemClasses.element(`${className}-header-stage`),
          bemClasses.element(`badge`),
        ])}
      >
        {serverName}
      </span>
      <span>{serverUrl}</span>
    </h4>
  );

  const identifier = bemClasses.identifier([
    CONTAINER_LABELS.SERVERS,
    serverUrl,
  ]);
  const dataIdentifier = bemClasses.identifier([
    CONTAINER_LABELS.SERVERS,
    removeSpecialChars(serverUrl),
  ]);

  const variables = Object.entries(server.variables()).map(
    ([key, variable]) => ({
      key,
      content: variable,
    }),
  );

  const content = (
    <>
      {server.hasDescription() && (
        <div className={bemClasses.element(`${className}-description`)}>
          <Markdown>{server.description()}</Markdown>
        </div>
      )}
      <ServerVariablesComponent
        variables={variables}
        identifier={identifier}
        dataIdentifier={dataIdentifier}
      />
      {serverSecurity && serverSecurity.length && (
        <ServerSecurityComponent
          requirements={serverSecurity}
          identifier={identifier}
          dataIdentifier={dataIdentifier}
        />
      )}
    </>
  );

  const body =
    (server.hasDescription() ||
      server.hasVariables() ||
      serverSecurity.length) &&
    content;

  return (
    <section
      className={bemClasses.element(className)}
      id={identifier}
      data-asyncapi-id={dataIdentifier}
    >
      <Toggle
        header={header}
        className={className}
        expanded={toggleExpand}
        label={ITEM_LABELS.SERVER}
        itemName={serverUrl}
        toggleInState={!!body}
      >
        {body}
      </Toggle>
    </section>
  );
};
