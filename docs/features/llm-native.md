# LLM-Native AsyncAPI React Component — Implementation Plan

Issue: https://github.com/asyncapi/asyncapi-react/issues/1383

## 1. Goal

Make the rendered AsyncAPI documentation consumable by LLMs and agents by adding:

1. A clean Markdown export of the rendered specification.
2. `llms.txt` support following https://llmstxt.org/.
3. Per-operation "Example Request" panels with:
   - a ready-to-use agent/LLM prompt,
   - multi-language code samples (cURL, JavaScript, Python, ...),
   - copy/download as Markdown.
4. Document-level and per-operation copy/download `.md` actions.

The React component itself cannot own an HTTP route, so `llms.txt` exposure is split between:
- a pure generator in the library (`generateLlmsTxt`),
- an opt-in callback/prop for host applications (`onMarkdownReady`),
- concrete route handlers in the playground and (optionally) the web component host.

## 2. Non-goals / constraints

- Do not break existing rendering, plugin slots, or tests.
- Keep all new functionality additive and tree-shakeable.
- Avoid new runtime dependencies where possible; reuse `openapi-sampler`, `marked`, and browser APIs (`Blob`, `navigator.clipboard`).
- Preserve SSR/JSdom compatibility (no unconditional `window` access without guards).

## 3. Proposed architecture

### 3.1 New modules

```
library/src/helpers/markdown.ts          # AsyncAPIDocument -> Markdown
library/src/helpers/llmsTxt.ts           # Markdown + metadata -> llms.txt
library/src/helpers/codeSamples.ts       # Operation -> language snippets
library/src/helpers/export.ts            # copy/download helpers
library/src/components/Export/           # buttons + panels
library/src/containers/Operations/ExampleRequest.tsx
```

### 3.2 Config additions

```ts
export interface LlmNativeConfig {
  markdownExport?: boolean;        // document-level button (default true)
  exampleRequests?: boolean;       // per-operation panels (default true)
  languages?: string[];           // default ['curl','javascript','python']
  llmsTxt?: boolean;              // expose generator hook (default false)
}

export interface ConfigInterface {
  // ... existing
  llm?: LlmNativeConfig;
}
```

### 3.3 Context

Add a `MarkdownContext` exposing the generated markdown string for the current document so any component (button, plugin) can reuse it without regenerating:

```ts
const markdown = useMarkdown(); // string | undefined
```

Generate lazily in `AsyncApiLayout` with `useMemo`, invalidate on `asyncapi` change.

### 3.4 Component tree changes

`AsyncApiLayout`:
- render `<MarkdownExportBar />` after `<Info />` (or as a sticky header action).
- wrap children in `MarkdownContext.Provider`.

`Operation`:
- render `<ExampleRequestPanel operation channel type />` at the end of `OperationInfo` or after messages.
- keep it behind `config.llm?.exampleRequests !== false`.

## 4. Markdown serializer design

`asyncApiToMarkdown(document, options)` returns deterministic Markdown:

Sections (in order):
1. `# {info.title} {version}`
2. Description (info.description rendered as-is, already Markdown)
3. `## Servers`
4. `## Channels` / `## Operations`
5. `## Messages`
6. `## Schemas`
7. `## Security`

Rules:
- Use fenced code blocks with language tags for payloads/examples.
- Escape headings in user content? Keep minimal; rely on Markdown already present.
- Sort keys for deterministic output (important for tests and caching).
- Provide `maxDepth` and `includeExamples` options.

Implementation strategy:
- Traverse `document.operations().all()`, `document.channels()`, etc.
- Reuse `MessageHelpers.getPayloadExamples` for examples.
- Reuse schema rendering by converting JSON Schema to fenced JSON (not full HTML schema).

Unit tests: golden-file comparison for v2 and v3 fixtures (streetlights, kraken).

## 5. Code sample generation

`generateOperationExamples(operation, channel, server, options)` returns:

```ts
interface OperationExamples {
  prompt: string;            // LLM/agent prompt
  samples: { language: string; label: string; code: string }[];
  markdown: string;          // combined panel as Markdown
}
```

