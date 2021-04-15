import React, { useState } from 'react';
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
    <div className="p-8 mt-4 bg-gray-800 rounded">
      <h4 className="text-white text-lg">Examples</h4>
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
}) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="mt-4">
      <div>
        <span className="px-2 mr-2 text-gray-200 text-sm border rounded focus:outline-none">
          {type}
        </span>
        <span onClick={() => setExpand(prev => !prev)}>
          <Chevron />
        </span>
      </div>
      <div className={expand ? 'block' : 'hidden'}>
        {examples && examples.length > 0 ? (
          <ul>
            {examples.map((example, idx) => (
              <li className="mt-4" key={idx}>
                <h5 className="text-xs font-bold text-gray-700 mb-1">
                  Example #{idx + 1}
                </h5>
                <pre className="border border-gray-900 rounded hljs">
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
          <div className="ai-message__examples__example">
            <pre className="border border-gray-900 rounded hljs">
              <code>
                {JSON.stringify(
                  MessageHelpers.generateExample(schema.json()),
                  null,
                  2,
                )}
              </code>
            </pre>
            <h6 className="text-xs font-bold text-gray-700 italic mt-2">
              This example has been generated automatically.
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};
