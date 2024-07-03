import React from 'react';

import { Message } from './Message';

import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { MESSAGES_TEXT } from '../../constants';

export const Messages: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const config = useConfig();
  const messages =
    !asyncapi.components().isEmpty() && asyncapi.components().messages().all();

  if (!messages || messages.length === 0) {
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
        {messages.map((message, idx) => (
          <li
            className="mb-4"
            key={message.id()}
            id={CommonHelpers.getIdentifier(`message-${message.id()}`, config)}
          >
            <Message
              messageName={message.id()}
              message={message}
              index={idx + 1}
              key={message.id()}
              showExamples={config?.show?.messageExamples ?? false}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
