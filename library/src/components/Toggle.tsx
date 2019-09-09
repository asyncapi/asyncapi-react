import React, { useState, useEffect } from 'react';

import { useExpandedContext } from '../store';
import { bemClasses } from '../helpers';

interface Props {
  header: React.ReactNode;
  className?: string;
  expanded?: boolean;
  toggleInState?: boolean;
}

export const Toggle: React.FunctionComponent<Props> = ({
  header,
  className: customClassName = '',
  expanded: initialExpanded = false,
  toggleInState = false,
  children,
}) => {
  const {
    expanded: globalExpanded,
    setNumberOfExpanded,
  } = useExpandedContext();

  const [initial, setInitial] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(initialExpanded);

  const handleSetExpanded = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (children) {
      setExpanded(state => !state);
    }
  };

  useEffect(() => {
    setInitial(true);
  }, []);

  useEffect(() => {
    if (initial && toggleInState) {
      setExpanded(globalExpanded);
    }
  }, [globalExpanded]);

  useEffect(() => {
    if (toggleInState && initial) {
      setNumberOfExpanded(state => (expanded ? state + 1 : state - 1));
    }
  }, [expanded, setNumberOfExpanded]);

  const className = `toggle`;
  const classes = bemClasses.concatenate([
    bemClasses.element(className),
    expanded ? bemClasses.modifier(`expanded`, className) : '',
    bemClasses.element(`${customClassName}-toggle`),
    !children ? bemClasses.modifier(`no-children`, className) : '',
    !children ? bemClasses.modifier(`no-children`, customClassName) : '',
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
        {children && (
          <button className={bemClasses.element(`${className}-button`)}>
            <span className={arrowClasses} />
          </button>
        )}
      </header>
      {children && <div className={bodyClasses}>{children}</div>}
    </div>
  );
};
