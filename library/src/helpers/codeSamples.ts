import { ChannelInterface, OperationInterface, ServerInterface } from '@asyncapi/parser';
import { MessageHelpers } from './message';

export interface CodeSample {
  language: string;
  label: string;
  code: string;
}

export interface OperationExamples {
  prompt: string;
  samples: CodeSample[];
  markdown: string;
}

function firstServer(operation: OperationInterface, channel?: ChannelInterface): ServerInterface | undefined {
  const servers =
    channel?.servers?.().all?.() ||
    operation.servers?.().all?.() ||
    [];
  return servers[0];
}

function firstPayloadExample(operation: OperationInterface): unknown {
  const message = operation.messages().all()[0];
  if (!message) return {};
  const examples = MessageHelpers.getPayloadExamples(message);
  if (examples && examples.length) {
    return examples[0].example;
  }
  try {
    const payload = message.payload();
    if (payload) {
      return MessageHelpers.generateExample(payload, {}) || {};
    }
  } catch (e) {
    // ignore
  }
  return {};
}

export function generateOperationExamples(
  operation: OperationInterface,
  channel?: ChannelInterface,
  languages: string[] = ['curl', 'javascript', 'python'],
): OperationExamples {
  const server = firstServer(operation, channel);
  const protocol = server?.protocol() ?? 'unknown';
  const url = server?.url() ?? 'https://example.com';
  const address = channel?.address() ?? operation.channels().all()[0]?.address() ?? '';
  const payload = firstPayloadExample(operation) ?? {};
  const payloadJson = JSON.stringify(payload, null, 2) ?? '{}';
  const operationId = operation.id() || operation.action();
  const reply = operation.reply?.();

  const prompt = [
    `You are an agent integrating with an AsyncAPI-described service.`,
    `To invoke operation "${operationId}" (${operation.action()}), connect to server "${url}" using protocol "${protocol}".`,
    `Use channel/address "${address}".`,
    `Send a message with this payload:`,
    payloadJson,
    reply ? `Expect a reply according to the AsyncAPI reply definition.` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const samples: CodeSample[] = [];

  if (languages.includes('curl')) {
    const isHttp = protocol.toLowerCase().includes('http');
    const code = isHttp
      ? `curl -X POST "${url}${address ? '/' + address.replace(/^\/+/, '') : ''}" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(payload)}'`
      : `# Protocol: ${protocol}\n# Server: ${url}\n# Channel: ${address}\n# Payload:\n${payloadJson
          .split('\n')
          .map((line) => `# ${line}`)
          .join('\n')}`;
    samples.push({ language: 'curl', label: 'cURL', code });
  }

  if (languages.includes('javascript')) {
    const isHttp = protocol.toLowerCase().includes('http');
    const isWs = protocol.toLowerCase().includes('ws');
    let code = '';
    if (isHttp) {
      code = `const response = await fetch("${url}${address ? '/' + address.replace(/^\/+/, '') : ''}", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(${JSON.stringify(payload)}),\n});\nconst data = await response.json();\nconsole.log(data);`;
    } else if (isWs) {
      code = `const ws = new WebSocket("${url}");\nws.onopen = () => {\n  ws.send(JSON.stringify(${JSON.stringify(payload)}));\n};\nws.onmessage = (event) => {\n  console.log("received", event.data);\n};`;
    } else {
      code = `// Protocol: ${protocol}\n// Connect to ${url}\n// Channel: ${address}\nconst payload = ${JSON.stringify(payload, null, 2)};\nconsole.log("publish", payload);`;
    }
    samples.push({ language: 'javascript', label: 'JavaScript', code });
  }

  if (languages.includes('python')) {
    const isHttp = protocol.toLowerCase().includes('http');
    const isWs = protocol.toLowerCase().includes('ws');
    let code = '';
    if (isHttp) {
      code = `import requests\n\nresponse = requests.post(\n    "${url}${address ? '/' + address.replace(/^\/+/, '') : ''}",\n    json=${JSON.stringify(payload)},\n)\nprint(response.json())`;
    } else if (isWs) {
      code = `import asyncio\nimport websockets\nimport json\n\nasync def main():\n    async with websockets.connect("${url}") as ws:\n        await ws.send(json.dumps(${JSON.stringify(payload)}))\n        print(await ws.recv())\n\nasyncio.run(main())`;
    } else {
      const pyPayload = JSON.stringify(payload ?? {}, null, 4) ?? '{}';
      code = `# Protocol: ${protocol}\n# Server: ${url}\n# Channel: ${address}\npayload = ${pyPayload.replace(/true/g, 'True').replace(/false/g, 'False').replace(/null/g, 'None')}\nprint(payload)`;
    }
    samples.push({ language: 'python', label: 'Python', code });
  }

  const markdown = [
    `## Example Request: ${operationId}`,
    '',
    '### Agent/LLM Prompt',
    '```text',
    prompt,
    '```',
    '',
    ...samples.map((sample) => [`### ${sample.label}`, '```', sample.code, '```', '']).flat(),
  ].join('\n');

  return { prompt, samples, markdown };
}
