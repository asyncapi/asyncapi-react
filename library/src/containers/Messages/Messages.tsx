import React, { Component } from 'react';

import { Message } from '../../types';

import MessageComponent from './Message';

import { H2 } from '../../components';
import { Messages, MessagesHeader } from './styled';

interface Props {
  messages?: Record<string, Message>;
}

class MessagesComponent extends Component<Props> {
  render() {
    const { messages } = this.props;

    if (!messages) {
      return null;
    }

    // console.log(messages);

    return (
      <Messages>
        <MessagesHeader>
          <H2>Messages</H2>
        </MessagesHeader>
        {Object.keys(messages).map(key => (
          <MessageComponent
            key={key}
            title={key}
            message={messages![key]}
            hideTags={true}
          />
        ))}
      </Messages>
    );
  }
}

export default MessagesComponent;
