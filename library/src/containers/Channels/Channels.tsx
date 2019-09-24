import React from 'react';

import { ChannelComponent } from './Channel';

import { ExpandNestedConfig } from '../../config';
import { bemClasses } from '../../helpers';
import { Channels } from '../../types';
import { Toggle } from '../../components';
import { CHANNELS_TEXT, CONTAINER_LABELS } from '../../constants';

interface Props {
  channels: Channels;
  expand?: ExpandNestedConfig;
}

export const ChannelsComponent: React.FunctionComponent<Props> = ({
  channels,
  expand,
}) => {
  const className = `channels`;

  const header = <h2>{CHANNELS_TEXT}</h2>;

  const content = (
    <ul className={bemClasses.element(`${className}-list`)}>
      {Object.entries(channels).map(([name, channel]) => (
        <li key={name} className={bemClasses.element(`${className}-list-item`)}>
          <ChannelComponent
            name={name}
            channel={channel}
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
        label={CONTAINER_LABELS.CHANNELS}
        toggleInState={true}
      >
        {content}
      </Toggle>
    </section>
  );
};