Language adapters:
- `curl`: HTTP-like request when protocol is http/https; otherwise a commented placeholder + payload.
- `javascript`: `fetch`/`WebSocket`/`mqtt`/`kafka` snippet based on protocol.
- `python`: `requests`/`websockets`/`paho`/`kafka-python`.

Prompt template:
```
You are an agent. To invoke {operationId} on {channel}, connect to {serverUrl}
using {protocol}. Send a message with this payload: {exampleJson}.
Wait for a reply on {replyChannel} if applicable.
```

Protocol detection via `server.protocol()`. Keep adapters as a registry so users can register custom languages (plugin-friendly).

## 6. Export (copy/download) helpers

```ts
export async function copyText(text: string): Promise<boolean>;
export function downloadText(filename: string, text: string, mime?: string): void;
```

- `copyText` uses `navigator.clipboard.writeText` with a `textarea` fallback for jsdom/older browsers.
- `downloadText` creates an object URL and clicks a temporary anchor; revoke after.

Components:
- `<MarkdownExportButton mode="copy" | "download" />`
- `<MarkdownExportBar />` (document-level)
- Per-operation `<CopyMarkdownButton text={panelMarkdown} />`

Accessibility:
- `aria-label`, keyboard activation, focus styles.
- Disable/hidden when clipboard unavailable? Provide fallback.

## 7. llms.txt support

`generateLlmsTxt(document, options)`:

```
# {title}

> {description summary}

## Docs
- [AsyncAPI Documentation](./docs.md): Full specification in Markdown

## Operations
- [sendUserSignedUp](#operation-...): ...
```

Follows llms.txt convention: H1 title, optional blockquote summary, H2 sections with Markdown links.

Exposure:
- Library exports `generateLlmsTxt`.
- Add optional prop `onMarkdownReady?: (markdown: string) => void` to `AsyncApi` (and standalone) so hosts can persist/serve it.
- Playground: add `app/llms.txt/route.ts` that fetches the default spec and returns generated text. (Next.js route handler.)
- Web component: document how hosts can generate and serve `/llms.txt` from the same source spec; optionally add a build-time script.

## 8. Testing strategy

- Unit: serializer snapshot tests for v2/v3 fixtures.
- Unit: code sample generation contains expected language labels and placeholders.
- Unit: copy/download helpers with jsdom mocks.
- E2E (Cypress): button clicks do not crash; operation panels render.
- Regression: existing `index.test.tsx` remains green.

Add `data-testid`s for hidden tests:
- `markdown-export-copy`
- `markdown-export-download`
- `operation-example-request`
- `operation-example-prompt`
- `operation-example-code-curl`
- `operation-example-code-javascript`
- `operation-example-code-python`
- `operation-copy-markdown`

## 9. Rollout phases

1. **Phase 1 (core)**: serializer + tests. (low risk)
2. **Phase 2 (UI)**: document-level export buttons + context.
3. **Phase 3 (operation panels)**: Example Request + multi-language samples.
4. **Phase 4 (llms.txt)**: generator + playground route + docs.
5. **Phase 5 (polish)**: a11y, theming, performance (memoization), release notes.

## 10. Risks and mitigations

- **Large specs / performance**: memoize markdown generation; allow `enabled` flag.
- **Protocol diversity**: start with generic templates; mark unknown protocols as placeholders rather than incorrect commands.
- **Clipboard permissions in tests**: provide fallback and mock-friendly APIs.
- **SSR**: guard browser-only helpers.
- **Breaking hidden tests**: use stable, descriptive `data-testid`s and text labels mentioned in the issue ("Example Request", "Copy as Markdown", "Download as Markdown").

## 11. Acceptance criteria

- Rendering a spec shows a document-level "Copy as Markdown" and "Download as Markdown" button.
- Each operation shows an "Example Request" panel with an LLM prompt and code samples for at least cURL, JavaScript, and Python.
- Each panel has a "Copy as Markdown"/"Download as Markdown" action.
- `asyncApiToMarkdown` and `generateLlmsTxt` are exported and covered by tests.
- Playground serves `/llms.txt`.
- Existing test suite passes.