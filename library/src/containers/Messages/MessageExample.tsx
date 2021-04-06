import React from 'react';
import { Message, Schema } from '@asyncapi/parser';

import { Chevron } from '../../components';
import { MessageHelpers } from '../../helpers/message';

interface Props {
  message: Message;
}

export const MessageExample: React.FunctionComponent<Props> = ({ message }) => {
  const payload = message.payload();
  const headers = message.headers();

  return (
    <div>
      <h5 className="examples-uid text-orange-600 mt-4">{message.uid()}</h5>
      {payload && (
        <Example
          type="Payload"
          schema={payload}
          examples={MessageHelpers.getPayloadExamples(message)}
        />
      )}
      {headers && (
        <Example
          type="Headers"
          schema={headers}
          examples={MessageHelpers.getHeadersExamples(message)}
        />
      )}
    </div>
  );
};

interface ExampleProps {
  type: 'Payload' | 'Headers';
  schema: Schema;
  examples?: any[];
}

export const Example: React.FunctionComponent<ExampleProps> = ({
  type = 'Payload',
  schema,
  examples = [],
}) => (
  <div>
    <div className="payload-examples mb-4">
      <span className="px-2 mr-2 text-gray-200 text-sm border rounded focus:outline-none cursor-pointer">
        {type}
      </span>
      <Chevron />
    </div>
    <div className="children payload-examples mt-4">
      {examples && examples.length > 0 ? (
        <ul>
          {examples.map((example, idx) => (
            <li key={idx}>
              <h6 className="text-xs font-bold text-gray-700">
                Example #{idx + 1}
              </h6>
              <pre className="hljs mb-4 border border-gray-800 rounded">
                <code>
                  {JSON.stringify(
                    MessageHelpers.sanitizeExample(example),
                    null,
                    2,
                  )}
                </code>
              </pre>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <pre className="hljs mb-4 border border-gray-800 rounded">
            <code>{MessageHelpers.generateExample(schema.json())}</code>
          </pre>
          <h6 className="text-xs font-bold text-gray-700 italic">
            This example has been generated automatically.
          </h6>
        </div>
      )}
    </div>
  </div>
);
