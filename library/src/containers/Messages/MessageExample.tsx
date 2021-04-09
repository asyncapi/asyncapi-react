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
    <div className="ai-message__examples">
      <h4>Examples</h4>
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
    <div className="ai-message__examples__item">
      <div>
        <span className="ai-message__examples__type">{type}</span>
        <span onClick={() => setExpand(prev => !prev)}>
          <Chevron />
        </span>
      </div>
      <div
        className={`ai-message__examples__content ${
          expand ? 'ai-message__examples__content--opened' : ''
        }`}
      >
        {examples && examples.length > 0 ? (
          <ul className="ai-message__examples__list">
            {examples.map((example, idx) => (
              <li className="ai-message__examples__example" key={idx}>
                <h5 className="text-xs font-bold text-gray-700">
                  Example #{idx + 1}
                </h5>
                <pre className="hljs">
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
            <pre className="hljs">
              <code>
                {JSON.stringify(
                  MessageHelpers.generateExample(schema.json()),
                  null,
                  2,
                )}
              </code>
            </pre>
            <h6 className="text-xs font-bold text-gray-700 italic">
              This example has been generated automatically.
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};
