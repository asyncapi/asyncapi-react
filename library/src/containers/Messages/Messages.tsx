import React from 'react';

import { MessageComponent } from './Message';

import { ExpandNestedConfig } from '../../config';
import { bemClasses } from '../../helpers';
import { Toggle } from '../../components';
import { Message, RawMessage } from '../../types';
import { MESSAGES_TEXT, CONTAINER_LABELS } from '../../constants';

interface Props {
  messages?: Record<string, Message>;
  expand?: ExpandNestedConfig;
  inChannel?: boolean;
}

export const MessagesComponent: React.FunctionComponent<Props> = ({
  messages,
  expand,
  inChannel = false,
}) => {
  if (!messages) {
    return null;
  }
  const className = CONTAINER_LABELS.MESSAGES;
  const messagesLength = Object.keys(messages).length;

  const wrapper = (children: React.ReactNode) => (
    <section
      className={bemClasses.element(className)}
      id={bemClasses.identifier([className])}
    >
      {children}
    </section>
  );
  const header = <h2>{MESSAGES_TEXT}</h2>;
  const content = (
    <ul className={bemClasses.element(`${className}-list`)}>
      {Object.entries(messages).map(([key, message]) => {
        const msg = message as RawMessage;
        let inferredName = (msg['x-parser-message-name'] as string) || '';
        inferredName = inferredName.includes('anonymous-message')
          ? ''
          : inferredName;

        const title =
          messagesLength < 2 && inChannel
            ? ''
            : (message as RawMessage).title ||
              (message as RawMessage).name ||
              inferredName ||
              key;

        return (
          <li
            key={key}
            className={bemClasses.element(`${className}-list-item`)}
          >
            <MessageComponent
              title={title}
              message={message}
              hideTags={true}
              inChannel={false}
              toggleExpand={expand && expand.elements}
            />
          </li>
        );
      })}
    </ul>
  );

  if (inChannel) {
    return wrapper(content);
  }

  return wrapper(
    <Toggle
      header={header}
      className={className}
      expanded={expand && expand.root}
      label={CONTAINER_LABELS.MESSAGES}
      toggleInState={true}
    >
      {content}
    </Toggle>,
  );
};
