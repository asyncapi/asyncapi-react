import React from 'react';

import { Message } from './Message';

import { useSpec } from '../../store';
import { MESSAGES } from '../../constants';

export const Messages: React.FunctionComponent = () => {
  const messages = useSpec().allMessages();

  if (!messages.size) {
    return null;
  }

  return (
    <section id="messages" className="mt-16">
      <h2 className="2xl:w-7/12 text-3xl font-light mb-4 px-8">{MESSAGES}</h2>
      <ul>
        {Array.from(messages).map(([messageName, message], idx) => (
          <li
            className="mb-4"
            key={messageName}
            id={`message-${message.uid()}`}
          >
            <Message message={message} index={idx + 1} key={messageName} />
          </li>
        ))}
      </ul>
    </section>
  );
};
