import React, { Component } from 'react';

import { Header, H2 } from '../../components';

import { Map, Topic } from '../../common';

export interface TopicsProps {
  baseTopic?: string,
  topics?: Map<string, Topic>;
}

class TopicsComponent extends Component<TopicsProps> {
  render() {
    const { baseTopic, topics } = this.props;

    return (
      <Header>
        <H2>Topics</H2>
      </Header>
    );
  }
}

export default TopicsComponent;
