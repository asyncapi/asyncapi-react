import React, { useState, useEffect } from 'react';
import { MessageInterface, SchemaInterface } from '@asyncapi/parser';

import { CollapseButton, JSONSnippet } from '../../components';
import { MessageHelpers } from '../../helpers/message';
import { MessageExample as MessageExampleType } from '../../types';
import { useConfig } from '../../contexts';

interface Props {
  message: MessageInterface;
}

export const MessageExample: React.FunctionComponent<Props> = ({ message }) => {
  if (!message) {
    return null;
  }

  const payload = message.payload();
  const headers = message.headers();

  return (
    <div className="bg-gray-800 px-8 py-4 mt-4 -mx-8 2xl:mx-0 2xl:px-4 2xl:rounded examples">
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
  schema: SchemaInterface;
  examples?: MessageExampleType[];
}

export const Example: React.FunctionComponent<ExampleProps> = ({
  type = 'Payload',
  schema,
  examples = [],
}) => {
  const config = useConfig();
  const [expanded, setExpanded] = useState(
    (config && config.expand && config.expand.messageExamples) || false,
  );

  useEffect(() => {
    setExpanded(
      (config && config.expand && config.expand.messageExamples) || false,
    );
  }, [config.expand]);

  return (
    <div className="mt-4">
      <div>
        <CollapseButton
          onClick={() => setExpanded(prev => !prev)}
          expanded={expanded}
          chevronProps={{
            className: 'fill-current text-gray-200',
          }}
        >
          <span className="inline-block w-20 py-0.5 mr-1 text-gray-200 text-sm border text-center rounded focus:outline-none">
            {type}
          </span>
        </CollapseButton>
      </div>
      <div className={expanded ? 'block' : 'hidden'}>
        {examples && examples.length > 0 ? (
          <ul>
            {examples.map((example, idx) => (
              <li className="mt-4" key={idx}>
                <h5 className="text-xs font-bold text-gray-500">
                  {example.name
                    ? `#${idx + 1} Example - ${example.name}`
                    : `#${idx + 1} Example`}
                </h5>
                {example.summary && (
                  <p className="text-xs font-bold text-gray-500">
                    {example.summary}
                  </p>
                )}
                <div className="mt-1">
                  <JSONSnippet
                    snippet={MessageHelpers.sanitizeExample(example.example)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4">
            <JSONSnippet
              snippet={MessageHelpers.generateExample(schema.json())}
            />
            <h6 className="text-xs font-bold text-gray-600 italic mt-2">
              This example has been generated automatically.
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};
