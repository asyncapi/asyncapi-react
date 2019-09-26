import React, { useState, useEffect } from 'react';

import { bemClasses } from '../helpers';
import {
  COLLAPSE_ALL_TEXT,
  EXPAND_ALL_TEXT,
  COLLAPSE_BUTTON,
} from '../constants';
import { useExpandedContext } from '../store';

export const CollapseButton = () => {
  const {
    expanded,
    setExpanded,
    numberOfElements,
    numberOfExpanded,
    setClickedItem,
    clickedItem,
  } = useExpandedContext();
  const [initial, setInitial] = useState<boolean>(false);

  useEffect(() => {
    setInitial(true);
  }, []);

  useEffect(() => {
    if (clickedItem && clickedItem.label === COLLAPSE_BUTTON) {
      setExpanded(clickedItem.state);
    }
  }, [clickedItem]);

  useEffect(() => {
    if (!initial) {
      return;
    }

    if (numberOfExpanded === 0 && expanded) {
      setClickedItem({
        label: COLLAPSE_BUTTON,
        state: false,
      });
    }
    if (numberOfExpanded === numberOfElements && !expanded) {
      setClickedItem({
        label: COLLAPSE_BUTTON,
        state: true,
      });
    }
  }, [numberOfExpanded]);

  return (
    <button
      className={bemClasses.element(`collapse-button`)}
      onClick={() =>
        setClickedItem({
          label: COLLAPSE_BUTTON,
          state: !expanded,
        })
      }
    >
      <span>{expanded ? COLLAPSE_ALL_TEXT : EXPAND_ALL_TEXT}</span>
    </button>
  );
};
