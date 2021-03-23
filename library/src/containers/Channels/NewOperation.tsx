import React from 'react';
import { Channel, Operation } from '@asyncapi/parser';

import { MessageComponent } from '../Messages/NewMessage';
import { Markdown, Tags } from '../../components';

import { PayloadType } from '../../types';

interface Props {
  operationType: PayloadType;
  operation: Operation;
  channelName: string;
  channel: Channel;
}

export const OperationComponent: React.FunctionComponent<Props> = ({
  operationType = PayloadType.PUBLISH,
  operation,
  channelName,
  channel,
}) => {
  return (
    <div className="center-block p-8">
      <div className="operation pt-8 pb-8">
        <h3 className="font-mono text-base">
          <span
            className={`font-mono border uppercase p-1 rounded ${
              operationType === PayloadType.PUBLISH
                ? 'border-blue-600 text-blue-500'
                : 'border-green-600 text-green-600'
            }`}
            title={operationType}
          >
            {operationType === PayloadType.PUBLISH ? 'PUB' : 'SUB'}
          </span>{' '}
          <span>{channelName}</span>
        </h3>
      </div>

      <Markdown>{channel.description()}</Markdown>
      <Markdown>{operation.summary()}</Markdown>
      <Markdown>{operation.description()}</Markdown>

      {operation.hasMultipleMessages() ? (
        <>
          <p>
            Accepts <strong>one of</strong> the following messages:
          </p>
          {operation.messages().map((msg, idx) => (
            <MessageComponent message={msg} index={idx} />
          ))}
        </>
      ) : (
        <>
          <p>Accepts the following message:</p>
          <MessageComponent message={operation.message()} />
        </>
      )}

      <Tags tags={operation.tags()} />
    </div>
  );
};
