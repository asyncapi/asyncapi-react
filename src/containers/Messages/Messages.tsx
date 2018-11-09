import React, { Component } from 'react';

import { Header, H2 } from '../../components';

import { Map, Message, Reference } from '../../common';

export interface MessagesProps {
    messages?: Map<string, Message | Reference>;
}

class MessagesComponent extends Component<MessagesProps> {
  render() {
    const { messages } = this.props;

    return (
      <Header>
        <H2>Messages</H2>
      </Header>
    );
  }
}

export default MessagesComponent;
