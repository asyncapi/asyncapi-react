import React, { FunctionComponent } from 'react';
// import { StyledChannel, ChannelHeader } from './styled';

import { ChannelItem } from '../../types';
import { Parameters } from './Parameters';
import {
  H3,
  // H4,
  // HeaderParagraph,
  PublishBadge,
  SubscribeBadge,
  DeprecatedBadge,
} from '../../components';
import {
  Topic as TopicWrapper,
  TopicHeader,
  TopicHeaderBadge,
  // TopicMessage,
  // TopicHeaderMessage,
} from './styled';
// import { MessageIndented } from '../Messages/styled';

interface Props {
  name: string;
  data: ChannelItem;
}

export const Channel: FunctionComponent<Props> = ({ name, data }) => {
  // return (
  //   <StyledChannel>
  //     <ChannelHeader>
  //       <H4>{name}</H4>
  //     </ChannelHeader>
  //     {data.description ? <p>{data.description}</p> : null}
  //     {data.deprecated ? <p>Deprecated</p> : null}
  //     {data.parameters && <Parameters params={data.parameters} />}
  //   </StyledChannel>
  // );
  return (
    <TopicWrapper>
      <TopicHeader>
        <H3>
          <TopicHeaderBadge>
            {data.deprecated && <DeprecatedBadge>Deprecated</DeprecatedBadge>}
            {data.publish && <PublishBadge>Publish</PublishBadge>}
            {data.subscribe && <SubscribeBadge>Subscribe</SubscribeBadge>}
          </TopicHeaderBadge>
          {name}
        </H3>
      </TopicHeader>
      {data.parameters && <Parameters params={data.parameters} />}
      {/* <TopicHeaderMessage>
        <H4>{oneOf ? 'Messages' : 'Message'}</H4>
        {oneOf && <HeaderParagraph>
            You can send one of the following messages:
          </HeaderParagraph>}
      </TopicHeaderMessage>
      {this.renderPublish()}
      {this.renderSubscribe()} */}
    </TopicWrapper>
  );
};
