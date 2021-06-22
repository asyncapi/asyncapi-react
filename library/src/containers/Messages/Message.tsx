import React from 'react';
import { Message as MessageType } from '@asyncapi/parser';

import { MessageExample } from './MessageExample';
import {
  Href,
  Markdown,
  Schema,
  Bindings,
  Tags,
  Extensions,
} from '../../components';

import {
  CONTENT_TYPES_SITE,
  EXTERAL_DOCUMENTATION_TEXT,
} from '../../constants';

interface Props {
  message: MessageType;
  index?: number | string;
  showExamples?: boolean;
}

export const Message: React.FunctionComponent<Props> = ({
  message,
  index,
  showExamples = false,
}) => {
  if (!message) {
    return null;
  }

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
      <div className="panel-item--center aui-px-8">
        <div className="aui-shadow aui-rounded aui-bg-gray-200 aui-p-4 aui-border aui-bg-gray-100">
          <div>
            {index !== undefined && (
              <span className="aui-text-gray-700 aui-font-bold aui-mr-2">
                #{index}
              </span>
            )}
            {title && (
              <span className="aui-text-gray-700 aui-mr-2">{title}</span>
            )}
            <span className="aui-border aui-text-orange-600 aui-rounded aui-text-xs aui-py-0 aui-px-2">
              {message.uid()}
            </span>
          </div>

          {summary && (
            <p className="aui-text-gray-600 aui-text-sm">{summary}</p>
          )}

          {showInfoList && (
            <ul className="aui-leading-normal aui-mt-2 aui-mb-4 aui-space-x-2 aui-space-y-2">
              {contentType && (
                <li className="aui-inline-block">
                  <Href
                    className="aui-border aui-border-solid aui-border-orange-300 hover:aui-bg-orange-300 hover:aui-text-orange-600 aui-text-orange-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1"
                    href={`${CONTENT_TYPES_SITE}/${contentType}`}
                  >
                    <span>{contentType}</span>
                  </Href>
                </li>
              )}
              {externalDocs && (
                <li className="aui-inline-block">
                  <Href
                    className="aui-border aui-border-solid aui-border-orange-300 hover:aui-bg-orange-300 hover:aui-text-orange-600 aui-text-orange-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1"
                    href={externalDocs.url()}
                  >
                    <span>{EXTERAL_DOCUMENTATION_TEXT}</span>
                  </Href>
                </li>
              )}
            </ul>
          )}

          {correlationId && (
            <div className="aui-border aui-bg-gray-100 aui-rounded aui-px-4 aui-py-2 aui-mt-2">
              <div className="aui-text-sm aui-text-gray-700">
                Correlation ID
                <span className="aui-border aui-text-orange-600 aui-rounded aui-text-xs aui-ml-2 aui-py-0 aui-px-2">
                  {correlationId.location()}
                </span>
              </div>

              {correlationId.hasDescription() && (
                <div className="aui-mt-2">
                  <Markdown>{correlationId.description()}</Markdown>
                </div>
              )}
            </div>
          )}

          {message.hasDescription() && (
            <div className="aui-mt-2">
              <Markdown>{message.description()}</Markdown>
            </div>
          )}

          {payload && (
            <div className="aui-mt-2">
              <Schema schemaName="Payload" schema={payload} />
            </div>
          )}
          {headers && (
            <div className="aui-mt-2">
              <Schema schemaName="Headers" schema={headers} />
            </div>
          )}

          {message.hasBindings() && (
            <div className="aui-mt-2">
              <Bindings bindings={message.bindings()} />
            </div>
          )}

          <Extensions item={message} />

          {message.hasTags() && (
            <div className="aui-mt-2">
              <Tags tags={message.tags()} />
            </div>
          )}
        </div>
      </div>

      {showExamples && (
        <div className="panel-item--right aui-px-8">
          <MessageExample message={message} />
        </div>
      )}
    </div>
  );
};
