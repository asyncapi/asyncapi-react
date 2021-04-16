import React, { useState } from 'react';
import { Message, Schema } from '@asyncapi/parser';
// @ts-ignore
import formatHighlight from 'json-format-highlight';

import { Chevron, PreCode } from '../../components';
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
        <span className="px-2 py-1 mr-2 text-gray-200 text-sm border rounded focus:outline-none">
          {type}
        </span>
        <Chevron
          onClick={() => setExpand(prev => !prev)}
          rotate={expand ? '180' : ''}
        />
      </div>
      <div className={expand ? 'block' : 'hidden'}>
        {examples && examples.length > 0 ? (
          <ul>
            {examples.map((example, idx) => (
              <li className="mt-4" key={idx}>
                <h5 className="text-xs font-bold text-gray-700">
                  Example #{idx + 1}
                </h5>
                <div className="mt-1">
                  <PreCode
                    code={formatHighlight(
                      MessageHelpers.sanitizeExample(example),
                    )}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4">
            <PreCode
              code={formatHighlight(
                MessageHelpers.generateExample(schema.json()),
              )}
            />
            <h6 className="text-xs font-bold text-gray-700 italic mt-2">
              This example has been generated automatically.
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};
