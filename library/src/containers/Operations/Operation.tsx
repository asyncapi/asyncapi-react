import React, { useState } from 'react';
import { ChannelInterface, OperationInterface } from '@asyncapi/parser';
import { Message } from '../Messages/Message';
import { Security } from '../Servers/Security';
import {
  Markdown,
  Schema,
  Bindings,
  Tags,
  Extensions,
  CollapseButton,
} from '../../components';
import { Href } from '../../components/Href';
import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers, SchemaHelpers } from '../../helpers';
import { EXTERAL_DOCUMENTATION_TEXT } from '../../constants';
import { PayloadType } from '../../types';

interface Props {
  type: PayloadType;
  operation: OperationInterface;
  channelName: string;
  channel: ChannelInterface;
}

export const Operation: React.FunctionComponent<Props> = props => {
  const { type = PayloadType.SEND, operation, channelName, channel } = props;
  const config = useConfig();
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
                  <li className="mt-4" key={msg.id()}>
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

      <OperationReplyInfo {...props} />
    </div>
  );
};

export const OperationInfo: React.FunctionComponent<Props> = props => {
  const { type = PayloadType.SEND, operation, channelName, channel } = props;
  const config = useConfig();
  const operationSummary = operation.summary();
  const externalDocs = operation.externalDocs();
  const operationId = operation.id();
  const specV = useSpec().version();
  const version = specV.localeCompare('2.6.0', undefined, { numeric: true });
  const isAsyncAPIv2 = version === 0;
  const {
    borderColor,
    typeLabel,
  } = CommonHelpers.getOperationDesignInformation({
    type,
    config,
    isAsyncAPIv2,
  });
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
    </>
  );
};

