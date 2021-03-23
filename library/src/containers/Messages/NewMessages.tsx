import React from 'react';

import { MessageComponent } from './NewMessage';
import { Toggle } from '../../components';

import { bemClasses } from '../../helpers';
import { useSpec } from '../../store';
import { CONTAINER_LABELS, MESSAGES_TEXT } from '../../constants';

export const MessagesComponent: React.FunctionComponent = () => {
  const messages = useSpec().allMessages();

  if (!messages.size) {
    return null;
  }

  const className = CONTAINER_LABELS.SCHEMAS;
  const header = <h2>{MESSAGES_TEXT}</h2>;

  const messagesList = (
    <ul>
      {Array.from(messages).map(([key, msg]) => {
        return (
          <li key={key}>
            <MessageComponent message={msg} />
          </li>
        );
      })}
    </ul>
  );

  return (
    <section
      className={bemClasses.element(className)}
      id={bemClasses.identifier([className])}
    >
      <Toggle
        header={header}
        className={className}
        expanded={true}
        // expanded={expand && expand.root}
        label={CONTAINER_LABELS.SCHEMAS}
        toggleInState={true}
      >
        <div className="all-messages pb-8">{messagesList}</div>
      </Toggle>
    </section>
  );
};
