import React from 'react';

interface Props {
  href: string;
  title?: string;
  className?: string;
}

export const Href: React.FunctionComponent<Props> = ({
  href,
  title,
  className,
  children,
}) => (
  <a
    href={href}
    title={title}
    className={className}
    target="_blank"
    rel="nofollow noopener noreferrer"
  >
    {children}
  </a>
);
