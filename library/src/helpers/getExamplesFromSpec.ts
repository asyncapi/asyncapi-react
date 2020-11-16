import { Example } from '../types';

export type Type = 'payload' | 'headers';

export const getExamplesFromSpec = (examples: Example[], type: Type) =>
  (examples.map(el => el[type]).filter(Boolean) as any) as object[];
