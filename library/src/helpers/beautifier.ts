import merge from 'merge';
import {
  AsyncAPI,
  Schema,
  Message,
  Servers,
  ServerVariable,
  isRawMessage,
  Channels,
  Parameters,
  Operation,
} from '../types';

import { renderMd } from './renderMarkdown';

class Beautifier {
  beautify(asyncApi: AsyncAPI): AsyncAPI {
    if (asyncApi.info && asyncApi.info.description) {
      asyncApi.info.description = renderMd(asyncApi.info.description as string);
    }
    if (asyncApi.servers) {
      asyncApi.servers = this.beautifyServers(asyncApi.servers);
    }
    if (asyncApi.channels) {
      asyncApi.channels = this.beautifyChannels(asyncApi.channels);
    }

    if (asyncApi.components) {
      asyncApi.components.messages = this.beautifyMessages(
        asyncApi.components.messages,
      );
      asyncApi.components.schemas = this.beautifySchemas(
        asyncApi.components.schemas,
      );
    }

    return asyncApi;
  }

  private resolveAllOf(schema?: Schema): Schema | undefined {
    if (!schema || !Object.keys(schema).length) {
      return schema;
    }

    if (schema.allOf) {
      let schemas: Schema[] = [];
      schema.allOf.forEach(s => {
        schemas.push(this.resolveAllOf(s) || s);
      });
      schemas = schemas.filter(Boolean);

      return merge.recursive(...schemas);
    }

    if (schema.properties) {
      const transformed: Record<string, Schema> = {};

      for (const [key, property] of Object.entries(schema.properties)) {
        if (property.allOf) {
          transformed[key] = this.resolveAllOf(property) || property;
          continue;
        }
        transformed[key] = property;
      }

      return { ...schema, properties: transformed };
    }

    return schema;
  }

  private beautifySchema(schema?: Schema): Schema | undefined {
    if (!schema || !Object.keys(schema).length) {
      return schema;
    }

    if (schema.properties) {
      const properties = schema.properties;
      const newProperties: Record<string, Schema> = properties;

      for (const [key, prop] of Object.entries(properties)) {
        if (prop.description) {
          prop.description = renderMd(prop.description as string);
        }
        if (prop.properties) {
          const propProperties = prop.properties;
          const newPropProperties: Record<string, Schema> = {};

          for (const [propKey, propValue] of Object.entries(propProperties)) {
            newPropProperties[propKey] =
              this.beautifySchema(propValue) || propValue;
          }

          prop.properties = newPropProperties;
        }

        newProperties[key] = prop;
      }
      schema.properties = newProperties;
    }

    if (schema.additionalProperties) {
      const additionalProperties = schema.additionalProperties;
      const newAdditionalProperties: Record<
        string,
        Schema
      > = additionalProperties;

      for (const [key, prop] of Object.entries(additionalProperties)) {
        if (prop.description) {
          prop.description = renderMd(prop.description as string);
        }
        if (prop.additionalProperties) {
          const propAdditionalProperties = prop.additionalProperties;
          const newPropAdditionalProperties: Record<string, Schema> = {};

          for (const [propKey, propValue] of Object.entries(
            propAdditionalProperties,
          )) {
            newPropAdditionalProperties[propKey] =
              this.beautifySchema(propValue) || propValue;
          }
          prop.properties = newPropAdditionalProperties;
        }

        newAdditionalProperties[key] = prop;
      }
      schema.additionalProperties = newAdditionalProperties;
    }

    return schema;
  }

  private beautifySchemas(
    schemas?: Record<string, Schema>,
  ): Record<string, Schema> | undefined {
    if (!schemas || !Object.keys(schemas).length) {
      return schemas;
    }

    const newSchemas: Record<string, Schema> = {};
    for (const [key, schema] of Object.entries(schemas)) {
      newSchemas[key] = this.resolveAllOf(schema) || schema;
      newSchemas[key] = this.beautifySchema(newSchemas[key]) || newSchemas[key];
    }
    return newSchemas;
  }

  private beautifyMessage(message: Message): Message {
    if (!isRawMessage(message)) {
      const beautified = {
        ...message,
        oneOf: message.oneOf.map(el => this.beautifyMessage(el)),
      } as Message;

      return beautified;
    }
    if (message.payload) {
      message.payload = this.resolveAllOf(message.payload);
    }
    if (message.headers) {
      message.headers = this.resolveAllOf(message.headers);
    }
    if (message.summary) {
      message.summary = renderMd(message.summary as string);
    }
    if (message.description) {
      message.description = renderMd(message.description as string);
    }

    return message;
  }

  private beautifyMessages(
    messages?: Record<string, Message>,
  ): Record<string, Message> | undefined {
    if (!messages || !Object.keys(messages).length) {
      return messages;
    }

    const newMessages: Record<string, Message> = {};
    for (const [key, message] of Object.entries(messages)) {
      newMessages[key] = this.beautifyMessage(message);
    }
    return newMessages;
  }

  private beautifyServers(servers: Servers): Servers {
    const copiedServers = JSON.parse(JSON.stringify(servers || {})) as Servers;

    Object.entries(copiedServers).forEach(([_, server]) => {
      server.description = renderMd(server.description as string);

      if (server.variables) {
        const variables = server.variables;
        const newVariables: Record<string, ServerVariable> = variables;

        for (const [key, variable] of Object.entries(variables)) {
          newVariables[key].description = renderMd(
            variable.description as string,
          );
        }
        server.variables = newVariables;
      }
    });

    return copiedServers;
  }

  private beautifyOperation(operation: Operation): Operation {
    if (!operation.message) {
      return operation;
    }
    return { ...operation, message: this.beautifyMessage(operation.message) };
  }

  private beautifyChannels(channels: Channels): Channels {
    const newChannels: Channels = {};
    for (const [key, channel] of Object.entries(channels)) {
      newChannels[key] = {};

      const publish = channel.publish;
      if (publish) {
        newChannels[key].publish = this.beautifyOperation(publish);
      }

      const subscribe = channel.subscribe;
      if (subscribe) {
        newChannels[key].subscribe = this.beautifyOperation(subscribe);
      }

      if (channel.parameters) {
        newChannels[key].parameters = this.beautifyParameters(
          channel.parameters,
        );
      }

      newChannels[key] = channel;
    }
    return newChannels;
  }

  private beautifyParameters(params: Parameters): Parameters {
    const newParams: Parameters = {};
    Object.entries(params).map(([key, prop]) => {
      if (prop.description) {
        prop.description = renderMd(prop.description as string);
      }

      newParams[key] = prop;
    });
    return newParams;
  }
}

export const beautifier = new Beautifier();
