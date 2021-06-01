import React from 'react';
import {
  hydrate as hydrateComponent,
  render as renderComponent,
} from 'react-dom';

import AsyncApiComponent, {
  AsyncApiProps,
} from './containers/AsyncApi/Standalone';

function querySelector(selector: string): Element | DocumentFragment | null {
  if (typeof document !== 'undefined') {
    return document.querySelector(selector);
  }
  return null;
}

function render(
  props: AsyncApiProps,
  container?: Element | DocumentFragment | null,
  callback?: () => void,
) {
  container = container || querySelector('asyncapi');
  if (container === null) {
    return;
  }

  renderComponent(
    React.createElement(AsyncApiComponent, props),
    container,
    callback,
  );
}

function hydrate(
  props: AsyncApiProps,
  container?: Element | DocumentFragment | null,
  callback?: () => void,
) {
  container = container || querySelector('asyncapi');
  if (container === null) {
    return;
  }

  hydrateComponent(
    React.createElement(AsyncApiComponent, props),
    container,
    callback,
  );
}

export default {
  render,
  hydrate,
};
