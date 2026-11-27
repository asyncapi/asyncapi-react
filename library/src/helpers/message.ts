import { MessageInterface } from '@asyncapi/parser';
import { sample } from 'openapi-sampler';

import { MessageExample } from '../types';

export type GeneratedExampleResult =
  | { hasExample: true; value: unknown }
  | { hasExample: false };

function hasDirectNullSample(record: Record<string, unknown>): boolean {
  const { example, const: constVal, default: defaultVal } = record;
  if (example === null || constVal === null || defaultVal === null) {
    return true;
  }
  const hasNullListFirst = (value: unknown) =>
    Array.isArray(value) && value[0] === null;
  if (hasNullListFirst(record.examples) || hasNullListFirst(record.enum)) {
    return true;
  }
  return (
    record.type === 'null' ||
    (Array.isArray(record.type) && record.type[0] === 'null')
  );
}

function hasExplicitNullSample(
  schema: unknown,
  seen = new Set<unknown>(),
): boolean {
  if (!schema || typeof schema !== 'object' || seen.has(schema)) {
    return false;
  }
  seen.add(schema);

  const record = schema as Record<string, unknown>;
  if (hasDirectNullSample(record)) {
    return true;
  }
  if (Array.isArray(record.oneOf) && record.oneOf.length > 0) {
    return hasExplicitNullSample(record.oneOf[0], seen);
  }
  if (Array.isArray(record.anyOf) && record.anyOf.length > 0) {
    return hasExplicitNullSample(record.anyOf[0], seen);
  }
  return (
    Array.isArray(record.allOf) &&
    record.allOf.some((subSchema) => hasExplicitNullSample(subSchema, seen))
  );
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MessageHelpers {
  static generateExampleValue(
    schema: unknown,
    options: Parameters<typeof sample>[1] = {},
  ): GeneratedExampleResult {
    try {
      const generated: unknown = this.sanitizeExample(
        sample(schema as Parameters<typeof sample>[0], options),
      );
      if (
        generated === undefined ||
        (generated === null && !hasExplicitNullSample(schema))
      ) {
        return { hasExample: false };
      }
      return { hasExample: true, value: generated };
    } catch (e) {
      return { hasExample: false };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static generateExample(schema: any, options: any = {}) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = this.generateExampleValue(schema, options);
    return result.hasExample ? result.value : '';
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

  static getPayloadExamples(
    msg: MessageInterface,
  ): MessageExample[] | undefined {
    const examples = msg.examples().all();

    if (examples.some((e) => e.payload() !== undefined)) {
      const messageExamples = examples
        .flatMap((e) => {
          const examplePayload: unknown = e.payload();
          if (examplePayload === undefined) {
            return;
          }
          return {
            name: e.name(),
            summary: e.summary(),
            example: examplePayload,
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

  static getHeadersExamples(
    msg: MessageInterface,
  ): MessageExample[] | undefined {
    const examples = msg.examples().all();
    if (examples.some((e) => e.hasHeaders())) {
      const messageExamples = examples
        .flatMap((e) => {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return headers.examples()?.map((example) => ({ example }));
    }
    return undefined;
  }
}
