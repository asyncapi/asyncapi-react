import React, { FunctionComponent } from 'react';
// import { StyledChannel, ChannelHeader } from './styled';
import { Operation } from './Operation';
import { ChannelItem, isRawMessage } from '../../types';
import { Parameters as ParametersComponent } from './Parameters';
import {
  H3,
  H4,
  PublishBadge,
  SubscribeBadge,
  HeaderParagraph,
  DeprecatedBadge,
} from '../../components';
import {
  Topic as TopicWrapper,
  TopicHeader,
  TopicHeaderBadge,
  TopicHeaderMessage,
} from './styled';

interface Props {
  name: string;
  channel: ChannelItem;
}

export const Channel: FunctionComponent<Props> = ({ name, channel }) => {
  const oneOfPublish =
    channel.publish &&
    channel.publish.message &&
    channel.publish.message &&
    !isRawMessage(channel.publish.message);

  const oneOfSubscribe =
    channel.subscribe &&
    channel.subscribe.message &&
    channel.subscribe.message &&
    !isRawMessage(channel.subscribe.message);

  const oneOf = Boolean(oneOfPublish || oneOfSubscribe);

  return (
    <TopicWrapper>
      <TopicHeader>
        <H3>
          <TopicHeaderBadge>
            {channel.deprecated && (
              <DeprecatedBadge>Deprecated</DeprecatedBadge>
            )}
            {channel.publish && <PublishBadge>Publish</PublishBadge>}
            {channel.subscribe && <SubscribeBadge>Subscribe</SubscribeBadge>}
          </TopicHeaderBadge>
          {name}
        </H3>
      </TopicHeader>
      <ParametersComponent params={channel.parameters} />
      <TopicHeaderMessage>
        <H4>{oneOf ? 'Messages' : 'Message'}</H4>
        {oneOf && (
          <HeaderParagraph>
            You can send one of the following messages:
          </HeaderParagraph>
        )}
      </TopicHeaderMessage>
      <Operation operation={channel.subscribe} />
      <Operation operation={channel.publish} />
    </TopicWrapper>
  );
};
