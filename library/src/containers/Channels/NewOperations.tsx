import React from 'react';

import { Operation } from './NewOperation';
import { Toggle } from '../../components';

import { bemClasses } from '../../helpers';
import { useSpec } from '../../store';
import { PayloadType } from '../../types';
import { CONTAINER_LABELS, CHANNELS_TEXT } from '../../constants';

export const Operations: React.FunctionComponent = () => {
  const channels = useSpec().channels();

  if (!Object.keys(channels).length) {
    return null;
  }

  const className = CONTAINER_LABELS.CHANNELS;
  const header = <h2>{CHANNELS_TEXT}</h2>;

  const operationsList: React.ReactNodeArray = [];
  Object.entries(channels).forEach(([channelName, channel]) => {
    if (channel.hasPublish()) {
      operationsList.push(
        <li key={channelName}>
          <Operation
            type={PayloadType.PUBLISH}
            operation={channel.publish()}
            channelName={channelName}
            channel={channel}
          />
        </li>,
      );
    }
    if (channel.hasSubscribe()) {
      operationsList.push(
        <li key={channelName}>
          <Operation
            type={PayloadType.SUBSCRIBE}
            operation={channel.subscribe()}
            channelName={channelName}
            channel={channel}
          />
        </li>,
      );
    }
  });

  return (
    <section
      className={bemClasses.element(className)}
      id={bemClasses.identifier([className])}
    >
      <Toggle
        header={header}
        className={className}
        expanded={true}
        // expanded={expand && expand.root}
        label={CONTAINER_LABELS.CHANNELS}
        toggleInState={true}
      >
        <div className="operations pb-8">
          <ul>{operationsList}</ul>
        </div>
      </Toggle>
    </section>
  );
};
