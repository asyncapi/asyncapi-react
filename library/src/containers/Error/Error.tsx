import React, { Component } from 'react';
import {
  ErrorWrapper,
  ErrorHeader,
  ErrorContent,
  ErrorCode,
  ErrorPre,
} from './styled';

interface Props {
  error?: Error | Error[];
}

class ErrorComponent extends Component<Props> {
  private renderErrors(error: Error | Error[]): React.ReactNode {
    if (Array.isArray(error)) {
      return error.map((singleError: Error, index: number) => (
        <ErrorCode key={index}>
          {(singleError && singleError.message) || singleError}
        </ErrorCode>
      ));
    }

    return <ErrorCode>{(error && error.message) || error}</ErrorCode>;
  }

  render() {
    const { error } = this.props;

    if (!error) return null;

    return (
      <ErrorWrapper>
        <ErrorHeader>There are errors in your document:</ErrorHeader>
        <ErrorContent>
          <ErrorPre>{this.renderErrors(error)}</ErrorPre>
        </ErrorContent>
      </ErrorWrapper>
    );
  }
}

export default ErrorComponent;
