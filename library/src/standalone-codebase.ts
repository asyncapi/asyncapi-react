import React from 'react';
import {
  hydrate as hydrateComponent,
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
export function createRender<P>(component: any) {
  return (
    props: P,
    container?: Element | DocumentFragment | null,
    callback?: () => void,
  ) => {
    container = container || querySelector('asyncapi');
    if (container === null) {
      return;
    }

    renderComponent(React.createElement(component, props), container, callback);
  };
}

/**
 * A factory that creates the hydration function of the given React component of any kind.
 *
 * @param {Any} component of any kind
 */
export function createHydrate<P>(component: any) {
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
      React.createElement(component, props),
      container,
      callback,
    );
  };
}
