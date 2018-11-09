import React, { Component } from 'react';

import { Header, H2 } from '../../components';

import { Map, Message, Reference } from '../../common';

import MessageComponent from './Message';

export interface MessagesProps {
    messages?: Map<string, Message | Reference>;
}

class MessagesComponent extends Component<MessagesProps> {
  public render() {
    const { messages } = this.props;

    return (
      <>
        <Header>
          <H2>Messages</H2>
        </Header>
        {Object.keys(messages!).map(key => <MessageComponent key={key} title={key} message={messages![key] as Message} />)}
      </>
    );
  }
}

export default MessagesComponent;
