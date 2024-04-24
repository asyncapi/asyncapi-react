import React, { useContext } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

export const SpecificationContext =
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  React.createContext<AsyncAPIDocumentInterface>(null as any);

export function useSpec() {
  return useContext(SpecificationContext);
}
