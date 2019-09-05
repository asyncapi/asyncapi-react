import React from 'react';

import { bemClasses } from '../helpers';

interface Props {
  href: string;
}

export const Href: React.FunctionComponent<Props> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="nofollow noopener noreferrer"
    className={bemClasses.element(`anchor`)}
  >
    {children}
  </a>
);
