import { sample } from 'openapi-sampler';
import { Schema } from '../types';
export const generateExample = (schema: Schema) => {
  try {
    return sample(schema);
  } catch (e) {
    return;
  }
};
