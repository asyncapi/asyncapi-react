import React from 'react';
import { Message } from '@asyncapi/parser';

import { MessageComponent } from './Message';

import { ExpandNestedConfig } from '../../config';
import { bemClasses } from '../../helpers';
import { Toggle } from '../../components';
import { MESSAGES_TEXT, CONTAINER_LABELS } from '../../constants';
import { useSpec } from '../../store';

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
  const asyncapi = useSpec();
  messages =
    messages ||
    Array.from(asyncapi.allMessages()).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  if (!messages || !Object.keys(messages).length) {
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
      {Object.entries(messages).map(([key, msg]) => {
        // check it without `.uid()` function
        let name = msg.uid();
        name = name.includes('anonymous-message') ? '' : name;

        const title = messagesLength < 2 && inChannel ? '' : name || `${key}`;

        return (
          <li
            key={key}
            className={bemClasses.element(`${className}-list-item`)}
          >
            <MessageComponent
              title={title}
              message={msg}
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
