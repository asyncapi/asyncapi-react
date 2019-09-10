import React from 'react';

import { ChannelComponent } from './Channel';

import { CollapseNestedConfig } from '../../config';
import { bemClasses } from '../../helpers';
import { Channels } from '../../types';
import { Toggle, ToggleLabel } from '../../components';
import { CHANNELS_TEXT } from '../../constants';

interface Props {
  channels: Channels;
  collapse?: CollapseNestedConfig;
}

export const ChannelsComponent: React.FunctionComponent<Props> = ({
  channels,
  collapse,
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
        label={ToggleLabel.CHANNELS}
        toggleInState={true}
      >
        {content}
      </Toggle>
    </section>
  );
};