export const OperationReplyInfo: React.FunctionComponent<Props> = props => {
  const { type = PayloadType.SEND, operation } = props;
  const [showMessages, setShowMessages] = useState(false);
  const [showChannel, setShowChannel] = useState(false);
  if (type !== PayloadType.REPLY && type !== PayloadType.REQUEST) {
    return <></>;
  }
  const reply = operation.reply();
  if (reply === undefined) {
    return <></>;
  }

  const replyMessages = reply.messages();
  const explicitChannel = reply.channel();

  const replyAddress = reply.address()?.location();

  return (
    <div className="panel-item">
      <div className="panel-item--center">
        <div className="font-mono px-8 py-4">
          <div className="border rounded">
            <div
              className={`w-full ${
                type === 'reply'
                  ? 'bg-green-600 border-green-600'
                  : 'bg-blue-600 border-blue-600'
              } text-sm rounded-t h-8 px-4 border text-white flex items-center`}
            >
              <span className="font-bold">REPLY INFORMATION</span>
            </div>
            <div className="flex">
              <div
                className={`w-1 h-11 ${
                  type === 'reply' ? 'bg-green-600' : 'bg-blue-600'
                } mt-4`}
              />
              <div className="p-4">
                <h3 className="text-xs">
                  <span className="mr-2" title={type}>
                    REPLY CHANNEL INFORMATION
                  </span>
                </h3>
                {explicitChannel?.address() ? (
                  <div className="text-xs text-gray-700">
                    Reply will be provided via this designated address:{' '}
                    <span className="border text-orange-600 rounded text-xs ml-2 py-0 px-2">
                      {explicitChannel.address()}{' '}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-gray-700">
                    Reply will be directed to the address specified at this
                    location:{' '}
                    <span className="border text-orange-600 rounded text-xs ml-2 py-0 px-2">
                      {replyAddress}
                    </span>
                  </div>
                )}
                <div className="mt-2">
                  {explicitChannel && (
                    <CollapseButton
                      onClick={() => setShowChannel(prev => !prev)}
                      expanded={showChannel}
                    >
                      <span className="inline-block py-0.5 mr-1 text-gray-500 text-xs text-center rounded focus:outline-none">
                        View channel details
                      </span>
                    </CollapseButton>
                  )}
                  {explicitChannel && (
                    <div
                      className={`w-full mt-4 ${
                        showChannel ? 'block' : 'hidden'
                      }`}
                    >
                      <OperationReplyChannelInfo {...props} />{' '}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <OperationReplyAddressInfo {...props} />
            {replyMessages.isEmpty() === false && (
              <div className="p-4">
                <CollapseButton
                  onClick={() => setShowMessages(prev => !prev)}
                  expanded={showMessages}
                >
                  <span className="inline-block py-0.5 mr-1 text-gray-500 text-xs text-center rounded focus:outline-none">
                    Expected Reply{' '}
                    {replyMessages.length > 1 ? 'Messages' : 'Message'}
                  </span>
                </CollapseButton>
                <div
                  className={`w-full mt-4 ${showMessages ? 'block' : 'hidden'}`}
                >
                  {replyMessages.length > 1 ? (
                    <div className="mt-2">
                      <ul>
                        {replyMessages.all().map((msg, idx) => (
                          <li className="mt-4" key={msg.id()}>
                            <Message
                              message={msg}
                              index={idx}
                              showExamples={true}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <div className="mt-2">
                        <Message
                          message={replyMessages.all()[0]}
                          showExamples={true}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <Extensions name="Operation Reply Extensions" item={reply} />
      </div>
    </div>
  );
};

export const OperationReplyChannelInfo: React.FunctionComponent<Props> = ({
  type = PayloadType.SEND,
  operation,
}) => {
  const reply = operation.reply();
  const channel = reply?.channel();
  const channelName = channel?.address() ?? '';

  const config = useConfig();
  const servers =
    typeof channel?.servers === 'function' && channel.servers().all();
  const parameters =
    channel?.parameters() !== undefined
      ? SchemaHelpers.parametersToSchema(channel.parameters())
      : undefined;

  if (!channel) {
    return <></>;
  }

  return (
    <div>
      {channel.address() && (
        <div className="mt-2 text-xs text-gray-700">
          Address:{' '}
          <span className="border text-orange-600 rounded text-xs py-0 px-2">
            {channel.address()}
          </span>
        </div>
      )}
      {channel.hasDescription() && (
        <div className="mt-2">
          <Markdown>{channel.description()}</Markdown>
        </div>
      )}
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
      {channel.messages().all().length > 1 ? (
        <div className="mt-2">
          <span className="text-xs text-gray-700">Messages:</span>
          <ul>
            {channel
              .messages()
              .all()
              .map((msg, idx) => (
                <li className="mt-4" key={msg.id()}>
                  <Message message={msg} index={idx} showExamples={true} />
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="mt-2">
          <span className="text-xs text-gray-700">Message:</span>
          <div className="mt-2">
            <Message
              message={channel.messages().all()[0]}
              showExamples={true}
            />
          </div>
        </div>
      )}
      {parameters && (
        <div
          className="mt-2"
          id={CommonHelpers.getIdentifier(
            `operation-${type}-${channelName}-parameters`,
            config,
          )}
        >
          <Schema schemaName="Parameters" schema={parameters} expanded={true} />
        </div>
      )}
      {channel.bindings() && (
        <div className="mt-2">
          <Bindings name="Bindings" bindings={channel.bindings()} />
        </div>
      )}
    </div>
  );
};

export const OperationReplyAddressInfo: React.FunctionComponent<Props> = ({
  type = PayloadType.SEND,
  operation,
}) => {
  if (type !== PayloadType.REPLY && type !== PayloadType.REQUEST) {
    return <></>;
  }
  const reply = operation.reply();
  if (reply === undefined || !reply.hasAddress()) {
    return <></>;
  }
  const replyAddress = reply.address()!;
  const replyAddressLocation = replyAddress.location();

  return (
    <div className="flex">
      <div
        className={`w-1 h-11 ${
          type === 'reply' ? 'bg-green-600' : 'bg-blue-600'
        } mt-4`}
      />
      <div className="p-4">
        <h3 className="text-xs">
          <span className="mr-2 uppercase" title={type}>
            REPLY address information
          </span>
        </h3>
        {replyAddressLocation && (
          <div className="text-xs text-gray-700">
            REPLY will be sent to the address provided in:
            <span className="border text-orange-600 rounded text-xs ml-2 py-0 px-2">
              {replyAddressLocation}
            </span>
          </div>
        )}
        {replyAddress.hasDescription() && (
          <div className="mt-2">
            <Markdown>{replyAddress.description()}</Markdown>
          </div>
        )}
        <Extensions name="Operation Reply Address Extensions" item={reply} />
      </div>
    </div>
  );
};
