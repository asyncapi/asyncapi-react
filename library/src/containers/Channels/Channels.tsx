import React from 'react';

import { Channel } from './Channel';

import { bemClasses } from '../../helpers';
import { Channels as ChannelsType } from '../../types';
import { CHANNELS } from '../../constants';

interface Props {
  channels: ChannelsType;
}

export const Channels: React.FunctionComponent<Props> = ({ channels }) => (
  <div className={bemClasses.element(`channels`)}>
    <header className={bemClasses.element(`channels-header`)}>
      <h2>{CHANNELS}</h2>
    </header>
    <ul className={bemClasses.element(`channels-list`)}>
      {Object.entries(channels).map(([name, channel]) => (
        <li key={name} className={bemClasses.element(`channels-list-item`)}>
          <Channel name={name} channel={channel} />
        </li>
      ))}
    </ul>
  </div>
);
