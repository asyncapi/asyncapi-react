import { CONTAINER_LABELS, ITEM_LABELS } from '../constants';

const CONTAINERS_REGEX = new RegExp(
  `(.*?)--(${Object.values(CONTAINER_LABELS).join('|')})$`,
);
const ITEMS_REGEX = new RegExp(
  `(.*?)--(${Object.values(ITEM_LABELS).join('|')})--(.*?)$`,
);
const PROPERTIES_REGEX = new RegExp(`(.*?)--(.*?)$`);

interface HashData {
  schema: string;
  label: CONTAINER_LABELS | ITEM_LABELS;
  item?: string;
}

function removeHash(str: string): string {
  return str.startsWith('#') ? str.substr(1) : str;
}

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

export function extractHashData(hash: string): HashData | undefined {
  // hashData[0] = original string
  // hashData[1] = schema name
  // hashData[2] = container name
  let hashData = hash.match(CONTAINERS_REGEX);
  if (hashData && hashData.length === 3) {
    return {
      schema: removeHash(hashData[1]),
      label: hashData[2] as CONTAINER_LABELS,
    };
  }

  // hashData[0] = original string
  // hashData[1] = schema name
  // hashData[2] = item name
  // hashData[3] = rest of string
  hashData = hash.match(ITEMS_REGEX);
  if (!hashData || hashData.length !== 4) {
    return;
  }

  const label = hashData[2] as ITEM_LABELS;
  let item = hashData[3];

  // hashData[0] = original string
  // hashData[1] = item name
  // hashData[2] = item property
  const itemProperties = item.match(PROPERTIES_REGEX);
  if (itemProperties && itemProperties.length === 3) {
    item = itemProperties[1];
  }

  return {
    schema: removeHash(hashData[1]),
    label,
    item,
  };
}
