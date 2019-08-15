import React, { FunctionComponent } from 'react';
// import { StyledChannel, ChannelHeader } from './styled';
import MessageComponent from '../Messages/Message';
import { ChannelItem, Message } from '../../types';
import { Parameters as ParametersComponent } from './Parameters';
import {
  H3,
  H4,
  PublishBadge,
  SubscribeBadge,
  HeaderParagraph,
} from '../../components';
import {
  Topic as TopicWrapper,
  TopicHeader,
  TopicHeaderBadge,
  TopicMessage,
  TopicHeaderMessage,
} from './styled';
import { MessageIndented } from '../Messages/styled';

interface Props {
  name: string;
  channel: ChannelItem;
}

export const Channel: FunctionComponent<Props> = ({ name, channel }) => {
  const oneOf: boolean =
    (channel.publish && (channel.publish as any).oneOf) ||
    ((channel.subscribe && (channel.subscribe as any).oneOf) as boolean);

  return (
    <TopicWrapper>
      <TopicHeader>
        <H3>
          <TopicHeaderBadge>
            {/* {channel.deprecated && <DeprecatedBadge>Deprecated</DeprecatedBadge>} */}
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
      <Publish channel={channel} />
      <Subscribe channel={channel} />
    </TopicWrapper>
  );

  // return (
  // <TopicWrapper>
  //   <TopicHeader>
  //     <H3>
  //       <TopicHeaderBadge>
  //         {channel.deprecated && (
  //           <DeprecatedBadge>Deprecated</DeprecatedBadge>
  //         )}
  //         {channel.publish && <PublishBadge>Publish</PublishBadge>}
  //         {channel.subscribe && <SubscribeBadge>Subscribe</SubscribeBadge>}
  //       </TopicHeaderBadge>
  //       {name}
  //     </H3>
  //   </TopicHeader>
  //   {channel.parameters && <Parameters params={channel.parameters} />}
  //   {/* <TopicHeaderMessage>
  //     <H4>{oneOf ? 'Messages' : 'Message'}</H4>
  //     {oneOf && <HeaderParagraph>
  //         You can send one of the following messages:
  //       </HeaderParagraph>}
  //   </TopicHeaderMessage>
  //   {this.renderPublish()}
  //   {this.renderSubscribe()} */}
  // </TopicWrapper>);
};

interface OperationProps {
  channel: ChannelItem;
}

const Subscribe: FunctionComponent<OperationProps> = ({ channel }) => {
  if (!channel.subscribe) {
    return null;
  }

  const subscribe: any = channel.subscribe;
  if (!(subscribe as any).oneOf) {
    const message: Message = subscribe.message;
    return (
      <TopicMessage>
        <MessageComponent message={message} />
      </TopicMessage>
    );
  }
  const subscribes: Message[] = (subscribe as any).oneOf;

  return (
    <>
      {subscribes.map((sub, index) => (
        <TopicMessage key={index}>
          <TopicHeaderMessage>
            <H4>Message #{index + 1}</H4>
          </TopicHeaderMessage>
          <MessageIndented>
            <MessageComponent message={sub} />
          </MessageIndented>
        </TopicMessage>
      ))}
    </>
  );

  // console.log(channel);
  // return <div>dsfsd</div>;
};

const Publish: FunctionComponent<OperationProps> = ({ channel }) => {
  if (!channel.publish) {
    return null;
  }

  const publish: any = channel.publish;
  if (!(publish as any).oneOf) {
    const message: Message = publish.message;
    return (
      <TopicMessage>
        <MessageComponent message={message} />
      </TopicMessage>
    );
  }
  const publishes: Message[] = (publish as any).oneOf;

  return (
    <>
      {publishes.map((pub, index) => (
        <TopicMessage key={index}>
          <TopicHeaderMessage>
            <H4>Message #{index + 1}</H4>
          </TopicHeaderMessage>
          <MessageIndented>
            <MessageComponent message={pub} />
          </MessageIndented>
        </TopicMessage>
      ))}
    </>
  );
};
