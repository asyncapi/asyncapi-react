import { MessageInterface } from '@asyncapi/parser';
// @ts-ignore
import { sample } from 'openapi-sampler';

import { MessageExample } from '../types';

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

  static getPayloadExamples(
    msg: MessageInterface,
  ): MessageExample[] | undefined {
    const examples = msg.examples().all();

    if (examples.some(e => e.hasPayload())) {
      const messageExamples = examples
        .flatMap(e => {
          if (!e.payload()) {
            return;
          }
          return {
            name: e.name(),
            summary: e.summary(),
            example: e.payload(),
          };
        })
        .filter(Boolean) as MessageExample[];

      if (messageExamples.length > 0) {
        return messageExamples;
      }
    }

    const payload = msg.payload();
    if (payload?.examples()) {
      return payload.examples()?.map(example => ({ example }));
    }
    return;
  }

  static getHeadersExamples(
    msg: MessageInterface,
  ): MessageExample[] | undefined {
    const examples = msg.examples().all();
    if (examples.some(e => e.hasHeaders())) {
      const messageExamples = examples
        .flatMap(e => {
          if (!e.hasHeaders()) {
            return;
          }
          return {
            name: e.name(),
            summary: e.summary(),
            example: e.headers(),
          };
        })
        .filter(Boolean) as MessageExample[];

      if (messageExamples.length > 0) {
        return messageExamples;
      }
    }

    const headers = msg.headers();
    if (headers?.examples()) {
      return headers.examples()?.map(example => ({ example }));
    }
    return undefined;
  }
}
