import React from 'react';

import { bemClasses } from '../helpers';

interface Props {
  href: string;
}

export const Href: React.FunctionComponent<Props> = ({ href, children }) => {
  const className = `anchor`;

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={bemClasses.element(className)}
    >
      <div className={bemClasses.element(`${className}-content`)}>
        {children}
      </div>
      <span className={bemClasses.element(`${className}-icon`)} />
    </a>
  );
};
