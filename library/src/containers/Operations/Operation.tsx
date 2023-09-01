import React from 'react';
import { ChannelInterface, OperationInterface } from '@asyncapi/parser';

import { Message } from '../Messages/Message';
import { Security } from '../Servers/Security';
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
import {
  EXTERAL_DOCUMENTATION_TEXT,
  PUBLISH_LABEL_DEFAULT_TEXT,
  REPLIER_LABEL_DEFAULT_TEXT,
  REQUEST_LABEL_DEFAULT_TEXT,
  SUBSCRIBE_LABEL_DEFAULT_TEXT,
} from '../../constants';
import { PayloadType } from '../../types';

interface Props {
  type: PayloadType;
  operation: OperationInterface;
  channelName: string;
  channel: ChannelInterface;
}

export const Operation: React.FunctionComponent<Props> = props => {
  const config = useConfig();
  const { type = PayloadType.PUBLISH, operation, channelName, channel } = props;

  if (!operation || !channel) {
    return null;
  }

  // check typeof as fallback for older version than `2.2.0`
  const servers =
    typeof channel.servers === 'function' && channel.servers().all();
  // check typeof as fallback for older version than `2.4.0`
  const security =
    typeof operation.security === 'function' && operation.security();
  const parameters =
    channel.parameters() !== undefined
      ? SchemaHelpers.parametersToSchema(channel.parameters())
      : undefined;

  return (
    <div>
      <div className="panel-item--center px-8">
        <OperationInfo {...props} />

        {servers && servers.length > 0 ? (
          <div className="mt-2 text-sm">
            <p>Available only on servers:</p>
            <ul className="flex flex-wrap leading-normal">
              {servers.map(server => (
                <li className="inline-block mt-2 mr-2" key={server.id()}>
                  <a
                    href={`#${CommonHelpers.getIdentifier(
                      'server-' + server.id(),
                      config,
                    )}`}
                    className="border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1 cursor-pointer"
                  >
                    <span className="underline">{server.id()}</span>
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

        {security && (
          <div
            className="mt-2"
            id={CommonHelpers.getIdentifier(
              `operation-${type}-${channelName}-security`,
              config,
            )}
          >
            <Security
              security={security}
              header="Additional security requirements"
            />
          </div>
        )}

        {channel.bindings() && (
          <div className="mt-2">
            <Bindings
              name="Channel specific information"
              bindings={channel.bindings()}
            />
          </div>
        )}

        <Extensions name="Channel Extensions" item={channel} />

        {operation.bindings() && (
          <div className="mt-2">
            <Bindings
              name="Operation specific information"
              bindings={operation.bindings()}
            />
          </div>
        )}

        <Extensions name="Operation Extensions" item={operation} />

        {operation.tags() && (
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
        {operation.messages().length > 1 ? (
          <div className="mt-2">
            <p className="px-8">
              Accepts <strong>one of</strong> the following messages:
            </p>
            <ul>
              {operation
                .messages()
                .all()
                .map((msg, idx) => (
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
                message={operation.messages().all()[0]}
                showExamples={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function getTypeInformation({
  type = PayloadType.PUBLISH,
}: {
  type: PayloadType;
}): { borderColor: string; typeLabel: string } {
  const config = useConfig();
  if (type === PayloadType.SUBSCRIBE) {
    return {
      borderColor: 'border-green-600 text-green-600',
      typeLabel: config.subscribeLabel || SUBSCRIBE_LABEL_DEFAULT_TEXT,
    };
  }
  if (type === PayloadType.REPLIER) {
    return {
      borderColor: 'border-orange-600 text-orange-600',
      typeLabel: config.publishLabel || REPLIER_LABEL_DEFAULT_TEXT,
    };
  }
  if (type === PayloadType.REQUESTER) {
    return {
      borderColor: 'border-red-600 text-red-600',
      typeLabel: config.publishLabel || REQUEST_LABEL_DEFAULT_TEXT,
    };
  }
  // type === PayloadType.PUBLISH
  return {
    borderColor: 'border-blue-600 text-blue-500',
    typeLabel: config.publishLabel || PUBLISH_LABEL_DEFAULT_TEXT,
  };
}

export const OperationInfo: React.FunctionComponent<Props> = props => {
  const { type = PayloadType.PUBLISH, operation, channelName, channel } = props;
  const operationSummary = operation.summary();
  const externalDocs = operation.externalDocs();
  const operationId = operation.id();
  const { borderColor, typeLabel } = getTypeInformation({ type });

  return (
    <>
      <div className="mb-4">
        <h3>
          <span
            className={`font-mono border uppercase p-1 rounded mr-2 ${borderColor}`}
            title={type}
          >
            {typeLabel}
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

      <OperationReplyInfo {...props} />
    </>
  );
};

export const OperationReplyInfo: React.FunctionComponent<Props> = props => {
  const { type = PayloadType.PUBLISH, operation } = props;
  if (type !== PayloadType.REPLIER && type !== PayloadType.REQUESTER)
    return <></>;
  const reply = operation.reply();
  if (reply === undefined) return <></>;
  const { typeLabel } = getTypeInformation({ type });
  const replyMessages = reply.messages();
  const explicitChannel = reply.channel();

  return (
    <>
      <div className="mb-4">
        <h3>
          <span
            className={`font-mono border uppercase p-1 rounded mr-2`}
            title={type}
          >
            {typeLabel} information
          </span>
        </h3>
      </div>

      {explicitChannel && (
        <div className="border bg-gray-100 rounded px-4 py-2 mt-2">
          <div className="text-sm text-gray-700">
            {typeLabel} should be done on channel
            <span className="border text-orange-600 rounded text-xs ml-2 py-0 px-2">
              {explicitChannel.id()}
            </span>
          </div>
        </div>
      )}

      <div className="w-full mt-4">
        {replyMessages.length > 1 ? (
          <div className="mt-2">
            <p className="px-8">
              {typeLabel} should be with <strong>one of</strong> the following
              messages:
            </p>
            <ul>
              {replyMessages.all().map((msg, idx) => (
                <li className="mt-4" key={idx}>
                  <Message message={msg} index={idx} showExamples={true} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-2">
            <p className="px-8">
              {typeLabel} should be with the following message:
            </p>
            <div className="mt-2">
              <Message message={replyMessages.all()[0]} showExamples={true} />
            </div>
          </div>
        )}
      </div>
      <OperationReplyAddressInfo {...props} />

      <Extensions name="Operation Reply Extensions" item={reply} />
    </>
  );
};

export const OperationReplyAddressInfo: React.FunctionComponent<Props> = ({
  type = PayloadType.PUBLISH,
  operation,
}) => {
  if (type !== PayloadType.REPLIER && type !== PayloadType.REQUESTER)
    return <></>;
  const reply = operation.reply();
  if (reply === undefined || !reply.hasAddress()) return <></>;
  const { typeLabel } = getTypeInformation({ type });
  const replyAddress = reply.address()!;
  const replyAddressLocation = replyAddress.location();

  return (
    <>
      <div className="mb-4">
        <h3>
          <span
            className={`font-mono border uppercase p-1 rounded mr-2`}
            title={type}
          >
            Operation {typeLabel} address information
          </span>
        </h3>
      </div>

      {replyAddress.hasDescription() && (
        <div className="mt-2">
          <Markdown>{replyAddress.description()}</Markdown>
        </div>
      )}

      {replyAddressLocation && (
        <div className="border bg-gray-100 rounded px-4 py-2 mt-2">
          <div className="text-sm text-gray-700">
            Operation {typeLabel} address location
            <span className="border text-orange-600 rounded text-xs ml-2 py-0 px-2">
              {replyAddressLocation}
            </span>
          </div>
        </div>
      )}

      <Extensions name="Operation Reply Address Extensions" item={reply} />
    </>
  );
};
