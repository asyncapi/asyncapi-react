import merge from 'merge';
import {
  AsyncApi,
  Schema,
  Message,
  Servers,
  ServerVariable,
  isRawMessage,
  Channels,
  Parameters,
  Operation,
} from '../types';

import renderMarkdown from './renderMarkdown';

class Beautifier {
  beautify(asyncApi: AsyncApi): AsyncApi {
    asyncApi.info.description = this.renderMd(asyncApi.info
      .description as string);
    if (asyncApi.servers) {
      asyncApi.servers = this.beautifyServers(asyncApi.servers);
    }

    asyncApi.channels = this.beautifyChannels(asyncApi.channels);

    if (asyncApi.components) {
      if (asyncApi.components.messages) {
        asyncApi.components.messages = this.beautifyMessages(
          asyncApi.components.messages,
        );
      }
      if (asyncApi.components.schemas) {
        asyncApi.components.schemas = this.beautifySchemas(
          asyncApi.components.schemas,
        );
      }
    }

    return asyncApi;
  }

  private resolveAllOf(schema: Schema): Schema {
    if (schema.allOf) {
      const schemas: Schema[] = [];
      schema.allOf.forEach(s => {
        schemas.push(this.resolveAllOf(s));
      });

      return merge.recursive(...schemas);
    }

    if (schema.properties) {
      const transformed: Record<string, Schema> = {};

      for (const key of Object.keys(schema.properties)) {
        if (schema.properties[key].allOf) {
          transformed[key] = this.resolveAllOf(schema.properties[key]);
          continue;
        }
        transformed[key] = schema.properties[key];
      }

      return { ...schema, properties: transformed };
    }

    return schema;
  }

  private beautifySchema(schema: Schema): Schema {
    if (schema.properties) {
      const properties = schema.properties;
      const newProperties: Record<string, Schema> = properties;

      for (const key of Object.keys(properties)) {
        const prop = properties[key];

        if (prop.description) {
          prop.description = this.renderMd(prop.description as string);
        }
        if (prop.properties) {
          const propProperties = prop.properties;
          const newPropProperties: Record<string, Schema> = {};

          for (const propKey of Object.keys(propProperties)) {
            newPropProperties[propKey] = this.beautifySchema(
              propProperties[propKey],
            );
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

      for (const key of Object.keys(additionalProperties)) {
        const prop = additionalProperties[key];

        if (prop.description) {
          prop.description = this.renderMd(prop.description as string);
        }
        if (prop.additionalProperties) {
          const propAdditionalProperties = prop.additionalProperties;
          const newPropAdditionalProperties: Record<string, Schema> = {};

          for (const propKey of Object.keys(propAdditionalProperties)) {
            newPropAdditionalProperties[propKey] = this.beautifySchema(
              propAdditionalProperties[propKey],
            );
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
    schemas: Record<string, Schema>,
  ): Record<string, Schema> {
    const newSchemas: Record<string, Schema> = {};
    for (const key of Object.keys(schemas)) {
      newSchemas[key] = this.resolveAllOf(schemas[key]);
      newSchemas[key] = this.beautifySchema(newSchemas[key]);
    }
    return newSchemas;
  }

  private beautifyMessage(message: Message): Message {
    if (!isRawMessage(message)) {
      const beautified = {
        oneOf: message.oneOf.map(this.beautifyMessage),
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
      message.summary = this.renderMd(message.summary as string);
    }

    if (message.description) {
      message.description = this.renderMd(message.description as string);
    }

    if (message.headers) {
      message.headers = this.beautifySchema(message.headers);
    }
    if (message.payload) {
      message.payload = this.beautifySchema(message.payload);
    }

    return message;
  }

  private beautifyMessages(
    messages: Record<string, Message>,
  ): Record<string, Message> {
    const newMessages: Record<string, Message> = {};
    for (const key of Object.keys(messages)) {
      newMessages[key] = this.beautifyMessage(messages[key]);
    }
    return newMessages;
  }

  private beautifyServers(servers: Servers): Servers {
    const copiedServers = JSON.parse(JSON.stringify(servers || {})) as Servers;

    Object.keys(copiedServers).forEach(stage => {
      const server = copiedServers[stage];
      server.description = this.renderMd(server.description as string);

      if (server.variables) {
        const variables = server.variables;
        const newVariables: Record<string, ServerVariable> = variables;

        for (const key of Object.keys(variables)) {
          newVariables[key].description = this.renderMd(variables[key]
            .description as string);
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

    if (!isRawMessage(operation.message)) {
      const messages = [...operation.message.oneOf.map(elem => ({ ...elem }))];
      messages.map(arg => this.beautifyMessage(arg));
      return { ...operation, message: { oneOf: messages } };
    }

    return { ...operation, message: this.beautifyMessage(operation.message) };
  }

  private beautifyChannels(channels: Channels): Channels {
    const newChannels: Channels = {};
    for (const key of Object.keys(channels)) {
      newChannels[key] = {};

      const channel = channels[key];

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
    Object.keys(params).map(key => {
      const prop = params[key];
      if (prop.description) {
        prop.description = this.renderMd(prop.description as string);
      }

      newParams[key] = prop;
    });
    return newParams;
  }

  // private beautifySecurity(asyncApi: AsyncApi): SecurityRequirement[] {
  //   const { components, security } = asyncApi;
  //   const securityRequirements: SecurityRequirement[] = [];

  //   security!.forEach(sec => {
  //     const name = Object.keys(sec)[0];
  //     if (
  //       !components ||
  //       !components.securitySchemes ||
  //       !components.securitySchemes[name]
  //     ) {
  //       throw new Error(
  //         `Security definition "${name}" is not included in #/components/securitySchemes.`,
  //       );
  //     }

  //     const securityComponent = components.securitySchemes[name];
  //     securityComponent.description = this.renderMd(
  //       securityComponent.description as string,
  //     );
  //     securityRequirements.push(securityComponent);
  //   });

  //   return securityRequirements;
  // }

  private renderMd(md?: string) {
    return renderMarkdown(md);
  }
}

export const beautifier = new Beautifier();
