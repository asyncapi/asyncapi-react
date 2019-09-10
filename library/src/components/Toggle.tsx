import React, { useState, useEffect } from 'react';

import { useExpandedContext } from '../store';
import { bemClasses } from '../helpers';

export enum ToggleLabel {
  DEFAULT = '',
  CHANNELS = 'channels',
  CHANNEL = 'channel',
  SERVERS = 'servers',
  SERVER = 'server',
  MESSAGES = 'messages',
  MESSAGE = 'message',
  SCHEMAS = 'schemas',
  SCHEMA = 'schema',
}
const ROOT_LABELS = [
  ToggleLabel.CHANNELS,
  ToggleLabel.SERVERS,
  ToggleLabel.MESSAGES,
  ToggleLabel.SCHEMAS,
];

interface Props {
  header: React.ReactNode;
  className?: string;
  expanded?: boolean;
  label?: ToggleLabel;
  toggleInState?: boolean;
}

export const Toggle: React.FunctionComponent<Props> = ({
  header,
  className: customClassName = '',
  expanded: initialExpanded = false,
  toggleInState = false,
  label = ToggleLabel.DEFAULT,
  children,
}) => {
  const {
    expanded: globalExpanded,
    setNumberOfExpanded,
    clickedToggle,
    setClickedToggle,
  } = useExpandedContext();

  const [initial, setInitial] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(initialExpanded);

  const handleSetExpanded = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    const oldState = expanded;
    if (children) {
      setExpanded(!oldState);
    }
    if (oldState && ROOT_LABELS.includes(label)) {
      setClickedToggle({
        label,
        expanded: !oldState,
      });
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
    if (initial && label === clickedToggle.label.slice(0, -1)) {
      setExpanded(false);
    }
  }, [clickedToggle]);

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
