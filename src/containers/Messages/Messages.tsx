import React, { Component } from 'react';

import { Header, H2 } from '../../components';

import { Map, Message, Reference } from '../../common';

import { Messages, MessagesHeader } from './styled';

import MessageComponent from './Message';

export interface MessagesProps {
  messages?: Map<string, Message>;
}

class MessagesComponent extends Component<MessagesProps> {
  public render() {
    const { messages } = this.props;

    return (
      <Messages>
        <MessagesHeader>
          <H2>Messages</H2>
        </MessagesHeader>
        {Object.keys(messages!).map(key => <MessageComponent key={key} title={key} message={messages![key]} hideTags={true} />)}
      </Messages>
    );
  }
}

export default MessagesComponent;
