import React from 'react';
import { PluginManager } from '../helpers/pluginManager';
import { PluginContext, PluginSlot } from '../types';

interface SlotRendererProps {
  slot: PluginSlot;
  context: PluginContext;
  pluginManager?: PluginManager;
}

const SlotRenderer: React.FC<SlotRendererProps> = ({
  slot,
  context,
  pluginManager,
}) => {
  if (!pluginManager) {
    return null;
  }

  const components = pluginManager.getComponentsForSlot(slot);

  if (!components || components.length === 0) {
    return null;
  }

  return (
    <div className={`asyncapi-react-plugin-slot-${slot}`} data-slot={slot}>
      {components.map((Component, index) => (
        <React.Suspense
          key={`${slot}-${index}`}
          fallback={<div>Loading plugin...</div>}
        >
          <Component context={context} />
        </React.Suspense>
      ))}
    </div>
  );
};

export { SlotRenderer };
