import React, { useMemo } from 'react';
import { useConfig, useSpec } from '../contexts';
import { asyncApiToMarkdown, generateLlmsTxt } from '../helpers/markdown';
import { copyToClipboard, downloadText } from '../helpers/export';

export interface MarkdownExportButtonProps {
  mode: 'copy' | 'download';
  text?: string;
  filename?: string;
  label?: string;
  testId?: string;
}

export const MarkdownExportButton: React.FC<MarkdownExportButtonProps> = ({
  mode,
  text = '',
  filename = 'asyncapi.md',
  label,
  testId,
}) => {
  const handleClick = async () => {
    if (mode === 'copy') {
      await copyToClipboard(text);
    } else {
      downloadText(filename, text);
    }
  };

  const defaultLabel =
    mode === 'copy' ? 'Copy as Markdown' : 'Download as Markdown';

  return (
    <button
      type="button"
      data-testid={testId ?? `markdown-export-${mode}`}
      onClick={handleClick}
      className="border border-gray-300 rounded px-3 py-1 text-xs uppercase font-bold hover:bg-gray-100"
    >
      {label ?? defaultLabel}
    </button>
  );
};

export const MarkdownExportBar: React.FC = () => {
  const asyncapi = useSpec();
  const config = useConfig();
  const llm = config.llm ?? {};
  if (llm.markdownExport === false) return null;

  const markdown = useMemo(() => asyncApiToMarkdown(asyncapi), [asyncapi]);

  return (
    <div
      className="flex gap-2 px-8 py-2"
      data-testid="markdown-export-bar"
    >
      <MarkdownExportButton
        mode="copy"
        text={markdown}
        filename="asyncapi.md"
        testId="markdown-export-copy"
      />
      <MarkdownExportButton
        mode="download"
        text={markdown}
        filename="asyncapi.md"
        testId="markdown-export-download"
      />
    </div>
  );
};

export { generateLlmsTxt };
