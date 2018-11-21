import React, { Component } from 'react';

import { Map, Topic } from '../../types';

import TopicComponent from './Topic';

import { H2 } from '../../components';
import { Topics, TopicsHeader } from './styled';

interface Props {
  baseTopic?: string,
  "x-topic-separator"?: string;
  topics?: Map<string, Topic>;
}

class TopicsComponent extends Component<Props> {
  private extractTopicName(topicName: string) {
    const separator = this.props['x-topic-separator'] || '.';
    const baseTopic = this.props.baseTopic ? this.props.baseTopic.trim() : "";

    return baseTopic.length ? `${baseTopic}${separator}${topicName}` : topicName;
  }

  render() {
    const { topics } = this.props;

    if (!topics) return null;

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
