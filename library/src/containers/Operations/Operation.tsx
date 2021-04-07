import React from 'react';
import { Channel, Operation as OperationType } from '@asyncapi/parser';

import { Message } from '../Messages/Message';
import { Markdown, Schema, Bindings, Tags } from '../../components';

import { SchemaHelpers } from '../../helpers';
import { PayloadType } from '../../types';

interface Props {
  type: PayloadType;
  operation: OperationType;
  channelName: string;
  channel: Channel;
}

export const Operation: React.FunctionComponent<Props> = ({
  type = PayloadType.PUBLISH,
  operation,
  channelName,
  channel,
}) => {
  const parameters = SchemaHelpers.parametersToSchema(channel.parameters());
  const operationSummary = operation.summary();

  return (
    <div className="center-block p-8" id={`operation-${type}-${channelName}`}>
      <div className="operation pt-8 pb-8">
        <h3 className="font-mono text-base">
          <span
            className={`font-mono border uppercase p-1 rounded ${
              type === PayloadType.PUBLISH
                ? 'border-blue-600 text-blue-500'
                : 'border-green-600 text-green-600'
            }`}
            title={type}
          >
            {type === PayloadType.PUBLISH ? 'PUB' : 'SUB'}
          </span>{' '}
          <span>{channelName}</span>
        </h3>
      </div>

      <Markdown>{channel.description()}</Markdown>
      {operationSummary && (
        <p className="text-gray-600 text-sm">{operationSummary}</p>
      )}
      <Markdown>{operation.description()}</Markdown>

      {parameters && (
        <Schema schemaName="Parameters" schema={parameters} expanded={true} />
      )}

      {operation.hasMultipleMessages() ? (
        <div>
          <p>
            Accepts <strong>one of</strong> the following messages:
          </p>
          {operation.messages().map((msg, idx) => (
            <Message message={msg} index={idx} showExamples={true} key={idx} />
          ))}
        </div>
      ) : (
        <div>
          <p>Accepts the following message:</p>
          <Message message={operation.message()} showExamples={true} />
        </div>
      )}

      {operation.hasBindings() && (
        <Bindings name="Operation Bindings" bindings={operation.bindings()} />
      )}
      {channel.hasBindings() && (
        <Bindings name="Channel Bindings" bindings={channel.bindings()} />
      )}

      <Tags tags={operation.tags()} />
    </div>
  );
};
