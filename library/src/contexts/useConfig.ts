import { createContext, useContext } from 'react';
import type { ConfigInterface } from '../config';

export const ConfigContext = createContext<ConfigInterface>({});

export function useConfig() {
  return useContext(ConfigContext);
}
