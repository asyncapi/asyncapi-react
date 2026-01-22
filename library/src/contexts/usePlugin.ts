import { createContext, useContext } from 'react';
import { PluginManager } from '../helpers/pluginManager';

export const PluginContext = createContext<PluginManager | undefined>(
  undefined,
);

export function usePlugin() {
  return useContext(PluginContext);
}
