/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { SlotRenderer } from '../PluginSlotRenderer';
import '@testing-library/jest-dom';
import { PluginManager } from '../../helpers/pluginManager';
import {
  PluginSlot,
  PluginContext,
  ComponentSlotProps,
  PluginAPI,
} from '../../types';

const pluginName = 'test-plugin';

describe('PluginSlotRenderer', () => {
  let pluginManager: PluginManager;
  let context: PluginContext;

  beforeEach(() => {
    pluginManager = new PluginManager({ schema: {} });
    context = { schema: {} };
  });

  describe('Rendering', () => {
    it('should render nothing when no plugin manager is provided', () => {
      const { container } = render(
        <SlotRenderer slot={PluginSlot.OPERATION} context={context} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it('should render nothing when no components are registered for the slot', () => {
      const { container } = render(
        <SlotRenderer
          slot={PluginSlot.OPERATION}
          context={context}
          pluginManager={pluginManager}
        />,
      );
      expect(container.firstChild).toBeNull();
    });

    it('should render the slot container with correct class and data attribute', () => {
      // Register a simple component
      const TestComponent: React.FC<ComponentSlotProps> = () => (
        <div>Test Plugin</div>
      );

      const plugin = {
        name: pluginName,
        version: '1.0.0',
        install(api: PluginAPI) {
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
        },
      };

      pluginManager.register(plugin);

      const { container } = render(
        <SlotRenderer
          slot={PluginSlot.OPERATION}
          context={context}
          pluginManager={pluginManager}
        />,
      );

      const slotContainer = container.querySelector(
        `.asyncapi-react-plugin-slot-${PluginSlot.OPERATION}`,
      );
      expect(slotContainer).toBeInTheDocument();
      expect(slotContainer).toHaveAttribute('data-slot', 'operation');
    });

    it('should render a single plugin component', () => {
      const TestComponent: React.FC<ComponentSlotProps> = () => (
        <div>Test Plugin Content</div>
      );

      const plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install(api: PluginAPI) {
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
        },
      };

      pluginManager.register(plugin);

      render(
        <SlotRenderer
          slot={PluginSlot.OPERATION}
          context={context}
          pluginManager={pluginManager}
        />,
      );

      expect(screen.getByText('Test Plugin Content')).toBeInTheDocument();
    });

    it('should render multiple plugin components in the same slot', () => {
      const TestComponent1: React.FC<ComponentSlotProps> = () => (
        <div>Plugin 1</div>
      );
      const TestComponent2: React.FC<ComponentSlotProps> = () => (
        <div>Plugin 2</div>
      );

      const plugin1 = {
        name: 'plugin-1',
        version: '1.0.0',
        install(api: PluginAPI) {
          api.registerComponent(PluginSlot.OPERATION, TestComponent1);
        },
      };

      const plugin2 = {
        name: 'plugin-2',
        version: '1.0.0',
        install(api: PluginAPI) {
          api.registerComponent(PluginSlot.OPERATION, TestComponent2);
        },
      };

      pluginManager.register(plugin1);
      pluginManager.register(plugin2);

      render(
        <SlotRenderer
          slot={PluginSlot.OPERATION}
          context={context}
          pluginManager={pluginManager}
        />,
      );

      expect(screen.getByText('Plugin 1')).toBeInTheDocument();
      expect(screen.getByText('Plugin 2')).toBeInTheDocument();
    });
  });

  describe('Context Passing', () => {
    it('should pass context to plugin components', () => {
      const contextData = { schema: { title: 'Test API' } };
      const TestComponent: React.FC<ComponentSlotProps> = ({ context }) => (
        <div>{JSON.stringify(context)}</div>
      );

      const plugin = {
        name: pluginName,
        version: '1.0.0',
        install(api: PluginAPI) {
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
        },
      };

      pluginManager.register(plugin);

      render(
        <SlotRenderer
          slot={PluginSlot.OPERATION}
          context={contextData}
          pluginManager={pluginManager}
        />,
      );

      expect(screen.getByText(JSON.stringify(contextData))).toBeInTheDocument();
    });
  });

  describe('Component Priority', () => {
    it('should render components in priority order (highest first)', () => {
      const LowPriorityComponent: React.FC<ComponentSlotProps> = () => (
        <div data-testid="low">Low Priority</div>
      );
      const HighPriorityComponent: React.FC<ComponentSlotProps> = () => (
        <div data-testid="high">High Priority</div>
      );

      const lowPlugin = {
        name: 'low-priority-plugin',
        version: '1.0.0',
        install(api: PluginAPI) {
          api.registerComponent(PluginSlot.OPERATION, LowPriorityComponent, {
            priority: 10,
          });
        },
      };

      const highPlugin = {
        name: 'high-priority-plugin',
        version: '1.0.0',
        install(api: PluginAPI) {
          api.registerComponent(PluginSlot.OPERATION, HighPriorityComponent, {
            priority: 100,
          });
        },
      };

      pluginManager.register(lowPlugin);
      pluginManager.register(highPlugin);

      const { container } = render(
        <SlotRenderer
          slot={PluginSlot.OPERATION}
          context={context}
          pluginManager={pluginManager}
        />,
      );

      const children = container.querySelectorAll('[data-testid]');
      expect(children[0]).toHaveAttribute('data-testid', 'high');
      expect(children[1]).toHaveAttribute('data-testid', 'low');
    });
  });

  describe('Edge Cases', () => {
    it('should re-render when pluginManager changes', () => {
      const TestComponent: React.FC<ComponentSlotProps> = () => (
        <div>Initial Component</div>
      );

      const plugin = {
        name: pluginName,
        version: '1.0.0',
        install(api: PluginAPI) {
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
        },
      };

      pluginManager.register(plugin);

      const { rerender } = render(
        <SlotRenderer
          slot={PluginSlot.OPERATION}
          context={context}
          pluginManager={pluginManager}
        />,
      );

      expect(screen.getByText('Initial Component')).toBeInTheDocument();

      // Create new plugin manager with different component
      const newPluginManager = new PluginManager({ schema: {} });
      const NewComponent: React.FC<ComponentSlotProps> = () => (
        <div>New Component</div>
      );

      const newPlugin = {
        name: 'new-plugin',
        version: '1.0.0',
        install(api: PluginAPI) {
          api.registerComponent(PluginSlot.OPERATION, NewComponent);
        },
      };

      newPluginManager.register(newPlugin);

      rerender(
        <SlotRenderer
          slot={PluginSlot.OPERATION}
          context={context}
          pluginManager={newPluginManager}
        />,
      );

      expect(screen.getByText('New Component')).toBeInTheDocument();
      expect(screen.queryByText('Initial Component')).not.toBeInTheDocument();
    });
  });
});
