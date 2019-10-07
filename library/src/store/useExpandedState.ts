import { useState, useCallback } from 'react';
import createUseContext from 'constate';

import { CONTAINER_LABELS, ITEM_LABELS } from '../constants';

interface ClickedItem {
  label: CONTAINER_LABELS | ITEM_LABELS | 'COLLAPSE_BUTTON' | '';
  itemName?: string;
  state: boolean;
  scroll?: boolean;
}

interface Props {
  numberOfElements?: number;
  numberOfExpandedElement?: number;
}

const useExpandedState = ({
  numberOfElements,
  numberOfExpandedElement: initialNumberOfExpandedElement = 0,
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [numberOfExpanded, setNumberOfExpanded] = useState<number>(
    initialNumberOfExpandedElement,
  );
  const [clickedItem, setClickedItem] = useState<ClickedItem>({
    label: '',
    itemName: '',
    state: false,
    scroll: false,
  });
  const [scrollToView, setScrollToView] = useState<boolean>(false);

  const clickItem = useCallback(({ label, ...rest }: ClickedItem) => {
    if (label) {
      setClickedItem({
        label,
        ...rest,
      });
    }
  }, []);

  return {
    expanded,
    setExpanded,
    numberOfElements,
    numberOfExpanded,
    setNumberOfExpanded,
    clickedItem,
    setClickedItem: clickItem,
    scrollToView,
    setScrollToView,
  };
};

export const useExpandedContext = createUseContext(useExpandedState);
