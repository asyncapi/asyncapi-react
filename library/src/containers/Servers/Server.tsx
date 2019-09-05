import React from 'react';

import { ServerVariablesComponent } from './Variables';
import { ServerSecurityComponent } from './Security';

import { bemClasses } from '../../helpers';
import { Toggle, Markdown } from '../../components';
import { Server, SecurityScheme } from '../../types';

interface Props {
  server: Server;
  stage: string;
  securitySchemes?: Record<string, SecurityScheme>;
  toggleExpand?: boolean;
}

export const ServerComponent: React.FunctionComponent<Props> = ({
  server,
  stage,
  securitySchemes,
  toggleExpand = false,
}) => {
  const className = `server`;

  const variables = server.variables
    ? Object.entries(server.variables).map(([key, variable]) => ({
        key,
        content: variable,
      }))
    : [];

  const header = (
    <>
      <h4>
        <span
          className={bemClasses.concatenate([
            bemClasses.element(`${className}-header-protocol`),
            bemClasses.element(`badge`),
          ])}
        >{`${server.protocol}${
          server.protocolVersion ? ` ${server.protocolVersion}` : ``
        }`}</span>
        <span
          className={bemClasses.concatenate([
            bemClasses.element(`${className}-header-stage`),
            bemClasses.element(`badge`),
          ])}
        >
          {stage}
        </span>
        <span>{server.url}</span>
      </h4>
    </>
  );

  const content = (
    <>
      {server.description && (
        <div className={bemClasses.element(`${className}-description`)}>
          <Markdown>{server.description}</Markdown>
        </div>
      )}
      <div></div>
      <ServerVariablesComponent variables={variables} />
      {server.security && securitySchemes && (
        <ServerSecurityComponent
          requirements={server.security}
          schemes={securitySchemes}
        />
      )}
    </>
  );

  return (
    <section className={bemClasses.element(className)}>
      <Toggle
        header={header}
        className={className}
        expanded={toggleExpand}
        toggleInState={true}
      >
        {content}
      </Toggle>
    </section>
  );
};
