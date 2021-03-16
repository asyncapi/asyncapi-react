import React from 'react';

import { ChannelComponent } from './Channel';

import { ExpandNestedConfig } from '../../config';
import { Toggle } from '../../components';
import { CHANNELS_TEXT, CONTAINER_LABELS } from '../../constants';
import { bemClasses } from '../../helpers';
import { useSpec } from '../../store';
import { Channels } from '../../types';

interface Props {
  channels: Channels;
  expand?: ExpandNestedConfig;
}

export const ChannelsComponent: React.FunctionComponent<Props> = ({
  expand,
}) => {
  const channels = useSpec().channels();

  if (!Object.keys(channels).length) {
    return null;
  }

  const className = CONTAINER_LABELS.CHANNELS;
  const header = <h2>{CHANNELS_TEXT}</h2>;

  const content = (
    <ul className={bemClasses.element(`${className}-list`)}>
      {Object.entries(channels).map(([channelName, channel]) => (
        <li
          key={channelName}
          className={bemClasses.element(`${className}-list-item`)}
        >
          <ChannelComponent
            channelName={channelName}
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
