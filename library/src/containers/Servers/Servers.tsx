import React from 'react';

import { ServerComponent } from './Server';

import { ExpandNestedConfig } from '../../config';
import { bemClasses } from '../../helpers';
import { useSpec } from '../../store';
import { Toggle } from '../../components';
import { SERVERS, CONTAINER_LABELS } from '../../constants';

interface Props {
  expand?: ExpandNestedConfig;
}

export const ServersComponent: React.FunctionComponent<Props> = ({
  expand,
}) => {
  const servers = useSpec().servers();

  if (!Object.keys(servers).length) {
    return null;
  }

  const className = CONTAINER_LABELS.SERVERS;
  const header = <h2>{SERVERS}</h2>;
  const content = (
    <ul className={bemClasses.element(`${className}-list`)}>
      {Object.entries(servers).map(([serverName, server]) => (
        <li
          key={serverName}
          className={bemClasses.element(`${className}-list-item`)}
        >
          <ServerComponent
            key={serverName}
            serverName={serverName}
            server={server}
            toggleExpand={expand && expand.elements}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className={bemClasses.element(className)}
      id={bemClasses.identifier([className])}
    >
      <Toggle
        header={header}
        className={className}
        expanded={expand && expand.root}
        label={CONTAINER_LABELS.SERVERS}
        toggleInState={true}
      >
        {content}
      </Toggle>
    </section>
  );
};
