import { useEffect } from 'react';
import { useLocation } from 'react-use';
import createUseContext from 'constate';

import { useExpandedContext } from './useExpandedState';
import { PushStateBehavior } from '../types';

import { extractHashData } from '../helpers';

const defaultPushStateBehavior = (hash: string) => {
  setTimeout(() => {
    const serializedHash = hash.startsWith('#') ? hash.substr(1) : hash;
    const element = document.getElementById(serializedHash);
    if (element && element.scrollIntoView) {
      element.scrollIntoView(true);
    }
  }, 100);
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
