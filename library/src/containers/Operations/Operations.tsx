import React from 'react';

import { Operation } from './Operation';
import { Toggle } from '../../components';

import { useSpec } from '../../store';
import { PayloadType } from '../../types';
import { CONTAINER_LABELS, CHANNELS_TEXT } from '../../constants';

export const Operations: React.FunctionComponent = () => {
  const channels = useSpec().channels();

  if (!Object.keys(channels).length) {
    return null;
  }

  const header = <h2>{CHANNELS_TEXT}</h2>;
  const operationsList: React.ReactNodeArray = [];
  Object.entries(channels).forEach(([channelName, channel]) => {
    if (channel.hasPublish()) {
      operationsList.push(
        <li className="mb-12" key={channelName}>
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
        <li className="mb-12" key={channelName}>
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
    <section id="operations">
      <Toggle
        header={header}
        expanded={true}
        // expanded={expand && expand.root}
        label={CONTAINER_LABELS.CHANNELS}
        toggleInState={true}
      >
        <ul>{operationsList}</ul>
      </Toggle>
    </section>
  );
};
