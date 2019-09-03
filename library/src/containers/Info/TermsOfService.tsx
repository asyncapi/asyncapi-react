import React from 'react';

import { Href } from '../../components';

import { TERMS_OF_SERVICE } from '../../constants';

interface TermsOfServiceProps {
  url: string;
}

export const TermsOfServiceComponent: React.FunctionComponent<
  TermsOfServiceProps
> = ({ url }) => (
  <div>
    <Href href={url}>
      <span>{TERMS_OF_SERVICE}</span>
    </Href>
  </div>
);
