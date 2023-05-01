import mermaid from 'mermaid';

var mermaidInitialized = false;
export function initializeMermaidOnce() {
  if (mermaidInitialized) {
    return;
  }
  mermaidInitialized = true;

  // This breaks the build for some reason 🤷‍♂️
  // Here's the super-useful error that truly makes sense:
  // Can't reexport the named export 'o' from non EcmaScript module (only default export is available)
  mermaid.initialize({
    startOnLoad: true,
  });
}
