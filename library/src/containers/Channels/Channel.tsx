import React from 'react';
import { Channel } from '@asyncapi/parser';

import { OperationComponent } from './Operation';
import { Parameters as ParametersComponent } from './Parameters';

import { Badge, BadgeType, Markdown, Toggle } from '../../components';
import { bemClasses, removeSpecialChars } from '../../helpers';
import { MESSAGE_TEXT, ITEM_LABELS, CONTAINER_LABELS } from '../../constants';
import { PayloadType } from '../../types';

interface Props {
  channelName: string;
  channel: Channel;
  toggleExpand?: boolean;
}

export const ChannelComponent: React.FunctionComponent<Props> = ({
  channelName,
  channel,
  toggleExpand = false,
}) => {
  const className = ITEM_LABELS.CHANNEL;
  const identifier = bemClasses.identifier([
    CONTAINER_LABELS.CHANNELS,
    channelName,
  ]);
  const dataIdentifier = bemClasses.identifier([
    CONTAINER_LABELS.CHANNELS,
    removeSpecialChars(channelName),
  ]);

  const hasPublish = channel.hasPublish();
  const publish = channel.publish();

  const hasSubscribe = channel.hasSubscribe();
  const subscribe = channel.subscribe();

  const message =
    (hasPublish && publish.message()) || (hasSubscribe && subscribe.message());

  const oneOfPublish = hasPublish && publish.hasMultipleMessages();
  const oneOfSubscribe = hasSubscribe && subscribe.hasMultipleMessages();

  const oneOfExists = oneOfPublish || oneOfSubscribe;

  const header = (
    <h3>
      <ul className={bemClasses.element(`${className}-header-badges`)}>
        {hasPublish && (
          <li
            className={bemClasses.element(`${className}-header-publish-badge`)}
          >
            <Badge type={BadgeType.PUBLISH} />
          </li>
        )}
        {hasSubscribe && (
          <li
            className={bemClasses.element(
              `${className}-header-subscribe-badge`,
            )}
          >
            <Badge type={BadgeType.SUBSCRIBE} />
          </li>
        )}
      </ul>
      <span className={bemClasses.element(`${className}-header-title`)}>
        {channelName}
      </span>
    </h3>
  );

  const content = (
    <>
      {channel.hasDescription() && (
        <div className={bemClasses.element(`${className}-description`)}>
          <Markdown>{channel.description()}</Markdown>
        </div>
      )}
      {channel.hasParameters() && (
        <ParametersComponent
          parameters={channel.parameters()}
          identifier={bemClasses.identifier([
            { id: identifier, toKebabCase: false },
            'parameters',
          ])}
          dataIdentifier={bemClasses.identifier([
            { id: dataIdentifier, toKebabCase: false },
            'parameters',
          ])}
        />
      )}
      <div className={bemClasses.element(`${className}-operations`)}>
        {oneOfExists ? null : (
          <header
            className={bemClasses.element(`${className}-operations-header`)}
          >
            <h4>
              <span>{(message && message.uid()) || MESSAGE_TEXT}</span>
            </h4>
          </header>
        )}
        <ul className={bemClasses.element(`${className}-operations-list`)}>
          {hasSubscribe && (
            <li
              className={bemClasses.element(
                `${className}-operations-subscribe`,
              )}
            >
              <OperationComponent
                payloadType={PayloadType.SUBSCRIBE}
                operation={subscribe}
                oneOf={oneOfSubscribe}
                otherOneOf={oneOfPublish}
                isPublish={hasPublish}
                isSubscribe={hasSubscribe}
              />
            </li>
          )}
          {hasPublish && (
            <li
              className={bemClasses.element(`${className}-operations-publish`)}
            >
              <OperationComponent
                payloadType={PayloadType.PUBLISH}
                operation={publish}
                otherOneOf={oneOfSubscribe}
                oneOf={oneOfPublish}
                isPublish={hasPublish}
                isSubscribe={hasSubscribe}
              />
            </li>
          )}
        </ul>
      </div>
    </>
  );

  // const body = (channel.subscribe || channel.publish) && content;

  return (
    <section
      className={bemClasses.element(className)}
      id={identifier}
      data-asyncapi-id={dataIdentifier}
    >
      <Toggle
        header={header}
        className={className}
        expanded={toggleExpand}
        label={ITEM_LABELS.CHANNEL}
        itemName={channelName}
        toggleInState={true}
      >
        {content}
      </Toggle>
    </section>
  );
};
