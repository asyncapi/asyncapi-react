import {
  AsyncApi,
  Schema,
  Message,
  Servers,
  Topic,
  ServerVariable,
  isRawMessage,
  // SecurityRequirement,
} from '../types';

import renderMarkdown from './renderMarkdown';

class Beautifier {
  beautify(asyncApi: AsyncApi): AsyncApi {
    asyncApi.info.description = this.renderMd(asyncApi.info
      .description as string);
    if (asyncApi.servers) {
      asyncApi.servers = this.beautifyServers(asyncApi.servers);
    }

    if (asyncApi.topics) {
      asyncApi.topics = this.beautifyTopics(asyncApi.topics);
    }
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

      return this.resolveAllOf(Object.assign({}, ...schemas));
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

    message.summary = this.renderMd(message.summary as string);
    message.description = this.renderMd(message.description as string);

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
    const copiedServers = JSON.parse(JSON.stringify(servers)) as Servers;

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

  private beautifyTopics(topics: Record<string, Topic>): Record<string, Topic> {
    const newTopics: Record<string, Topic> = {};
    for (const key of Object.keys(topics)) {
      const topic = topics[key];

      if (topic.publish) {
        if ((topic.publish as any).oneOf) {
          let messages: Message[] = (topic.publish as any).oneOf;
          messages = messages.map(message => this.beautifyMessage(message));

          (topic.publish as any).oneOf = messages;
        } else {
          topic.publish = this.beautifyMessage(topic.publish as Message);
        }
      }

      if (topic.subscribe) {
        if ((topic.subscribe as any).oneOf) {
          let messages: Message[] = (topic.subscribe as any).oneOf;
          messages = messages.map(message => this.beautifyMessage(message));

          (topic.subscribe as any).oneOf = messages;
        } else {
          topic.subscribe = this.beautifyMessage(topic.subscribe as Message);
        }
      }

      if (topic.parameters) {
        topic.parameters = topic.parameters.map(param => {
          param.description = this.renderMd(param.description as string);
          return param;
        });
      }

      newTopics[key] = topic;
    }
    return newTopics;
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
