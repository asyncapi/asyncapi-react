import React from 'react';

import { Operation } from './Operation';

import { useSpec } from '../../contexts';
import { PayloadType } from '../../types';
import { OPERATIONS_TEXT } from '../../constants';

export const Operations: React.FunctionComponent = () => {
  const channels = useSpec().channels();

  if (!Object.keys(channels).length) {
    return null;
  }

  const operationsList: React.ReactNodeArray = [];
  Object.entries(channels).forEach(([channelName, channel]) => {
    if (channel.hasPublish()) {
      operationsList.push(
        <li className="mb-12" key={`pub-${channelName}`}>
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
        <li className="mb-12" key={`sub-${channelName}`}>
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
    <section id="operations" className="mt-16">
      <h2 className="2xl:w-7/12 text-3xl font-light mb-4 px-8">
        {OPERATIONS_TEXT}
      </h2>
      <ul>{operationsList}</ul>
    </section>
  );
};
