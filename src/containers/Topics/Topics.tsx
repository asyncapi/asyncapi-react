import React, { Component } from 'react';

import { Header, H2 } from '../../components';

import { Map, Topic } from '../../common';

import { Topics, TopicsHeader } from './styled';

import TopicComponent from './Topic';

export interface TopicsProps {
  baseTopic?: string,
  "x-topic-separator"?: string;
  topics?: Map<string, Topic>;
}

class TopicsComponent extends Component<TopicsProps> {
  private extractTopicName(topicName: string) {
    const separator = this.props['x-topic-separator'] || '.';
    const baseTopic = this.props.baseTopic ? this.props.baseTopic.trim() : "";

    return baseTopic.length ? `${baseTopic}${separator}${topicName}` : topicName;
  }

  public render() {
    const { topics } = this.props;

    return (
      <Topics>
        <TopicsHeader>
          <H2>Topics</H2>
        </TopicsHeader>
        {Object.keys(topics!).map(key => <TopicComponent key={key} title={this.extractTopicName(key)} topic={topics![key]} />)}
      </Topics>
    );
  }
}

export default TopicsComponent;
