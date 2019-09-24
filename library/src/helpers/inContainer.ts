import { CONTAINER_LABELS, ITEM_LABELS } from '../constants';

export function inContainer(item: ITEM_LABELS): CONTAINER_LABELS | string {
  switch (item) {
    case ITEM_LABELS.CHANNEL:
      return CONTAINER_LABELS.CHANNELS;
    case ITEM_LABELS.SERVER:
      return CONTAINER_LABELS.SERVERS;
    case ITEM_LABELS.MESSAGE:
      return CONTAINER_LABELS.MESSAGES;
    case ITEM_LABELS.SCHEMA:
      return CONTAINER_LABELS.SCHEMAS;
    default:
      return '';
  }
}
