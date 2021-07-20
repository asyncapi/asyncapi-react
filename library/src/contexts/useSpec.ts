import React, { useContext } from 'react';
import { AsyncAPIDocument } from '@asyncapi/parser';

export const SpecificationContext = React.createContext<AsyncAPIDocument>(
  null as any,
);

export function useSpec() {
  return useContext(SpecificationContext);
}
