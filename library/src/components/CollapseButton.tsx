import React, { useState, useEffect } from 'react';

import { bemClasses } from '../helpers';
import { COLLAPSE_ALL_TEXT, EXPAND_ALL_TEXT } from '../constants';
import { useExpandedContext } from '../store';

export const CollapseButton = () => {
  const {
    expanded,
    setExpanded,
    numberOfElements,
    numberOfExpanded,
  } = useExpandedContext();
  const [initial, setInitial] = useState<boolean>(false);
  console.log(numberOfElements, numberOfExpanded);

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
  }, [numberOfExpanded]);

  return (
    <button
      className={bemClasses.element(`collapse-button`)}
      onClick={() => setExpanded(state => !state)}
    >
      <span>{expanded ? COLLAPSE_ALL_TEXT : EXPAND_ALL_TEXT}</span>
    </button>
  );
};
