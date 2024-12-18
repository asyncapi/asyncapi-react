import React, { useContext } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

export const SpecificationContext =
  React.createContext<AsyncAPIDocumentInterface>(null as never);

export function useSpec() {
  return useContext(SpecificationContext);
}
