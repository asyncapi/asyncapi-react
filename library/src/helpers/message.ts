import { sample } from 'openapi-sampler';

import { MessageExample } from '../types';
import type { SchemaLike } from './schema-no-parser';

// Structural interface for a single message example. The `has*` predicates are optional
// because older message models only expose the value accessors.
export interface MessageExampleLike {
  hasPayload?(): boolean;
  payload?(): unknown;
  hasHeaders?(): boolean;
  headers?(): unknown;
  name(): string | undefined;
  summary(): string | undefined;
}

// Structural interface covering all message methods used by Message.tsx and MessageHelpers
export interface MessageLike {
  id?(): string | undefined;
  title?(): string | undefined;
  summary?(): string | undefined;
  description?(): string | undefined;
  hasDescription?(): boolean;
  contentType?(): string | undefined;
  correlationId?():
    | {
        location(): string | undefined;
        hasDescription(): boolean;
        description(): string | undefined;
      }
    | undefined;
  externalDocs?(): { url(): string } | undefined;
  payload(): SchemaLike | undefined;
  headers(): SchemaLike | undefined;
  bindings?(): { length: number; all(): unknown[] };
  tags?(): {
    length: number;
    all(): {
      name(): string;
      description(): string | undefined;
      externalDocs(): { url(): string } | undefined;
    }[];
  };
  examples(): {
    all(): MessageExampleLike[];
  };
}

// `hasPayload`/`hasHeaders` are optional. When a model omits the predicate, presence is
// inferred from the value accessor; an explicit `true`/`false` always wins.
function declaresPart(declared: boolean | undefined, value: unknown): boolean {
  return declared ?? value !== undefined;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MessageHelpers {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static generateExample(schema: any, options: any = {}) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
      return this.sanitizeExample(sample(schema, options)) || '';
    } catch (e) {
      return '';
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static sanitizeExample(schema: any): any {
    if (typeof schema === 'object' && schema && !Array.isArray(schema)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return Object.entries(schema).reduce(
        (obj, [propertyName, property]) => {
          if (
            !propertyName.startsWith('x-parser-') &&
            !propertyName.startsWith('x-schema-private-')
          ) {
            obj[propertyName] = this.sanitizeExample(property);
          }
          return obj;
        },
        {} as Record<string, unknown>,
      );
    }
    return schema;
  }

  static getPayloadExamples(msg: MessageLike): MessageExample[] | undefined {
    const examples = msg.examples().all();

    if (examples.some((e) => declaresPart(e.hasPayload?.(), e.payload?.()))) {
      const messageExamples = examples
        .flatMap((e) => {
          const payload = e.payload?.();
          if (
            !declaresPart(e.hasPayload?.(), payload) ||
            payload === undefined
          ) {
            return;
          }
          return {
            name: e.name(),
            summary: e.summary(),
            example: payload,
          };
        })
        .filter(Boolean) as MessageExample[];

      if (messageExamples.length > 0) {
        return messageExamples;
      }
    }

    const payload = msg.payload();
    if (payload?.examples()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return payload.examples()?.map((example) => ({ example }));
    }

    return undefined;
  }

  static getHeadersExamples(msg: MessageLike): MessageExample[] | undefined {
    const examples = msg.examples().all();
    if (examples.some((e) => declaresPart(e.hasHeaders?.(), e.headers?.()))) {
      const messageExamples = examples
        .flatMap((e) => {
          const headers = e.headers?.();
          if (
            !declaresPart(e.hasHeaders?.(), headers) ||
            headers === undefined
          ) {
            return;
          }
          return {
            name: e.name(),
            summary: e.summary(),
            example: headers,
          };
        })
        .filter(Boolean) as MessageExample[];

      if (messageExamples.length > 0) {
        return messageExamples;
      }
    }

    const headers = msg.headers();
    if (headers?.examples()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return headers.examples()?.map((example) => ({ example }));
    }
    return undefined;
  }
}
