import React from "react";

interface Props {
  href: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export const Href: React.FunctionComponent<Props> = ({
  href,
  title,
  className,
  children,
}) => (
  <a
    href={href}F
    title={title ? `${title} (Opens in new window)` : 'Opens in new window'}
    className={className}
    target="_blank"
    rel="nofollow noopener noreferrer"
  >
    {children}
  </a>
);
