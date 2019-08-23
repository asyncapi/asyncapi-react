import React, { FunctionComponent } from 'react';
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

import { ONE_OF_FOLLOWING_MESSAGES } from '../../constants';
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
    !isRawMessage(channel.publish.message);

  const oneOfSubscribe =
    channel.subscribe &&
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
          <HeaderParagraph>{ONE_OF_FOLLOWING_MESSAGES}</HeaderParagraph>
        )}
      </TopicHeaderMessage>
      <Operation operation={channel.subscribe} />
      <Operation operation={channel.publish} />
    </TopicWrapper>
  );
};
