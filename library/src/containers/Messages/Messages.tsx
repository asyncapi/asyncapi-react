import React from 'react';

import { Message } from './Message';
import { Toggle } from '../../components';

import { bemClasses } from '../../helpers';
import { useSpec } from '../../store';
import { CONTAINER_LABELS, MESSAGES_TEXT } from '../../constants';

export const Messages: React.FunctionComponent = () => {
  const messages = useSpec().allMessages();

  if (!messages.size) {
    return null;
  }

  const className = CONTAINER_LABELS.SCHEMAS;
  const header = <h2>{MESSAGES_TEXT}</h2>;

  const messagesList = (
    <ul>
      {Array.from(messages).map(([key, msg], idx) => (
        <li key={key}>
          <Message message={msg} index={idx + 1} key={idx} />
        </li>
      ))}
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
        label={CONTAINER_LABELS.MESSAGES}
        toggleInState={true}
      >
        <div className="all-messages pb-8">{messagesList}</div>
      </Toggle>
    </section>
  );
};
