import React from 'react';

import { SchemaComponent } from '../Schemas/Schema';
import { PayloadComponent } from './Payload';

import { bemClasses } from '../../helpers';
import { Message, isRawMessage } from '../../types';

import { Markdown, Tag, Badge, BadgeType } from '../../components';

import {
  DEPRECATED,
  HEADERS,
  MESSAGE_HEADERS,
  HEADERS_EXAMPLE,
  TAGS_TEXT,
} from '../../constants';

interface Props {
  title?: string;
  message: Message;
  hideTags?: boolean;
}

export const MessageComponent: React.FunctionComponent<Props> = ({
  title,
  message,
  hideTags,
}) => {
  if (!message) {
    return null;
  }

  if (!isRawMessage(message)) {
    return (
      <ul className={bemClasses.element(`messages-oneOf-list`)}>
        {message.oneOf.map((elem, index) => (
          <li
            key={index}
            className={bemClasses.element(`messages-oneOf-list-item`)}
          >
            <MessageComponent message={elem} key={index} />
          </li>
        ))}
      </ul>
    );
  }

  const summary = message.summary && (
    <div className={bemClasses.element(`message-summary`)}>
      <Markdown>{message.summary}</Markdown>
    </div>
  );

  const description = message.description && (
    <div className={bemClasses.element(`message-description`)}>
      <Markdown>{message.description}</Markdown>
    </div>
  );

  const header = (
    <header className={bemClasses.element(`message-header`)}>
      {title ? (
        <h3>
          <span className={bemClasses.element(`message-title`)}>{title}</span>
          {message.deprecated && (
            <Badge type={BadgeType.DEPRECATED}>{DEPRECATED}</Badge>
          )}
        </h3>
      ) : null}
      {summary}
      {description}
    </header>
  );

  const headers = message.headers && (
    <div className={bemClasses.element(`message-headers`)}>
      <header className={bemClasses.element(`message-headers-header`)}>
        <h4>{HEADERS}</h4>
      </header>
      <div className={bemClasses.element(`message-schema`)}>
        <SchemaComponent
          name={MESSAGE_HEADERS}
          schema={message.headers}
          exampleTitle={HEADERS_EXAMPLE}
          hideTitle={true}
        />
      </div>
    </div>
  );

  const payload = message.payload && (
    <PayloadComponent payload={message.payload} />
  );

  const tags = !hideTags && message.tags && (
    <div className={bemClasses.element(`message-tags`)}>
      <header className={bemClasses.element(`message-tags-header`)}>
        <h4>{TAGS_TEXT}</h4>
      </header>
      <ul className={bemClasses.element(`message-tags-list`)}>
        {message.tags.map(tag => (
          <li
            key={tag.name}
            className={bemClasses.element(`message-tags-list-item`)}
          >
            <Tag>{tag.name}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={bemClasses.element(`message`)}>
      {header}
      {headers}
      {payload}
      {tags}
    </div>
  );
};
