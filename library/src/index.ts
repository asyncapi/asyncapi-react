import AsyncApiComponent from './containers/AsyncApi/AsyncApi';
import React from 'react';
import AsyncApiComponentWPBase from './containers/AsyncApi/Standalone';
import { SpecificationHelpers } from './helpers';

export type { AsyncApiProps } from './containers/AsyncApi/AsyncApi';

type AsyncApiComponentWPProps = React.ComponentProps<
  typeof AsyncApiComponentWPBase
>;

// Compatibility export for parser serialized documents used by older consumers.
function AsyncApiComponentWP(props: AsyncApiComponentWPProps) {
  const input = props.schema;
  const canNormalize =
    typeof input === 'string' ||
    (typeof input === 'object' &&
      input !== null &&
      ('asyncapi' in input ||
        ('json' in input && typeof input.json === 'function')));
  const schema = canNormalize
    ? SpecificationHelpers.retrieveParsedSpec(input) ?? input
    : input;
  return React.createElement(AsyncApiComponentWPBase, { ...props, schema });
}
export type { ConfigInterface } from './config/config';
export {
  PLUGIN_EVENT_READY,
  PLUGIN_EVENT_ERROR,
  PLUGINEVENTS,
} from './constants';
export { PluginSlot, PayloadType } from './types';
export type {
  FetchingSchemaInterface,
  AsyncApiPlugin,
  PluginAPI,
  PluginContext,
  PluginErrorPayload,
  PluginInstance,
  ComponentSlotProps,
  TypedComponentSlotProps,
  SlotComponentProps,
  SlotContext,
  SlotContextMap,
  OperationSlotContext,
  InfoSlotContext,
} from './types';
export type { ExtensionComponentProps } from './types-parser';

import { hljs } from './helpers';

export { AsyncApiComponentWP, hljs };
export default AsyncApiComponent;
