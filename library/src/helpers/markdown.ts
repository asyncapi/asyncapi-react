import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

export interface MarkdownExportOptions {
  includeExamples?: boolean;
  includeSchemas?: boolean;
}

function codeBlock(value: unknown, language = 'json'): string {
  return `\`\`\`${language}\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

export function asyncApiToMarkdown(
  document: AsyncAPIDocumentInterface,
  options: MarkdownExportOptions = {},
): string {
  const { includeExamples = true, includeSchemas = true } = options;
  const lines: string[] = [];
  const info = document.info();

  lines.push(`# ${info.title()}`);
  if (info.version()) {
    lines.push('');
    lines.push(`**Version:** ${info.version()}`);
  }
  if (info.description()) {
    lines.push('');
    lines.push(info.description()!);
  }

  const servers = document.servers().all();
  if (servers.length) {
    lines.push('');
    lines.push('## Servers');
    servers.forEach((server) => {
      lines.push('');
      lines.push(`### ${server.id()}`);
      lines.push(`- URL: \`${server.url()}\``);
      lines.push(`- Protocol: \`${server.protocol()}\``);
      if (server.hasDescription()) {
        lines.push('');
        lines.push(server.description()!);
      }
    });
  }

  const operations = document.operations().all();
  if (operations.length) {
    lines.push('');
    lines.push('## Operations');
    operations.forEach((operation) => {
      const channel = operation.channels().all()[0];
      lines.push('');
      lines.push(`### ${operation.id() ?? operation.action()}`);
      lines.push(`- Action: \`${operation.action()}\``);
      if (channel?.address()) {
        lines.push(`- Channel: \`${channel.address()}\``);
      }
      if (operation.summary()) {
        lines.push(`- Summary: ${operation.summary()}`);
      }
      if (operation.hasDescription()) {
        lines.push('');
        lines.push(operation.description()!);
      }
      const messages = operation.messages().all();
      if (messages.length) {
        lines.push('');
        lines.push('#### Messages');
        messages.forEach((message) => {
          lines.push(`- \`${message.id()}\``);
          if (message.hasDescription()) {
            lines.push(`  ${message.description()!}`);
          }
          if (includeExamples) {
            const payload = message.payload();
            if (payload?.examples()?.length) {
              lines.push('');
              lines.push(codeBlock(payload.examples()));
            }
          }
        });
      }
    });
  }

  const messages = document.messages().all();
  if (messages.length) {
    lines.push('');
    lines.push('## Messages');
    messages.forEach((message) => {
      lines.push('');
      lines.push(`### ${message.id()}`);
      if (message.hasDescription()) {
        lines.push(message.description()!);
      }
      const payload = message.payload();
      if (payload) {
        lines.push('');
        lines.push(`Payload type: \`${String(payload.type() ?? 'object')}\``);
      }
    });
  }

  if (includeSchemas) {
    const schemas = document.schemas().all();
    if (schemas.length) {
      lines.push('');
      lines.push('## Schemas');
      schemas.forEach((schema) => {
        lines.push('');
        lines.push(`### ${schema.id()}`);
        if (schema.description()) {
          lines.push(schema.description()!);
        }
        lines.push(`- Type: \`${String(schema.type() ?? 'object')}\``);
        const properties = schema.properties();
        if (properties) {
          lines.push('- Properties:');
          Object.keys(properties).forEach((name) => {
            const property = properties[name];
            lines.push(
              `  - \`${name}\`: \`${String(property?.type() ?? 'any')}\``,
            );
          });
        }
      });
    }
  }

  return lines.join('\n').trim() + '\n';
}

export function generateLlmsTxt(
  document: AsyncAPIDocumentInterface,
  markdownUrl = './asyncapi.md',
): string {
  const info = document.info();
  const lines: string[] = [];
  lines.push(`# ${info.title()}`);
  lines.push('');
  if (info.description()) {
    lines.push(`> ${info.description()!.split('\n')[0]}`);
    lines.push('');
  }
  lines.push('## Docs');
  lines.push('');
  lines.push(
    `- [AsyncAPI Documentation](${markdownUrl}): Full specification in Markdown`,
  );
  lines.push('');
  const operations = document.operations().all();
  if (operations.length) {
    lines.push('## Operations');
    lines.push('');
    operations.forEach((operation) => {
      const channel = operation.channels().all()[0];
      const label = operation.id() ?? operation.action();
      const anchor = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      lines.push(
        `- [${label}](#${anchor}): ${operation.action()} ${channel?.address() ?? ''}`.trim(),
      );
    });
    lines.push('');
  }
  return lines.join('\n');
}
