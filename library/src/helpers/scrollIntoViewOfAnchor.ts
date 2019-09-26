import { extractHashData } from './extractHashData';
import { removeSpecialChars } from './removeSpecialChars';

function parseHashForDataId(hash: string) {
  const hashData = extractHashData(hash);
  if (!hashData || !Object.keys(hashData).length) {
    return;
  }

  const { item } = hashData;
  if (!item) {
    return hash;
  }

  return hash.replace('#', '').replace(item, removeSpecialChars(item));
}

export function scroll(target: HTMLElement | null): void {
  if (!target) {
    return;
  }

  const scrollIntoView = target.scrollIntoView;
  if (typeof scrollIntoView === 'function') {
    target.scrollIntoView(true);
    return;
  }

  let top = 0;
  while (target) {
    top += target.offsetTop;
    target = target && (target.offsetParent as HTMLElement);
  }
  window.scrollTo(0, top);
}

export function scrollIntoViewOfAnchor(hash: string): void {
  let target: HTMLElement | null;
  try {
    target = document.querySelector<HTMLElement>(hash);
    scroll(target);
  } catch (e) {
    try {
      setTimeout(() => {
        target = document.querySelector<HTMLElement>(
          `[data-asyncapi-id="${parseHashForDataId(hash)}"]`,
        );
        scroll(target);
      }, 50);
    } catch (e) {
      return;
    }
  }
}
