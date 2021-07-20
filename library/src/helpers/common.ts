import { ConfigInterface } from '../config';

export class CommonHelpers {
  static getIdentifier(id: string, config?: ConfigInterface) {
    const schemaID = config?.schemaID;
    if (schemaID) {
      return `${schemaID}-${id}`;
    }
    return id;
  }
}
