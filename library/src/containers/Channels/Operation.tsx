import React from 'react';
import { Operation, Message } from '@asyncapi/parser';

import { MessagesComponent } from '../Messages/Messages';
import { MessageComponent } from '../Messages/Message';

import { bemClasses } from '../../helpers';
import { Badge, BadgeType, Markdown } from '../../components';
import { PayloadType } from '../../types';
import {
  ONE_OF_FOLLOWING_MESSAGES_PUBLISH_TEXT,
  ONE_OF_FOLLOWING_MESSAGES_SUBSCRIBE_TEXT,
} from '../../constants';

interface Props {
  payloadType?: PayloadType;
  operation: Operation;
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
  const className = `channel-operation`;

  const description = operation.hasDescription() && (
    <div className={bemClasses.element(`${className}-description`)}>
      <Markdown>{operation.description()}</Markdown>
    </div>
  );

  if (oneOf || otherOneOf) {
    let messages: Record<string, Message> = {};
    if (oneOf && operation.hasMultipleMessages()) {
      messages = operation
        .messages()
        .map((message, index) => ({ [`${index}`]: message }))
        .reduce((obj, item) => Object.assign(obj, item), {});
    }
    if (!oneOf && otherOneOf) {
      messages = {
        0: operation.message(),
      };
    }

    if (!Object.keys(messages).length) {
      return null;
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
        {description}
        <MessagesComponent messages={messages} inChannel={true} />
      </section>
    );
  }

  return (
    <section className={bemClasses.element(className)}>
      {description}
      <MessageComponent message={operation.message()} inChannel={true} />
    </section>
  );
};
