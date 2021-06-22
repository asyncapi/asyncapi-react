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
        <li className="aui-mb-12" key={`pub-${channelName}`}>
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
        <li className="aui-mb-12" key={`sub-${channelName}`}>
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
    <section id="operations" className="aui-mt-16">
      <h2 className="2xl:aui-w-7/12 aui-text-3xl aui-font-light aui-mb-4 aui-px-8">
        {OPERATIONS_TEXT}
      </h2>
      <ul>{operationsList}</ul>
    </section>
  );
};
