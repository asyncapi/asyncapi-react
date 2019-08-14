import React from 'react';

interface StateShape {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<{}, StateShape> {
  static getDerivedStateFromError(err: Error) {
    return { error: err };
  }
  state: StateShape = { error: null };

  componentDidCatch(error: any, info: any) {
    console.error(error);
    console.error(info);
  }

  render() {
    if (!!this.state.error) {
      return (
        <section>
          <h1>Oops, something went wrong :(</h1>
          <p>The error: {this.state.error.toString()}</p>
        </section>
      );
    }

    return this.props.children;
  }
}
