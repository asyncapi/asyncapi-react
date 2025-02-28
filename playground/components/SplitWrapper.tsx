import React from 'react';
import Split from 'react-split';

interface SplitWrapperProps {
  children: React.ReactNode;
}

// React-Split should be replaced with a React 18-friendly library or CSS
const SplitWrapper = (props: SplitWrapperProps) => (
  <Split
    style={{
      width: '100%',
      height: 'calc(100vh - 50px)',
      minHeight: 'calc(100vh - 50px)',
      display: 'flex',
      background: '#f3f4f5',
    }}
    gutter={() => {
      const gutter = document.createElement('div');
      gutter.onmouseover = () => (gutter.style.cursor = 'ew-resize');
      return gutter;
    }}
    gutterStyle={() => ({
      backgroundColor: 'gray',
      width: '7px',
    })}
    minSize={250}
  >
    {props.children}
  </Split>
);

export default SplitWrapper;
