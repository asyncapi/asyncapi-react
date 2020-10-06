import React from 'react';

import { Href } from '../../components';

import { CONTENT_TYPES_SITE } from '../../constants';

interface DefaultContentTypeProps {
  type: string;
}

export const DefaultContentTypeComponent: React.FunctionComponent<DefaultContentTypeProps> = ({
  type,
}) => (
  <div>
    <Href href={`${CONTENT_TYPES_SITE}/${type}`}>
      <span>{type}</span>
    </Href>
  </div>
);
