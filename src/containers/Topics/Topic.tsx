import React, { Component } from 'react';

import { Header, H3, H4, HeaderParagraph, Table, TableColumn, PublishBadge, SubscribeBadge, DeprecatedBadge } from '../../components';

import { Map, Topic, Message, Schema } from '../../common';

import { Topic as TopicWrapper, TopicHeader, TopicHeaderBadge, TopicMessage, TopicHeaderMessage } from './styled';

import { MessageIndented } from '../Messages/styled';

import ParametersComponent from './Parameters';
import MessageComponent from '../Messages/Message';

export interface TopicProps {
  title: string,
  topic: Topic,
}

class TopicComponent extends Component<TopicProps> {
  private renderPublish() {
    const { topic } = this.props

    if (topic.subscribe) {
      const subscribe = topic.subscribe
      if ((subscribe as any).oneOf) {
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
      } else {
        return <TopicMessage><MessageComponent message={subscribe as Message} /></TopicMessage>
      }
    }
    return null;
  }

  private renderSubscribe() {
    const { topic } = this.props

    if (topic.publish) {
      const publish = topic.publish
      if ((publish as any).oneOf) {
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
      } else {
        return <TopicMessage><MessageComponent message={publish as Message} /></TopicMessage>
      }
    }
    return null;
  }

  public render() {
    const { title, topic } = this.props;

    const oneOf: boolean =  (topic.publish && (topic.publish as any).oneOf) || (topic.subscribe && (topic.subscribe as any).oneOf) as boolean;

    return (
      <TopicWrapper>
        <TopicHeader>
          <H3>
            <TopicHeaderBadge>
              {topic.deprecated ? <DeprecatedBadge>Deprecated</DeprecatedBadge> : ""}
              {topic.publish ? <PublishBadge>Publish</PublishBadge> : ""}
              {topic.subscribe ? <SubscribeBadge>Subscribe</SubscribeBadge> : ""}
            </TopicHeaderBadge>
            {title}
          </H3>
        </TopicHeader>
        <ParametersComponent parameters={topic.parameters} />
        <TopicHeaderMessage>
          <H4>{oneOf ? "Messages" : "Message"}</H4>
          {oneOf ? <HeaderParagraph>You can send one of the following messages:</HeaderParagraph> : null}
        </TopicHeaderMessage>
        {this.renderPublish()}
        {this.renderSubscribe()}
      </TopicWrapper>
    );
  }
}

export default TopicComponent;
