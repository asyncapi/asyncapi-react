import React from 'react';

interface Props {
  href: string;
}

export const Href: React.FunctionComponent<Props> = ({ href, children }) => (
  <a href={href} target="_blank" rel="nofollow noopener noreferrer">
    {children}
  </a>
);
