import React from 'react';

import { Message } from './Message';

import { useSpec } from '../../contexts';
import { MESSAGES_TEXT } from '../../constants';

export const Messages: React.FunctionComponent = () => {
  const messages = useSpec().allMessages();

  if (!messages.size) {
    return null;
  }

  const header = <h2>{MESSAGES_TEXT}</h2>;
  const messagesList = (
    <ul>
      {Array.from(messages).map(([messageName, message], idx) => (
        <li className="mb-4" key={messageName} id={`message-${message.uid()}`}>
          <Message message={message} index={idx + 1} key={messageName} />
        </li>
      ))}
    </ul>
  );

  return (
    <section id="messages">
      {header}
      {messagesList}
    </section>
  );
};
