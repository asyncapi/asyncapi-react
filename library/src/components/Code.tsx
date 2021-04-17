import React from 'react';

import { formatHighlight } from '../helpers';

interface Props {
  code: string;
}

export const PreCode: React.FunctionComponent<Props> = ({ code }) => (
  <div className="border border-gray-900 bg-gray-900 rounded">
    <pre className="p-2 text-gray-200 text-xs">
      <code dangerouslySetInnerHTML={{ __html: formatHighlight(code) }} />
    </pre>
  </div>
);
