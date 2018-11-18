import React, { Component } from 'react';

import { H3, H4, HeaderParagraph, PublishBadge, SubscribeBadge, DeprecatedBadge } from '../../components';
import { Topic, Message } from '../../common';
import { Topic as TopicWrapper, TopicHeader, TopicHeaderBadge, TopicMessage, TopicHeaderMessage } from './styled';
import { MessageIndented } from '../Messages/styled';

import ParametersComponent from './Parameters';
import MessageComponent from '../Messages/Message';

interface Props {
  title: string,
  topic: Topic,
}

class TopicComponent extends Component<Props> {
  private renderPublish() {
    const { topic } = this.props

    if (!topic.publish) return null;

    const publish = topic.publish
    if (!(publish as any).oneOf) {
      return <TopicMessage><MessageComponent message={publish as Message} /></TopicMessage>
    } else {
      const publishes: Message[] = (publish as any).oneOf;

      return publishes.map((pub, index) => (
        <TopicMessage key={index}>
          <TopicHeaderMessage>
            <H4>Message #{index + 1}</H4>
          </TopicHeaderMessage>
          <MessageIndented>
            <MessageComponent message={pub} />
          </MessageIndented>
        </TopicMessage>
      ))
    }
  }

  private renderSubscribe() {
    const { topic } = this.props

    if (!topic.subscribe) return null;

    const subscribe = topic.subscribe
    if (!(subscribe as any).oneOf) {
      return <TopicMessage><MessageComponent message={subscribe as Message} /></TopicMessage>
    } else {
      const subscribes: Message[] = (subscribe as any).oneOf;

      return subscribes.map((sub, index) => (
        <TopicMessage key={index}>
          <TopicHeaderMessage>
            <H4>Message #{index + 1}</H4>
          </TopicHeaderMessage>
          <MessageIndented>
            <MessageComponent message={sub} />
          </MessageIndented>
        </TopicMessage>
      ))
    }
  }

  render() {
    const { title, topic } = this.props;

    const oneOf: boolean =  (topic.publish && (topic.publish as any).oneOf) || (topic.subscribe && (topic.subscribe as any).oneOf) as boolean;

    return (
      <TopicWrapper>
        <TopicHeader>
          <H3>
            <TopicHeaderBadge>
              {topic.deprecated && <DeprecatedBadge>Deprecated</DeprecatedBadge>}
              {topic.publish && <PublishBadge>Publish</PublishBadge>}
              {topic.subscribe && <SubscribeBadge>Subscribe</SubscribeBadge>}
            </TopicHeaderBadge>
            {title}
          </H3>
        </TopicHeader>
        <ParametersComponent parameters={topic.parameters} />
        <TopicHeaderMessage>
          <H4>{oneOf ? "Messages" : "Message"}</H4>
          {oneOf && <HeaderParagraph>You can send one of the following messages:</HeaderParagraph>}
        </TopicHeaderMessage>
        {this.renderPublish()}
        {this.renderSubscribe()}
      </TopicWrapper>
    );
  }
}

export default TopicComponent;
