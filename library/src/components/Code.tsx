import React from 'react';

interface Props {
  code: string;
}

export const PreCode: React.FunctionComponent<Props> = ({ code }) => (
  <div className="border border-gray-900 bg-gray-900 rounded">
    <pre>
      <code dangerouslySetInnerHTML={{ __html: code }} />
    </pre>
  </div>
);
