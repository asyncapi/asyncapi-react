import React, { FunctionComponent } from 'react';
import { StyledChannels, ChannelsHeader } from './styled';
import { Channel } from './Channel';
import { H2 } from '../../components';
import { Channels as ChannelsType } from '../../types';
interface Props {
  channels: ChannelsType;
}

export const Channels: FunctionComponent<Props> = ({ channels }) => {
  const channelList = Object.keys(channels).map(key => ({
    name: key,
    data: channels[key],
  }));

  return (
    <StyledChannels>
      <ChannelsHeader>
        <H2>Channels</H2>
      </ChannelsHeader>
      {channelList.map(elem => (
        <Channel name={elem.name} data={elem.data} key={elem.name} />
      ))}
    </StyledChannels>
  );
};
