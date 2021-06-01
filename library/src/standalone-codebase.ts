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
