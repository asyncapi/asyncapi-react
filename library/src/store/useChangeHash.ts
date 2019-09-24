import { useEffect } from 'react';
import { useLocation } from 'react-use';
import createUseContext from 'constate';

import { useExpandedContext } from './useExpandedState';
import { PushStateBehavior } from '../types';

import { extractHashData, scrollIntoViewOfAnchor } from '../helpers';

// if line for this function will change, please update `config-modification.md` doc in `docs/configuration` path
const defaultPushStateBehavior = (hash: string) => {
  setTimeout(() => {
    scrollIntoViewOfAnchor(hash);
  }, 50);
};

interface Props {
  schemaName: string;
  pushStateBehavior?: PushStateBehavior;
}

const useChangeHash = ({
  schemaName,
  pushStateBehavior = defaultPushStateBehavior,
}: Props) => {
  const { hash } = useLocation();
  const { setClickedItem } = useExpandedContext();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const hashData = extractHashData(hash);
    if (!hashData || hashData.schema !== schemaName) {
      return;
    }

    setClickedItem({
      label: hashData.label,
      itemName: hashData.item,
      state: true,
    });

    if (hashData.item && pushStateBehavior) {
      pushStateBehavior(hash);
    }
  }, [hash]);
};

export const useChangeHashContext = createUseContext(useChangeHash);
