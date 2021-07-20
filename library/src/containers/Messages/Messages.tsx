import React from 'react';

import { Message } from './Message';

import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { MESSAGES_TEXT } from '../../constants';

export const Messages: React.FunctionComponent = () => {
  const messages = useSpec().allMessages();
  const config = useConfig();

  if (!messages.size) {
    return null;
  }

  return (
    <section
      id={`${CommonHelpers.getIdentifier('messages', config)}`}
      className="mt-16"
    >
      <h2 className="2xl:w-7/12 text-3xl font-light mb-4 px-8">
        {MESSAGES_TEXT}
      </h2>
      <ul>
        {Array.from(messages).map(([messageName, message], idx) => (
          <li
            className="mb-4"
            key={messageName}
            id={`${CommonHelpers.getIdentifier(
              `message-${message.uid()}`,
              config,
            )}`}
          >
            <Message message={message} index={idx + 1} key={messageName} />
          </li>
        ))}
      </ul>
    </section>
  );
};
