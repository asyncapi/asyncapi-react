import React, { useContext } from 'react';
import { AsyncAPIDocument } from '@asyncapi/parser';

export const SpecificationContext = React.createContext<{
  asyncapi: AsyncAPIDocument;
}>({ asyncapi: (null as unknown) as AsyncAPIDocument });

export function useSpec() {
  return useContext(SpecificationContext).asyncapi;
}
