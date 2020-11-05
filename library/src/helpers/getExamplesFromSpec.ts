import { Example } from '../types';

export type Type = 'payload' | 'headers';

export const getExamplesFromSpec = (examples: Example[], type: Type) => {
  const examplesOfType: object[] = [];
  examples.forEach(el => {
    const ex = el[type];
    if (ex) {
      examplesOfType.push(ex);
    }
  });
  return examplesOfType;
};
