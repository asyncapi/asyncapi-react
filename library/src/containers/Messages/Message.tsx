import React from 'react';
import { MessageInterface } from '@asyncapi/parser';

import { MessageExample } from './MessageExample';
import {
  Href,
  Markdown,
  Schema,
  Bindings,
  Tags,
  Extensions,
} from '../../components';

import { useConfig } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import {
  CONTENT_TYPES_SITE,
  EXTERAL_DOCUMENTATION_TEXT,
} from '../../constants';

interface Props {
  message: MessageInterface;
  messageName?: string;
  index?: number | string;
  showExamples?: boolean;
}

export const Message: React.FunctionComponent<Props> = ({
  message,
  messageName,
  index,
  showExamples = false,
}) => {
  const config = useConfig();

  if (!message) {
    return null;
  }

  // check typeof as fallback for older version than `2.4.0`
  const messageId = typeof message.id === 'function' && message.id();
  const title = message.title();
  const summary = message.summary();
  const payload = message.payload();
  const headers = message.headers();
  const correlationId = message.correlationId();

  const contentType = message.contentType();
  const externalDocs = message.externalDocs();
  const showInfoList = contentType || externalDocs;

  return (
    <div className="panel-item">
      <div className="panel-item--center px-8">
        <div className="shadow rounded bg-gray-200 p-4 border">
          <div>
            {index !== undefined && (
              <span className="text-gray-700 font-bold mr-2">#{index}</span>
            )}
            {title && <span className="text-gray-700 mr-2">{title}</span>}
            <span className="border text-orange-600 rounded text-xs py-0 px-2">
              {messageId}
            </span>
          </div>

          {summary && <p className="text-gray-600 text-sm">{summary}</p>}

          {showInfoList && (
            <ul className="leading-normal mt-2 mb-4 space-x-2 space-y-2">
              {contentType && (
                <li className="inline-block">
                  <Href
                    className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                    href={`${CONTENT_TYPES_SITE}/${contentType}`}
                  >
                    <span>{contentType}</span>
                  </Href>
                </li>
              )}
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

          {messageId && (
            <div className="border bg-gray-100 rounded px-4 py-2 mt-2">
              <div className="text-sm text-gray-700">
                Message ID
                <span className="border text-orange-600 rounded text-xs ml-2 py-0 px-2">
                  {messageId}
                </span>
              </div>
            </div>
          )}

          {correlationId && (
            <div className="border bg-gray-100 rounded px-4 py-2 mt-2">
              <div className="text-sm text-gray-700">
                Correlation ID
                <span className="border text-orange-600 rounded text-xs ml-2 py-0 px-2">
                  {correlationId.location()}
                </span>
              </div>

              {correlationId.hasDescription() && (
                <div className="mt-2">
                  <Markdown>{correlationId.description()}</Markdown>
                </div>
              )}
            </div>
          )}

          {message.hasDescription() && (
            <div className="mt-2">
              <Markdown>{message.description()}</Markdown>
            </div>
          )}

          {payload && (
            <div
              className="mt-2"
              id={
                messageName
                  ? CommonHelpers.getIdentifier(
                      `message-${messageName}-payload`,
                      config,
                    )
                  : undefined
              }
            >
              <Schema schemaName="Payload" schema={payload} />
            </div>
          )}
          {headers && (
            <div
              className="mt-2"
              id={
                messageName
                  ? CommonHelpers.getIdentifier(
                      `message-${messageName}-headers`,
                      config,
                    )
                  : undefined
              }
            >
              <Schema schemaName="Headers" schema={headers} />
            </div>
          )}

          {message.bindings().length > 0 && (
            <div className="mt-2">
              <Bindings
                name="Message specific information"
                bindings={message.bindings()}
              />
            </div>
          )}

          <Extensions item={message} />

          {message.tags().length > 0 && (
            <div className="mt-2">
              <Tags tags={message.tags()} />
            </div>
          )}
        </div>
      </div>

      {showExamples && (
        <div className="panel-item--right px-8">
          <MessageExample message={message} />
        </div>
      )}
    </div>
  );
};
