import { useEffect } from 'react';
import { useLocation } from 'react-use';
import createUseContext from 'constate';

import { useExpandedContext } from './useExpandedState';
import { PushStateBehavior } from '../types';

import { extractHashData, scrollIntoViewOfAnchor } from '../helpers';

interface Props {
  schemaName: string;
  pushStateBehavior?: PushStateBehavior;
}

const useChangeHash = ({
  schemaName,
  pushStateBehavior = scrollIntoViewOfAnchor,
}: Props) => {
  const { hash } = useLocation();
  const { setClickedItem, scrollToView } = useExpandedContext();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const hashData = extractHashData(hash);
    if (!hashData || hashData.schema !== schemaName) {
      return;
    }

    setClickedItem({
      label: hashData.container,
      itemName: hashData.item,
      state: true,
      scroll: true,
    });
  }, [hash]);

  useEffect(() => {
    if (!hash) {
      return;
    }

    const hashData = extractHashData(hash);
    if (!hashData || hashData.schema !== schemaName) {
      return;
    }

    pushStateBehavior && pushStateBehavior(hash);
  }, [scrollToView]);
};

export const useChangeHashContext = createUseContext(useChangeHash);
