import React, { Component } from 'react';

import { Message } from '../../types';

import { MessageComponent } from './Message';

import { H2 } from '../../components';
import { Messages, MessagesHeader } from './styled';
import { MESSAGES } from '../../constants';

interface Props {
  messages?: Record<string, Message>;
}

export class MessagesComponent extends Component<Props> {
  render() {
    const { messages } = this.props;

    if (!messages) {
      return null;
    }

    return (
      <Messages>
        <MessagesHeader>
          <H2>{MESSAGES}</H2>
        </MessagesHeader>
        {Object.entries(messages).map(([key, message]) => (
          <MessageComponent
            key={key}
            title={key}
            message={message}
            hideTags={true}
          />
        ))}
      </Messages>
    );
  }
}
