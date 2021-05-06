import React from 'react';
import { Channel, Operation as OperationType } from '@asyncapi/parser';

import { Message } from '../Messages/Message';
import { Markdown, Schema, Bindings, Tags, Extensions } from '../../components';

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
  if (!operation) {
    return null;
  }

  const parameters = SchemaHelpers.parametersToSchema(channel.parameters());
  const operationSummary = operation.summary();

  return (
    <div id={`operation-${type}-${channelName}`}>
      <div className="panel-item--center px-8">
        <div className="mb-4">
          <h3>
            <span
              className={`font-mono border uppercase p-1 rounded mr-2 ${
                type === PayloadType.PUBLISH
                  ? 'border-blue-600 text-blue-500'
                  : 'border-green-600 text-green-600'
              }`}
              title={type}
            >
              {type === PayloadType.PUBLISH ? 'PUB' : 'SUB'}
            </span>{' '}
            <span className="font-mono text-base">{channelName}</span>
          </h3>
        </div>

        {channel.hasDescription() && (
          <div className="mt-2">
            <Markdown>{channel.description()}</Markdown>
          </div>
        )}
        {operationSummary && (
          <p className="text-gray-600 text-sm mt-2">{operationSummary}</p>
        )}
        {operation.hasDescription() && (
          <div className="mt-2">
            <Markdown>{operation.description()}</Markdown>
          </div>
        )}

        {parameters && (
          <div className="mt-2">
            <Schema
              schemaName="Parameters"
              schema={parameters}
              expanded={true}
            />
          </div>
        )}

        {operation.hasBindings() && (
          <div className="mt-2">
            <Bindings
              name="Operation Bindings"
              bindings={operation.bindings()}
            />
          </div>
        )}
        {channel.hasBindings() && (
          <div className="mt-2">
            <Bindings name="Channel Bindings" bindings={channel.bindings()} />
          </div>
        )}

        <Extensions item={operation} />

        {operation.hasTags() && (
          <div className="mt-2">
            <Tags tags={operation.tags()} />
          </div>
        )}
      </div>

      <div className="w-full mt-4">
        {operation.hasMultipleMessages() ? (
          <div className="mt-2">
            <p className="px-8">
              Accepts <strong>one of</strong> the following messages:
            </p>
            <ul>
              {operation.messages().map((msg, idx) => (
                <li className="mt-4" key={idx}>
                  <Message message={msg} index={idx} showExamples={true} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-2">
            <p className="px-8">Accepts the following message:</p>
            <div className="mt-2">
              <Message
                message={(operation.message as any)(0)}
                showExamples={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
