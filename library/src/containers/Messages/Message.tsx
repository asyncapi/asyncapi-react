import React from 'react';
import { Message as MessageType } from '@asyncapi/parser';

import { MessageExample } from './MessageExample';
import { Href, Markdown, Schema, Bindings, Tags } from '../../components';

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
  const title = message.title();
  const summary = message.summary();
  const payload = message.payload();
  const headers = message.headers();
  const correlationId = message.correlationId();

  const contentType = message.contentType();
  const externalDocs = message.externalDocs();
  const showInfoList = contentType || externalDocs;

  return (
    <div>
      <div className="ai-message">
        <div>
          {index !== undefined && (
            <span className="ai-message__index">#{index}</span>
          )}
          {title && <span className="ai-message__title">{title}</span>}
          <span className="ai-message__uid">{message.uid()}</span>
        </div>

        {summary && <p className="ai-message__summary">{summary}</p>}

        {showInfoList && (
          <ul className="ai-message__info">
            {contentType && (
              <li className="ai-info__links-item">
                <Href href={`${CONTENT_TYPES_SITE}/${contentType}`}>
                  <span>{contentType}</span>
                </Href>
              </li>
            )}
            {externalDocs && (
              <li className="ai-info__links-item">
                <Href href={externalDocs.url()}>
                  <span>{EXTERAL_DOCUMENTATION_TEXT}</span>
                </Href>
              </li>
            )}
          </ul>
        )}

        {correlationId && (
          <div className="ai-message__correlation-id">
            <div className="ai-message__correlation-id__title">
              Correlation ID
              <span className="ai-message__correlation-id__location">
                {correlationId.location()}
              </span>
            </div>

            {correlationId.hasDescription() && (
              <div className="ai-message__correlation-id__description">
                <Markdown>{correlationId.description()}</Markdown>
              </div>
            )}
          </div>
        )}

        {message.hasDescription() && (
          <div className="ai-message__description">
            <Markdown>{message.description()}</Markdown>
          </div>
        )}

        {payload && (
          <div className="ai-message__payload">
            <Schema schemaName="Payload" schema={payload} />
          </div>
        )}
        {headers && (
          <div className="ai-message__headers">
            <Schema schemaName="Headers" schema={headers} />
          </div>
        )}

        {message.hasBindings() && (
          <div className="ai-message__bindings">
            <Bindings bindings={message.bindings()} />
          </div>
        )}

        {message.hasTags() && (
          <div className="ai-message__tags">
            <Tags tags={message.tags()} />
          </div>
        )}
      </div>

      {showExamples && (
        <div>
          <MessageExample message={message} />
        </div>
      )}
    </div>
  );
};
