import { useState, useEffect } from 'react';
import createUseContext from 'constate';

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

  useEffect(() => {
    console.log(numberOfExpanded);
  }, [numberOfExpanded]);

  return {
    numberOfElements,
    expanded,
    setExpanded,
    numberOfExpanded,
    setNumberOfExpanded,
  };
};

export const useExpandedContext = createUseContext(useExpandedState);
