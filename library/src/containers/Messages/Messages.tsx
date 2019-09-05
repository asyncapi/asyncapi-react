import React from 'react';

import { MessageComponent } from './Message';

import { bemClasses } from '../../helpers';
import { Message } from '../../types';
import { MESSAGES } from '../../constants';

interface Props {
  messages?: Record<string, Message>;
}

export const MessagesComponent: React.FunctionComponent<Props> = ({
  messages,
}) => {
  if (!messages) {
    return null;
  }

  return (
    <div className={bemClasses.element(`messages`)}>
      <header className={bemClasses.element(`messages-header`)}>
        <h2>{MESSAGES}</h2>
      </header>
      <ul className={bemClasses.element(`messages-list`)}>
        {Object.entries(messages).map(([key, message]) => (
          <li key={key} className={bemClasses.element(`messages-list-item`)}>
            <MessageComponent title={key} message={message} hideTags={true} />
          </li>
        ))}
      </ul>
    </div>
  );
};
