import React from 'react';

import { MessageComponent } from './Message';

import { CollapseNestedConfig } from '../../config';
import { bemClasses } from '../../helpers';
import { Toggle } from '../../components';
import { Message } from '../../types';
import { MESSAGES_TEXT } from '../../constants';

interface Props {
  messages?: Record<string, Message>;
  collapse?: CollapseNestedConfig;
  inChannel?: boolean;
}

export const MessagesComponent: React.FunctionComponent<Props> = ({
  messages,
  collapse,
  inChannel = false,
}) => {
  if (!messages) {
    return null;
  }
  const className = `messages`;
  const messagesLength = Object.keys(messages).length;

  const wrapper = (children: React.ReactNode) => (
    <section className={bemClasses.element(className)}>{children}</section>
  );
  const header = <h2>{MESSAGES_TEXT}</h2>;
  const content = (
    <ul className={bemClasses.element(`${className}-list`)}>
      {Object.entries(messages).map(([key, message]) => (
        <li key={key} className={bemClasses.element(`${className}-list-item`)}>
          <MessageComponent
            title={messagesLength < 2 && inChannel ? '' : key}
            message={message}
            hideTags={true}
            inChannel={false}
            toggleExpand={collapse && collapse.elements}
          />
        </li>
      ))}
    </ul>
  );

  if (inChannel) {
    return wrapper(content);
  }

  return wrapper(
    <Toggle
      header={header}
      className={className}
      expanded={collapse && collapse.root}
      toggleInState={true}
    >
      {content}
    </Toggle>,
  );
};
