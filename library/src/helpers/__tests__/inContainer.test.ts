import { CONTAINER_LABELS, ITEM_LABELS } from '../../constants';
import { inContainer } from '../inContainer';

describe('inContainer', () => {
  test('should be equal', () => {
    expect(inContainer(ITEM_LABELS.CHANNEL)).toBe(CONTAINER_LABELS.CHANNELS);
  });

  test('should be empty', () => {
    expect(inContainer('' as ITEM_LABELS)).toBe('');
  });
});
