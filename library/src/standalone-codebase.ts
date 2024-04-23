import React from 'react';
import {
  // eslint-disable-next-line react/no-deprecated
  hydrate as hydrateComponent,
  // eslint-disable-next-line react/no-deprecated
  render as renderComponent,
} from 'react-dom';

function querySelector(selector: string): Element | DocumentFragment | null {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createRender<P extends object>(component: any) {
  return (
    props: P,
    container?: Element | DocumentFragment | null,
    callback?: () => void,
  ) => {
    container = container || querySelector('asyncapi');
    if (container === null) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    renderComponent(React.createElement(component, props), container, callback);
  };
}

/**
 * A factory that creates the hydration function of the given React component of any kind.
 *
 * @param {Any} component of any kind
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createHydrate<P extends object>(component: any) {
  return (
    props: P,
    container?: Element | DocumentFragment | null,
    callback?: () => void,
  ) => {
    container = container || querySelector('asyncapi');
    if (container === null) {
      return;
    }

    hydrateComponent(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      React.createElement(component, props),
      container,
      callback,
    );
  };
}
