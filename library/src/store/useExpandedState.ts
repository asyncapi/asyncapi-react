import { useState } from 'react';
import createUseContext from 'constate';

import { ToggleLabel } from '../components';

interface ClickedToggle {
  label: ToggleLabel;
  expanded: boolean;
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
  const [clickedToggle, setClickedToggle] = useState<ClickedToggle>({
    label: ToggleLabel.DEFAULT,
    expanded: false,
  });

  return {
    numberOfElements,
    expanded,
    setExpanded,
    numberOfExpanded,
    setNumberOfExpanded,
    clickedToggle,
    setClickedToggle,
  };
};

export const useExpandedContext = createUseContext(useExpandedState);
