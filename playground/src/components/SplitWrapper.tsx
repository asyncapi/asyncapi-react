import React, { Component } from 'react';
import Split from 'react-split';

export interface WrapperProps {
  children: React.ReactNode;
}

class SplitWrapper extends Component<WrapperProps> {
  render() {
    return (
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
        {this.props.children}
      </Split>
    );
  }
}

export default SplitWrapper;
