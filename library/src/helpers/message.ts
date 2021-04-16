import { Message } from '@asyncapi/parser';
// @ts-ignore
import { sample } from 'openapi-sampler';

export class MessageHelpers {
  static generateExample(schema: any, options: any = {}) {
    try {
      return this.sanitizeExample(sample(schema, options)) || '';
    } catch (e) {
      return '';
    }
  }

  static sanitizeExample(schema: any): any {
    if (typeof schema === 'object' && schema && !Array.isArray(schema)) {
      return Object.entries(schema).reduce((obj, [propertyName, property]) => {
        if (
          !propertyName.startsWith('x-parser-') &&
          !propertyName.startsWith('x-schema-private-')
        ) {
          obj[propertyName] = this.sanitizeExample(property);
        }
        return obj;
      }, {});
    }
    return schema;
  }

  static getPayloadExamples(msg: Message): any[] | undefined {
    const examples = msg.examples();
    if (Array.isArray(examples) && examples.some(e => e.payload)) {
      return examples.flatMap(e => e.payload).filter(Boolean);
    }

    const payload = msg.payload();
    if (payload && payload.examples()) {
      return payload.examples();
    }
    return;
  }

  static getHeadersExamples(msg: Message): any[] | undefined {
    const examples = msg.examples();
    if (Array.isArray(examples) && examples.some(e => e.headers)) {
      return examples.flatMap(e => e.headers).filter(Boolean);
    }

    const headers = msg.headers();
    if (headers && headers.examples()) {
      return headers.examples();
    }
    return;
  }
}
