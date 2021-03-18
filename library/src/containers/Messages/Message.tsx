import React from 'react';
import { Message } from '@asyncapi/parser';

import { SchemaComponent } from '../Schemas/Schema';
import { PayloadComponent } from './Payload';

import {
  bemClasses,
  removeSpecialChars,
  getExamplesFromSpec,
} from '../../helpers';

import { Markdown, Toggle } from '../../components';

import {
  HEADERS_TEXT,
  MESSAGE_HEADERS_TEXT,
  HEADERS_EXAMPLE_TEXT,
  CONTAINER_LABELS,
  ITEM_LABELS,
} from '../../constants';

interface Props {
  title?: string;
  message?: Message;
  messages?: Message[];
  hideTags?: boolean;
  inChannel?: boolean;
  toggleExpand?: boolean;
  oneOf?: boolean;
}

export const MessageComponent: React.FunctionComponent<Props> = ({
  title,
  message,
  messages,
  inChannel = false,
  toggleExpand = false,
  oneOf = false,
}) => {
  if (messages) {
    return (
      <ul className={bemClasses.element(`messages-oneOf-list`)}>
        {messages.map((msg, index) => (
          <li
            key={index}
            className={bemClasses.element(`messages-oneOf-list-item`)}
          >
            <MessageComponent
              message={msg}
              key={index}
              title={msg.title()}
              inChannel={inChannel}
              oneOf={true}
            />
          </li>
        ))}
      </ul>
    );
  }

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

  title = title || message.uid();
  const examples = message.examples();

  const summary = message.summary() && (
    <div className={bemClasses.element(`${className}-summary`)}>
      <Markdown>{message.summary()}</Markdown>
    </div>
  );

  const description = message.hasDescription() && (
    <div className={bemClasses.element(`${className}-description`)}>
      <Markdown>{message.description()}</Markdown>
    </div>
  );

  const header = (title || summary) && (
    <h3>
      {title && (
        <span className={bemClasses.element(`${className}-header-title`)}>
          {title}
        </span>
      )}
      {summary && (
        <span className={bemClasses.element(`${className}-header-summary`)}>
          {summary}
        </span>
      )}
    </h3>
  );

  const headersID = !inChannel
    ? bemClasses.identifier([{ id: messageID, toKebabCase: false }, 'headers'])
    : undefined;

  const headers = message.headers() && (
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
          schema={message.headers().json()}
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

  const payload = message.payload() && (
    <PayloadComponent
      payload={message.payload()}
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
    </>
  );

  const isBody = !!(
    message.hasDescription() ||
    message.headers() ||
    message.payload()
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
        <>{content}</>
      )}
    </section>
  );
};
