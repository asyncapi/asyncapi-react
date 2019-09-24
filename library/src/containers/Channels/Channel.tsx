import React from 'react';

import { OperationComponent } from './Operation';
import { Parameters as ParametersComponent } from './Parameters';

import { Badge, BadgeType, Toggle } from '../../components';
import { bemClasses } from '../../helpers';
import { MESSAGE_TEXT, ITEM_LABELS } from '../../constants';
import { Channel, isRawMessage, PayloadType } from '../../types';

interface Props {
  name: string;
  channel: Channel;
  toggleExpand?: boolean;
}

export const ChannelComponent: React.FunctionComponent<Props> = ({
  name,
  channel,
  toggleExpand = false,
}) => {
  const className = `channel`;
  const identifier = bemClasses.identifier([
    className,
    { id: name, toKebabCase: false },
  ]);

  const oneOfPublish =
    channel.publish &&
    channel.publish.message &&
    !isRawMessage(channel.publish.message);

  const oneOfSubscribe =
    channel.subscribe &&
    channel.subscribe.message &&
    !isRawMessage(channel.subscribe.message);

  const oneOfExists = Boolean(oneOfPublish || oneOfSubscribe);

  const header = (
    <h3>
      <ul className={bemClasses.element(`${className}-header-badges`)}>
        {channel.deprecated && (
          <li
            className={bemClasses.element(
              `${className}-header-badges-deprecated-badge`,
            )}
          >
            <Badge type={BadgeType.DEPRECATED} />
          </li>
        )}
        {channel.publish && (
          <li
            className={bemClasses.element(`${className}-header-publish-badge`)}
          >
            <Badge type={BadgeType.PUBLISH} />
          </li>
        )}
        {channel.subscribe && (
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
        {name}
      </span>
    </h3>
  );

  const content = (
    <>
      <ParametersComponent
        parameters={channel.parameters}
        identifier={bemClasses.identifier([
          { id: identifier, toKebabCase: false },
          'parameters',
        ])}
      />
      <div className={bemClasses.element(`${className}-operations`)}>
        {oneOfExists ? null : (
          <header
            className={bemClasses.element(`${className}-operations-header`)}
          >
            <h4>
              <span>{MESSAGE_TEXT}</span>
            </h4>
          </header>
        )}
        <ul className={bemClasses.element(`${className}-operations-list`)}>
          {channel.subscribe && (
            <li
              className={bemClasses.element(
                `${className}-operations-subscribe`,
              )}
            >
              <OperationComponent
                payloadType={PayloadType.SUBSCRIBE}
                operation={channel.subscribe}
                oneOf={oneOfSubscribe}
                otherOneOf={oneOfPublish}
                isPublish={!!channel.publish}
                isSubscribe={!!channel.subscribe}
              />
            </li>
          )}
          {channel.publish && (
            <li
              className={bemClasses.element(`${className}-operations-publish`)}
            >
              <OperationComponent
                payloadType={PayloadType.PUBLISH}
                operation={channel.publish}
                otherOneOf={oneOfSubscribe}
                oneOf={oneOfPublish}
                isPublish={!!channel.publish}
                isSubscribe={!!channel.subscribe}
              />
            </li>
          )}
        </ul>
      </div>
    </>
  );

  const body = (channel.subscribe || channel.publish) && content;

  return (
    <section className={bemClasses.element(className)} id={identifier}>
      <Toggle
        header={header}
        className={className}
        expanded={toggleExpand}
        label={ITEM_LABELS.CHANNEL}
        itemName={name}
        toggleInState={true}
      >
        {body}
      </Toggle>
    </section>
  );
};
