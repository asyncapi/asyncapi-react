import React from 'react';

interface DefaultContentTypeProps {
  type: string;
}

export const DefaultContentTypeComponent: React.FunctionComponent<
  DefaultContentTypeProps
> = ({ type }) => (
  <div>
    <span>{type}</span>
  </div>
);
