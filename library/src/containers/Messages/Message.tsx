import React from 'react';

import { SchemaComponent } from '../Schemas/Schema';
import { PayloadComponent } from './Payload';

import { bemClasses } from '../../helpers';
import { Message, isRawMessage } from '../../types';

import { Markdown, Tag, Badge, BadgeType, Toggle } from '../../components';

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
  inChannel?: boolean;
  toggleExpand?: boolean;
  oneOf?: boolean;
}

export const MessageComponent: React.FunctionComponent<Props> = ({
  title,
  message,
  hideTags,
  inChannel = false,
  toggleExpand,
  oneOf = false,
}) => {
  if (!message) {
    return null;
  }
  const className = `message`;

  if (!isRawMessage(message)) {
    return (
      <ul className={bemClasses.element(`messages-oneOf-list`)}>
        {message.oneOf.map((elem, index) => (
          <li
            key={index}
            className={bemClasses.element(`messages-oneOf-list-item`)}
          >
            <MessageComponent
              message={elem}
              key={index}
              title={elem.title}
              inChannel={inChannel}
              oneOf={true}
            />
          </li>
        ))}
      </ul>
    );
  }

  const summary = message.summary && (
    <div className={bemClasses.element(`${className}-summary`)}>
      <Markdown>{message.summary}</Markdown>
    </div>
  );

  const description = message.description && (
    <div className={bemClasses.element(`${className}-description`)}>
      <Markdown>{message.description}</Markdown>
    </div>
  );

  const header =
    title || summary ? (
      <h3>
        {message.deprecated && (
          <div
            className={bemClasses.element(
              `${className}-header-deprecated-badge`,
            )}
          >
            <Badge type={BadgeType.DEPRECATED}>{DEPRECATED}</Badge>
          </div>
        )}
        {title ? (
          <span className={bemClasses.element(`${className}-header-title`)}>
            {title}
          </span>
        ) : null}
        <span className={bemClasses.element(`${className}-header-summary`)}>
          {summary}
        </span>
      </h3>
    ) : null;

  const headers = message.headers && (
    <div className={bemClasses.element(`${className}-headers`)}>
      <header className={bemClasses.element(`${className}-headers-header`)}>
        <h4>{HEADERS}</h4>
      </header>
      <div className={bemClasses.element(`${className}-headers-schema`)}>
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
    <div className={bemClasses.element(`${className}-tags`)}>
      <header className={bemClasses.element(`${className}-tags-header`)}>
        <h4>{TAGS_TEXT}</h4>
      </header>
      <ul className={bemClasses.element(`${className}-tags-list`)}>
        {message.tags.map(tag => (
          <li
            key={tag.name}
            className={bemClasses.element(`${className}-tags-list-item`)}
          >
            <Tag>{tag.name}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );

  const content = (
    <>
      {headers}
      {payload}
      {tags}
    </>
  );

  return (
    <section className={bemClasses.element(className)}>
      {!inChannel ? (
        <Toggle
          header={header}
          className={className}
          expanded={toggleExpand}
          toggleInState={true}
        >
          {description}
          {content}
        </Toggle>
      ) : (
        <>{content}</>
      )}
    </section>
  );
};
