import React from 'react';

import { MessagesComponent } from '../Messages/Messages';
import { MessageComponent } from '../Messages/Message';

import { bemClasses } from '../../helpers';
import { Badge, BadgeType } from '../../components';
import {
  Operation,
  PayloadType,
  OneOf,
  RawMessage,
  Message,
} from '../../types';
import {
  ONE_OF_FOLLOWING_MESSAGES_PUBLISH,
  ONE_OF_FOLLOWING_MESSAGES_SUBSCRIBE,
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
  if (oneOf) {
    messages = (operation.message as Record<OneOf, RawMessage[]>).oneOf
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
                ? ONE_OF_FOLLOWING_MESSAGES_PUBLISH
                : ONE_OF_FOLLOWING_MESSAGES_SUBSCRIBE}
            </span>
          </h4>
        </header>
        <MessagesComponent messages={messages} inChannel={true} />
      </section>
    );
  }

  return (
    <section className={bemClasses.element(className)}>
      <MessageComponent message={operation.message} inChannel={true} />
    </section>
  );
};
