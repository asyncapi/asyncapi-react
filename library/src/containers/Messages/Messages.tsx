import React from 'react';

import { Message } from './Message';

import { useSpec } from '../../contexts';
import { MESSAGES_TEXT } from '../../constants';

export const Messages: React.FunctionComponent = () => {
  const messages = useSpec().allMessages();

  if (!messages.size) {
    return null;
  }

  return (
    <section id="messages" className="aui-mt-16">
      <h2 className="2xl:aui-w-7/12 aui-text-3xl aui-font-light aui-mb-4 aui-px-8">
        {MESSAGES_TEXT}
      </h2>
      <ul>
        {Array.from(messages).map(([messageName, message], idx) => (
          <li
            className="aui-mb-4"
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
