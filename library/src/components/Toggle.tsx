import React, { useState } from 'react';

import { bemClasses } from '../helpers';

interface Props {
  header: React.ReactNode;
  className?: string;
  expanded?: boolean;
}

export const Toggle: React.FunctionComponent<Props> = ({
  header,
  className: customClassName = '',
  expanded: initialExpanded = false,
  children,
}) => {
  const [expanded, setExpanded] = useState<boolean>(initialExpanded);
  const handleSetExpanded = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setExpanded(state => !state);
  };

  const className = `toggle`;
  const classes = bemClasses.concatenate([
    bemClasses.element(className),
    expanded ? bemClasses.modifier(`expanded`, className) : '',
    bemClasses.element(`${customClassName}-toggle`),
    expanded
      ? bemClasses.modifier(`expanded`, `${customClassName}-toggle`)
      : '',
  ]);
  const headerClasses = bemClasses.concatenate([
    bemClasses.element(`${className}-header`),
    bemClasses.element(`${customClassName}-header`),
  ]);
  const arrowClasses = bemClasses.concatenate([
    bemClasses.element(`${className}-arrow`),
    expanded ? bemClasses.modifier(`expanded`, `${className}-arrow`) : '',
  ]);
  const bodyClasses = bemClasses.concatenate([
    bemClasses.element(`${className}-body`),
    bemClasses.element(`${customClassName}-body`),
  ]);

  return (
    <div
      className={classes}
      onClick={e => {
        if (!expanded) {
          handleSetExpanded(e);
        }
      }}
    >
      <header className={headerClasses} onClick={handleSetExpanded}>
        <div className={bemClasses.element(`${className}-header-content`)}>
          {header}
        </div>
        <button className={bemClasses.element(`${className}-button`)}>
          <span className={arrowClasses} />
        </button>
      </header>
      <div className={bodyClasses}>{children}</div>
    </div>
  );
};
