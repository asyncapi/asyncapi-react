import { useState, useCallback } from 'react';
import createUseContext from 'constate';

import { CONTAINER_LABELS, ITEM_LABELS } from '../constants';

interface ClickedItem {
  label: CONTAINER_LABELS | ITEM_LABELS | '';
  itemName?: string;
  state: boolean;
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
  });

  const clickItem = useCallback(({ label, ...rest }: ClickedItem) => {
    if (label) {
      setClickedItem({
        label,
        ...rest,
      });
    }
  }, []);

  return {
    numberOfElements,
    expanded,
    setExpanded,
    numberOfExpanded,
    setNumberOfExpanded,
    clickedItem,
    setClickedItem: clickItem,
  };
};

export const useExpandedContext = createUseContext(useExpandedState);
