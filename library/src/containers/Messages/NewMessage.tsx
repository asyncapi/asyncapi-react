import React from 'react';
import { Message as MessageType } from '@asyncapi/parser';

import { Bindings } from '../Bindings/Bindings';
import { SchemaComponent } from '../Schemas/NewSchema';
import { Markdown, Tags } from '../../components';

interface Props {
  message: MessageType;
  index?: number | string;
}

export const Message: React.FunctionComponent<Props> = ({ message, index }) => {
  const title = message.title();
  const summary = message.summary();

  const payload = message.payload();
  const headers = message.headers();

  const correlationId = message.correlationId();

  return (
    <div className="bg-gray-200 rounded p-4 mt-2">
      <div className="text-sm text-gray-700 mb-2">
        {index !== undefined && (
          <span className="text-gray-700 font-bold mr-2">#{index}</span>
        )}
        {title && <span>{title}</span>}
        <span className="border text-orange-600 rounded text-s py-0 px-2">
          {message.uid()}
        </span>
      </div>

      {summary && <p className="text-gray-600 text-sm">{summary}</p>}

      {correlationId && (
        <div className="border border-gray-400 bg-gray-200 rounded p-4 mt-2">
          <div className="text-sm text-gray-700 mb-2">
            Correlation ID
            <span className="border text-orange-600 rounded text-xs ml-3 py-0 px-2">
              {correlationId.location()}
            </span>
          </div>
          <Markdown>{correlationId.description()}</Markdown>
        </div>
      )}

      <Markdown>{message.description()}</Markdown>

      {payload && <SchemaComponent schemaName="Payload" schema={payload} />}
      {headers && <SchemaComponent schemaName="Headers" schema={headers} />}

      {message.hasBindings() && <Bindings bindings={message.bindings()} />}

      <Tags tags={message.tags()} />
    </div>
  );
};
