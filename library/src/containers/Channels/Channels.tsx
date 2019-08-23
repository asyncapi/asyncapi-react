import React, { FunctionComponent } from 'react';
import { StyledChannels, ChannelsHeader } from './styled';
import { Channel } from './Channel';
import { H2 } from '../../components';
import { Channels as ChannelsType } from '../../types';

import { CHANNELS as CHANNELS_TEXT } from '../../constants';
interface Props {
  channels: ChannelsType;
}

export const Channels: FunctionComponent<Props> = ({ channels }) => (
  <StyledChannels>
    <ChannelsHeader>
      <H2>{CHANNELS_TEXT}</H2>
    </ChannelsHeader>
    {Object.entries(channels).map(([name, channel]) => (
      <Channel name={name} channel={channel} key={name} />
    ))}
  </StyledChannels>
);
