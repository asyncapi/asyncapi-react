import React from 'react';

import { SchemaComponent } from '../Schemas/Schema';
import { PayloadComponent } from './Payload';
import { BindingsComponent } from '../Bindings/Bindings';

import {
  bemClasses,
  removeSpecialChars,
  getExamplesFromSpec,
} from '../../helpers';
import { Message, isRawMessage } from '../../types';

import { Markdown, Badge, BadgeType, Toggle } from '../../components';

import {
  DEPRECATED_TEXT,
  HEADERS_TEXT,
  MESSAGE_HEADERS_TEXT,
  HEADERS_EXAMPLE_TEXT,
  CONTAINER_LABELS,
  ITEM_LABELS,
  MESSAGE_BINDINGS_TEXT,
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
  toggleExpand = false,
  oneOf = false,
}) => {
  if (!message) {
    return null;
  }
  const className = ITEM_LABELS.MESSAGE;
  const messageID =
    title && title.length
      ? bemClasses.identifier([CONTAINER_LABELS.MESSAGES, title])
      : bemClasses.identifier([CONTAINER_LABELS.MESSAGES]);
  const messageDataID =
    title && title.length
      ? bemClasses.identifier([
          CONTAINER_LABELS.MESSAGES,
          removeSpecialChars(title),
        ])
      : bemClasses.identifier([CONTAINER_LABELS.MESSAGES]);

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

  title = title || message.title || message.name;
  const examples = message.examples;

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

  const header = !(title || summary) ? null : (
    <section className={bemClasses.element(`${className}-header`)}>
      {message.deprecated && (
        <div
          className={bemClasses.element(`${className}-header-deprecated-badge`)}
        >
          <Badge type={BadgeType.DEPRECATED}>{DEPRECATED_TEXT}</Badge>
        </div>
      )}
      {title ? (
        <header className={bemClasses.element(`${className}-header-title`)}>
          <h3>{title}</h3>
        </header>
      ) : null}
      <div className={bemClasses.element(`${className}-header-summary`)}>
        {summary}
      </div>
    </section>
  );

  const headersID = !inChannel
    ? bemClasses.identifier([{ id: messageID, toKebabCase: false }, 'headers'])
    : undefined;

  const headers = message.headers && (
    <section
      className={bemClasses.element(`${className}-headers`)}
      id={headersID}
      data-asyncapi-id={headersID}
    >
      <header className={bemClasses.element(`${className}-headers-header`)}>
        <h4>{HEADERS_TEXT}</h4>
      </header>
      <div className={bemClasses.element(`${className}-headers-schema`)}>
        <SchemaComponent
          name={MESSAGE_HEADERS_TEXT}
          schema={message.headers}
          exampleTitle={HEADERS_EXAMPLE_TEXT}
          hideTitle={true}
          examples={examples && getExamplesFromSpec(examples, 'headers')}
        />
      </div>
    </section>
  );

  const payloadID = !inChannel
    ? bemClasses.identifier([{ id: messageID, toKebabCase: false }, 'payload'])
    : undefined;
  const payloadDataID = !inChannel
    ? bemClasses.identifier([
        { id: messageDataID, toKebabCase: false },
        'payload',
      ])
    : undefined;
  const payload = message.payload && (
    <PayloadComponent
      payload={message.payload}
      identifier={payloadID}
      dataIdentifier={payloadDataID}
      examples={examples && getExamplesFromSpec(examples, 'payload')}
    />
  );

  // TAGS IS NOT SUPPORTED YET - please don't remove code!
  // const tags = !hideTags && message.tags && (
  //   <section className={bemClasses.element(`${className}-tags`)}>
  //     <header className={bemClasses.element(`${className}-tags-header`)}>
  //       <h4>{TAGS_TEXT}</h4>
  //     </header>
  //     <ul className={bemClasses.element(`${className}-tags-list`)}>
  //       {message.tags.map(tag => (
  //         <li
  //           key={tag.name}
  //           className={bemClasses.element(`${className}-tags-list-item`)}
  //         >
  //           <Tag>{tag.name}</Tag>
  //         </li>
  //       ))}
  //     </ul>
  //   </section>
  // );

  const content = (
    <>
      {headers}
      {payload}
      {message.bindings && (
        <BindingsComponent
          bindings={message.bindings}
          title={MESSAGE_BINDINGS_TEXT}
        />
      )}
    </>
  );

  const isBody = !!(
    message.description ||
    message.headers ||
    message.payload ||
    (!hideTags && message.tags)
  );

  const identifier = !inChannel ? messageID : undefined;
  const dataIdentifier = !inChannel ? messageDataID : undefined;
  return (
    <section
      className={bemClasses.element(className)}
      id={identifier}
      data-asyncapi-id={dataIdentifier}
    >
      {!inChannel ? (
        <Toggle
          header={header}
          className={className}
          expanded={toggleExpand}
          label={ITEM_LABELS.MESSAGE}
          itemName={title}
          toggleInState={true}
        >
          {!isBody ? null : (
            <>
              {description}
              {content}
            </>
          )}
        </Toggle>
      ) : (
        <>
          {header} {content}
        </>
      )}
    </section>
  );
};
