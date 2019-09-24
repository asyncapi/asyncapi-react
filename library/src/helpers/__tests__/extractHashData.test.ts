import { CSS_PREFIX, CONTAINER_LABELS, ITEM_LABELS } from '../../constants';
import { extractHashData, HashData } from '../extractHashData';

describe('extractHashData', () => {
  const schema = CSS_PREFIX;
  const container = CONTAINER_LABELS.CHANNELS;
  const item = ITEM_LABELS.CHANNEL;
  const itemName = `foo-bar`;
  const property = `parameters`;

  test('extract only container and schema', () => {
    const hash = `${schema}--${container}`;
    const expectedResult: HashData = {
      schema,
      label: container,
    };

    expect(extractHashData(hash)).toStrictEqual(expectedResult);
  });

  test('extract whole parameters', () => {
    const hash = `${schema}--${item}--${itemName}`;
    const expectedResult: HashData = {
      schema,
      label: item,
      item: itemName,
    };

    expect(extractHashData(hash)).toStrictEqual(expectedResult);
  });

  test('extract with additional property of item', () => {
    const hash = `${schema}--${item}--${itemName}--${property}`;
    const expectedResult: HashData = {
      schema,
      label: item,
      item: itemName,
    };

    expect(extractHashData(hash)).toStrictEqual(expectedResult);
  });

  test('extract non default schema', () => {
    const nonDefaultSchema = `non-default-schema`;
    const hash = `${nonDefaultSchema}--${item}--${itemName}--${property}`;
    const expectedResult: HashData = {
      schema: nonDefaultSchema,
      label: item,
      item: itemName,
    };

    expect(extractHashData(hash)).toStrictEqual(expectedResult);
  });

  test('remove hash char in schema', () => {
    const hash = `#${schema}--${item}--${itemName}--${property}`;
    const expectedResult: HashData = {
      schema,
      label: item,
      item: itemName,
    };

    expect(extractHashData(hash)).toStrictEqual(expectedResult);
  });
});
