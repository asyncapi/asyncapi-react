import React, { useContext } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

export const SpecificationContext = React.createContext<
  AsyncAPIDocumentInterface
>(null as any);

export function useSpec() {
  return useContext(SpecificationContext);
}
