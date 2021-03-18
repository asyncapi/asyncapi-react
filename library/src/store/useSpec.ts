import { AsyncAPIDocument } from '@asyncapi/parser';
import createUseContext from 'constate';

interface Props {
  spec: AsyncAPIDocument;
}

function useSpecContext({ spec }: Props) {
  return spec;
}

export const useSpec = createUseContext(useSpecContext);
