import React from 'react';

interface Props {
  href: string;
}

export const Href: React.FunctionComponent<Props> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="nofollow noopener noreferrer"
    className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 font-bold no-underline text-orange-500 text-xs uppercase rounded mr-2 px-3 py-1"
  >
    {children}
  </a>
);
