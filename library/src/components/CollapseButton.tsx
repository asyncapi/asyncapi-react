import React, { useState, useEffect } from 'react';

import { bemClasses } from '../helpers';
import { COLLAPSE_ALL, EXPAND_ALL } from '../constants';
import { useExpandedContext } from '../store';

export const CollapseButton = () => {
  const {
    expanded,
    setExpanded,
    numberOfElements,
    numberOfExpanded,
  } = useExpandedContext();
  const [initial, setInitial] = useState<boolean>(false);

  useEffect(() => {
    setInitial(true);
  }, []);

  useEffect(() => {
    if (!initial) {
      return;
    }

    if (numberOfExpanded === 0 && expanded) {
      setExpanded(false);
    }
    if (numberOfExpanded === numberOfElements && !expanded) {
      setExpanded(true);
    }
    // eslint-disable-next-line
  }, [numberOfExpanded]);

  return (
    <button
      className={bemClasses.element(`collapse-button`)}
      onClick={() => setExpanded(state => !state)}
    >
      <span>{expanded ? COLLAPSE_ALL : EXPAND_ALL}</span>
    </button>
  );
};
