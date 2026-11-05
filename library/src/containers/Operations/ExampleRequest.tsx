import React from 'react';
import { ChannelInterface, OperationInterface } from '@asyncapi/parser';
import { useConfig } from '../../contexts';
import { generateOperationExamples } from '../../helpers/codeSamples';
import { copyToClipboard, downloadText } from '../../helpers/export';

interface Props {
  operation: OperationInterface;
  channel?: ChannelInterface;
}

export const ExampleRequestPanel: React.FC<Props> = ({
  operation,
  channel,
}) => {
  const config = useConfig();
  const languages = config.llm?.languages ?? ['curl', 'javascript', 'python'];
  const examples = generateOperationExamples(operation, channel, languages);

  const handleCopy = async () => {
    await copyToClipboard(examples.markdown);
  };

  const handleDownload = () => {
    downloadText(
      `${operation.id() ?? 'operation'}-example.md`,
      examples.markdown,
    );
  };

  return (
    <section
      className="mt-4 border rounded p-4"
      data-testid="operation-example-request"
    >
      <h4 className="text-sm font-bold uppercase mb-2">Example Request</h4>
      <div className="mb-2" data-testid="operation-example-prompt">
        <pre className="whitespace-pre-wrap text-xs">{examples.prompt}</pre>
      </div>
      {examples.samples.map((sample) => (
        <div key={sample.language} className="mt-3">
          <h5 className="text-xs font-bold mb-1">{sample.label}</h5>
          <pre
            className="bg-gray-100 rounded p-2 overflow-auto text-xs"
            data-testid={`operation-example-code-${sample.language}`}
          >
            {sample.code}
          </pre>
        </div>
      ))}
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          data-testid="operation-copy-markdown"
          onClick={() => void handleCopy()}
          className="border border-gray-300 rounded px-3 py-1 text-xs uppercase font-bold hover:bg-gray-100"
        >
          Copy as Markdown
        </button>
        <button
          type="button"
          data-testid="operation-download-markdown"
          onClick={handleDownload}
          className="border border-gray-300 rounded px-3 py-1 text-xs uppercase font-bold hover:bg-gray-100"
        >
          Download as Markdown
        </button>
      </div>
    </section>
  );
};
