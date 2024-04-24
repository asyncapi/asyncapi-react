import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';

function querySelector(selector: string): Element | null {
  if (typeof document !== 'undefined') {
    return document.querySelector(selector);
  }
  return null;
}

/**
 * A factory that creates the rendering function of the given React component of any kind.
 *
 * @param {Any} component of any kind
 */
export function createRender<
  Props extends Parameters<typeof React.createElement>[1],
>(component: Parameters<typeof React.createElement>[0]) {
  return (props: Props, container?: Element | DocumentFragment | null) => {
    container = container ?? querySelector('asyncapi');

    if (container === null) {
      return;
    }

    const root = createRoot(container);

    root.render(React.createElement(component, props));
  };
}

/**
 * A factory that creates the hydration function of the given React component of any kind.
 *
 * @param {Any} component of any kind
 */
export function createHydrate<
  Props extends Parameters<typeof React.createElement>[1],
>(component: Parameters<typeof React.createElement>[0]) {
  return (props: Props, container?: Element | Document | null) => {
    container = container ?? querySelector('asyncapi');

    if (container === null) {
      return;
    }

    hydrateRoot(container, React.createElement(component, props));
  };
}
