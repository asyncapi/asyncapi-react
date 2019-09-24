import React, { useState, useEffect } from 'react';

import { useExpandedContext } from '../store';
import { bemClasses, inContainer, toKebabCase } from '../helpers';
import {
  CONTAINER_LABELS,
  CONTAINER_LABELS_VALUES,
  ITEM_LABELS,
  ITEM_LABELS_VALUES,
} from '../constants';

interface Props {
  header: React.ReactNode;
  className?: string;
  expanded?: boolean;
  label?: CONTAINER_LABELS | ITEM_LABELS | '';
  itemName?: string;
  toggleInState?: boolean;
}

export const Toggle: React.FunctionComponent<Props> = ({
  header,
  className: customClassName = '',
  expanded: initialExpanded = false,
  toggleInState = false,
  label = '',
  itemName: name = '',
  children,
}) => {
  const {
    expanded: globalExpanded,
    setNumberOfExpanded,
    clickedItem,
    setClickedItem,
  } = useExpandedContext();
  const itemName = toKebabCase(name);

  const [initial, setInitial] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(initialExpanded);

  const handleSetExpanded = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    const newState = !expanded;
    if (children) {
      setExpanded(newState);
    }
    setClickedItem({
      label,
      itemName,
      state: newState,
    });
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
    if (!initial) {
      return;
    }

    // for collapsing items in container when container will collapse
    if (
      !clickedItem.state &&
      ITEM_LABELS_VALUES.includes(label) &&
      clickedItem.label === inContainer(label as ITEM_LABELS)
    ) {
      setExpanded(false);
    }

    if (!expanded && clickedItem.state && label) {
      // for container when hash changed (also when hash point to item in container)
      if (
        (label === clickedItem.label &&
          CONTAINER_LABELS_VALUES.includes(label)) ||
        label === inContainer(clickedItem.label as ITEM_LABELS)
      ) {
        setExpanded(true);
      }

      // for item when hash changed
      if (
        itemName &&
        label === clickedItem.label &&
        clickedItem.itemName === itemName
      ) {
        setExpanded(true);
      }
    }
  }, [initial, clickedItem]);

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
