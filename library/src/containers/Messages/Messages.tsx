import React from 'react';

import { Message } from './Message';

import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { MESSAGES_TEXT } from '../../constants';

export const Messages: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const config = useConfig();
  const messages = asyncapi.hasComponents() && asyncapi.components().messages();

  if (!messages || Object.keys(messages).length === 0) {
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
        {Object.entries(messages).map(([messageName, message], idx) => (
          <li
            className="mb-4"
            key={messageName}
            id={`${CommonHelpers.getIdentifier(
              `message-${messageName}`,
              config,
            )}`}
          >
            <Message
              messageName={messageName}
              message={message}
              index={idx + 1}
              key={messageName}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
