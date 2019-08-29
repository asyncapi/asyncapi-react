import React from 'react';

import { Operation } from './Operation';
import { ChannelItem, isRawMessage } from '../../types';
import { Parameters as ParametersComponent } from './Parameters';

import { Badge, BadgeType } from '../../components';
import { bemClasses } from '../../helpers';
import { ONE_OF_FOLLOWING_MESSAGES, MESSAGE, MESSAGES } from '../../constants';

interface Props {
  name: string;
  channel: ChannelItem;
}

export const Channel: React.FunctionComponent<Props> = ({ name, channel }) => {
  const oneOfPublish =
    channel.publish &&
    channel.publish.message &&
    !isRawMessage(channel.publish.message);

  const oneOfSubscribe =
    channel.subscribe &&
    channel.subscribe.message &&
    !isRawMessage(channel.subscribe.message);

  const oneOf = Boolean(oneOfPublish || oneOfSubscribe);

  return (
    <div className={bemClasses.element(`channel`)}>
      <header className={bemClasses.element(`channel-header`)}>
        <h3>
          <div className={bemClasses.element(`channel-badges`)}>
            {channel.deprecated && <Badge type={BadgeType.DEPRECATED} />}
            {channel.publish && <Badge type={BadgeType.PUBLISH} />}
            {channel.subscribe && <Badge type={BadgeType.SUBSCRIBE} />}
          </div>
          <span className={bemClasses.element(`channel-title`)}>{name}</span>
        </h3>
      </header>
      <div className={bemClasses.element(`channel-operations`)}>
        <ParametersComponent parameters={channel.parameters} />
      </div>
      <div className={bemClasses.element(`channel-operations`)}>
        <div className={bemClasses.element(`channel-header`)}>
          <h4>{oneOf ? MESSAGES : MESSAGE}</h4>
          {oneOf && (
            <p className={bemClasses.element(`channel-header-paragraph`)}>
              {ONE_OF_FOLLOWING_MESSAGES}
            </p>
          )}
        </div>
        <ul className={bemClasses.element(`channel-operations`)}>
          <li className={bemClasses.element(`channel-operations-subscribe`)}>
            <Operation operation={channel.subscribe} />
          </li>
          <li className={bemClasses.element(`channel-operations-publish`)}>
            <Operation operation={channel.publish} />
          </li>
        </ul>
      </div>
    </div>
  );
};
