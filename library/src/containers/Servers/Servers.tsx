import React from 'react';

import { ServerComponent } from './Server';

import { CollapseNestedConfig } from '../../config';
import { bemClasses } from '../../helpers';
import { Servers, SecurityScheme } from '../../types';
import { Toggle, ToggleLabel } from '../../components';
import { SERVERS } from '../../constants';

interface Props {
  servers?: Servers;
  securitySchemes?: Record<string, SecurityScheme>;
  collapse?: CollapseNestedConfig;
}

export const ServersComponent: React.FunctionComponent<Props> = ({
  servers,
  securitySchemes,
  collapse,
}) => {
  if (!servers) {
    return null;
  }
  const className = `servers`;

  const header = <h2>{SERVERS}</h2>;

  const content = (
    <ul className={bemClasses.element(`${className}-list`)}>
      {Object.entries(servers).map(([stage, server]) => (
        <li
          key={stage}
          className={bemClasses.element(`${className}-list-item`)}
        >
          <ServerComponent
            key={`${server.url}${stage}`}
            server={server}
            stage={stage}
            securitySchemes={securitySchemes}
            toggleExpand={collapse && collapse.elements}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className={bemClasses.element(className)}>
      <Toggle
        header={header}
        className={className}
        expanded={collapse && collapse.root}
        label={ToggleLabel.SERVERS}
        toggleInState={true}
      >
        {content}
      </Toggle>
    </section>
  );
};
