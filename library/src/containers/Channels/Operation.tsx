import React from 'react';

import { MessagesComponent } from '../Messages/Messages';
import { MessageComponent } from '../Messages/Message';
import { BindingsComponent } from '../Bindings/Bindings';

import { bemClasses } from '../../helpers';
import { Badge, BadgeType, Markdown } from '../../components';
import { Operation, PayloadType, Message, isRawMessage } from '../../types';
import {
  ONE_OF_FOLLOWING_MESSAGES_PUBLISH_TEXT,
  ONE_OF_FOLLOWING_MESSAGES_SUBSCRIBE_TEXT,
  ONE_OF_FOLLOWING_MESSAGES_PUBLISH_SINGLE_TEXT,
  ONE_OF_FOLLOWING_MESSAGES_SUBSCRIBE_SINGLE_TEXT,
  OPERATION_BINDINGS_TEXT,
} from '../../constants';

interface Props {
  payloadType?: PayloadType;
  operation?: Operation;
  oneOf?: boolean;
  otherOneOf?: boolean;
  isPublish?: boolean;
  isSubscribe?: boolean;
}

export const OperationComponent: React.FunctionComponent<Props> = ({
  payloadType = PayloadType.PUBLISH,
  operation,
  oneOf = false,
  otherOneOf = false,
  isPublish = false,
  isSubscribe = false,
}) => {
  if (!operation || !operation.message) {
    return null;
  }
  const className = `channel-operation`;

  let messages: Record<string, Message> = {};
  if (oneOf && !isRawMessage(operation.message)) {
    messages = operation.message.oneOf
      .map((message, index) => ({ [index.toString()]: message }))
      .reduce((obj, item) => Object.assign(obj, item), {});
  }
  if (!oneOf && otherOneOf) {
    messages = {
      0: operation.message,
    };
  }

  if (oneOf || otherOneOf) {
    return (
      <section
        className={bemClasses.element(`${className}-oneOf-${payloadType}`)}
      >
        <header
          className={bemClasses.element(
            `${className}-oneOf-${payloadType}-header`,
          )}
        >
          <h4>
            {isPublish && isSubscribe ? (
              <Badge
                type={
                  payloadType === PayloadType.PUBLISH
                    ? BadgeType.PUBLISH
                    : BadgeType.SUBSCRIBE
                }
              />
            ) : null}
            <span>
              {payloadType === PayloadType.PUBLISH
                ? ONE_OF_FOLLOWING_MESSAGES_PUBLISH_TEXT
                : ONE_OF_FOLLOWING_MESSAGES_SUBSCRIBE_TEXT}
            </span>
          </h4>
        </header>
        {operation.summary && (
          <div className={bemClasses.element(`${className}-description`)}>
            <Markdown>{operation.summary}</Markdown>
          </div>
        )}
        {operation.description && (
          <div className={bemClasses.element(`${className}-description`)}>
            <Markdown>{operation.description}</Markdown>
          </div>
        )}
        {operation.bindings && (
          <BindingsComponent
            bindings={operation.bindings}
            title={OPERATION_BINDINGS_TEXT}
          />
        )}
        <MessagesComponent messages={messages} inChannel={true} />
      </section>
    );
  }

  return (
    <section
      className={bemClasses.element(`${className}-oneOf-${payloadType}`)}
    >
      <header
        className={bemClasses.element(
          `${className}-oneOf-${payloadType}-header`,
        )}
      >
        <h3>
          {isPublish && isSubscribe ? (
            <Badge
              type={
                payloadType === PayloadType.PUBLISH
                  ? BadgeType.PUBLISH
                  : BadgeType.SUBSCRIBE
              }
            />
          ) : null}
          <span>
            {payloadType === PayloadType.PUBLISH
              ? ONE_OF_FOLLOWING_MESSAGES_PUBLISH_SINGLE_TEXT
              : ONE_OF_FOLLOWING_MESSAGES_SUBSCRIBE_SINGLE_TEXT}
          </span>
        </h3>
      </header>
      {operation.summary && (
        <div className={bemClasses.element(`${className}-description`)}>
          <Markdown>{operation.summary}</Markdown>
        </div>
      )}
      {operation.description && (
        <div className={bemClasses.element(`${className}-description`)}>
          <Markdown>{operation.description}</Markdown>
        </div>
      )}
      {operation.bindings && (
        <BindingsComponent
          bindings={operation.bindings}
          title={OPERATION_BINDINGS_TEXT}
        />
      )}
      <MessageComponent message={operation.message} inChannel={true} />
    </section>
  );
};
