import React from 'react';
import { Channel, Operation as OperationType } from '@asyncapi/parser';

import { Message } from '../Messages/Message';
import {
  Href,
  Markdown,
  Schema,
  Bindings,
  Tags,
  Extensions,
} from '../../components';

import { useConfig } from '../../contexts';
import { CommonHelpers, SchemaHelpers } from '../../helpers';
import { EXTERAL_DOCUMENTATION_TEXT } from '../../constants';
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
  const config = useConfig();

  if (!operation || !channel) {
    return null;
  }

  const operationId = operation.id();
  const externalDocs = operation.externalDocs();
  // check typeof as fallback for older version than `2.2.0`
  const servers = typeof channel.servers === 'function' && channel.servers();

  const operationSummary = operation.summary();
  const parameters = SchemaHelpers.parametersToSchema(channel.parameters());

  return (
    <div>
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

        {externalDocs && (
          <ul className="leading-normal mt-2 mb-4 space-x-2 space-y-2">
            {externalDocs && (
              <li className="inline-block">
                <Href
                  className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                  href={externalDocs.url()}
                >
                  <span>{EXTERAL_DOCUMENTATION_TEXT}</span>
                </Href>
              </li>
            )}
          </ul>
        )}

        {operationId && (
          <div className="border bg-gray-100 rounded px-4 py-2 mt-2">
            <div className="text-sm text-gray-700">
              Operation ID
              <span className="border text-orange-600 rounded text-xs ml-2 py-0 px-2">
                {operationId}
              </span>
            </div>
          </div>
        )}

        {servers && servers.length > 0 ? (
          <div className="mt-2 text-sm">
            <p>Available only on servers:</p>
            <ul className="flex flex-wrap leading-normal">
              {servers.map(server => (
                <li className="inline-block mt-2 mr-2" key={server as string}>
                  <a
                    href={`#${CommonHelpers.getIdentifier(
                      'server-' + server,
                      config,
                    )}`}
                    className="border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1 cursor-pointer"
                  >
                    <span className="underline">{server}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {parameters && (
          <div
            className="mt-2"
            id={CommonHelpers.getIdentifier(
              `operation-${type}-${channelName}-parameters`,
              config,
            )}
          >
            <Schema
              schemaName="Parameters"
              schema={parameters}
              expanded={true}
            />
          </div>
        )}

        {channel.hasBindings() && (
          <div className="mt-2">
            <Bindings
              name="Channel specific information"
              bindings={channel.bindings()}
            />
          </div>
        )}

        <Extensions name="Channel Extensions" item={channel} />

        {operation.hasBindings() && (
          <div className="mt-2">
            <Bindings
              name="Operation specific information"
              bindings={operation.bindings()}
            />
          </div>
        )}

        <Extensions name="Operation Extensions" item={operation} />

        {operation.hasTags() && (
          <div className="mt-2">
            <Tags tags={operation.tags()} />
          </div>
        )}
      </div>

      <div
        className="w-full mt-4"
        id={CommonHelpers.getIdentifier(
          `operation-${type}-${channelName}-message`,
          config,
        )}
      >
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
