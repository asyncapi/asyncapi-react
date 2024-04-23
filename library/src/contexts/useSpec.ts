import React, { useContext } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

export const SpecificationContext = React.createContext<
  AsyncAPIDocumentInterface
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
>(null as any);

export function useSpec() {
  return useContext(SpecificationContext);
}
