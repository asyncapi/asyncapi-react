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
    <div className="ai-operation" id={`operation-${type}-${channelName}`}>
      <div>
        <h3>
          <span
            className={`ai-operation__type ${
              type === PayloadType.PUBLISH
                ? 'ai-operation__type--publish'
                : 'ai-operation__type--subscribe'
            }`}
            title={type}
          >
            {type === PayloadType.PUBLISH ? 'PUB' : 'SUB'}
          </span>{' '}
          <span className="ai-operation__channel-name">{channelName}</span>
        </h3>
      </div>

      {channel.hasDescription() && (
        <div className="ai-operation__channel-description">
          <Markdown>{channel.description()}</Markdown>
        </div>
      )}
      {operationSummary && (
        <p className="ai-operation__summary">{operationSummary}</p>
      )}
      {operation.hasDescription() && (
        <div className="ai-operation__description">
          <Markdown>{operation.description()}</Markdown>
        </div>
      )}

      {parameters && (
        <div className="ai-operation__channel-parameters">
          <Schema schemaName="Parameters" schema={parameters} expanded={true} />
        </div>
      )}

      {operation.hasMultipleMessages() ? (
        <div className="ai-operation__multiple-messages">
          <p>
            Accepts <strong>one of</strong> the following messages:
          </p>
          <ul className="ai-operation__multiple-messages__list">
            {operation.messages().map((msg, idx) => (
              <li className="ai-operation__message" key={idx}>
                <Message message={msg} index={idx} showExamples={true} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="ai-operation__single-message">
          <p>Accepts the following message:</p>
          <div className="ai-operation__message">
            <Message message={operation.message()} showExamples={true} />
          </div>
        </div>
      )}

      {operation.hasBindings() && (
        <div className="ai-operation__bindings">
          <Bindings name="Operation Bindings" bindings={operation.bindings()} />
        </div>
      )}
      {channel.hasBindings() && (
        <div className="ai-operation__channel-bindings">
          <Bindings name="Channel Bindings" bindings={channel.bindings()} />
        </div>
      )}

      {operation.hasTags() && (
        <div className="ai-operation__tags">
          <Tags tags={operation.tags()} />
        </div>
      )}
    </div>
  );
};
