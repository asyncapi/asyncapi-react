import React, { Component } from 'react';
import {
  ErrorWrapper,
  ErrorHeader,
  ErrorContent,
  ErrorCode,
  ErrorPre,
} from './styled';
import { ErrorObject } from 'ajv';

interface Props {
  error?: ErrorObject | ErrorObject[];
}

class ErrorComponent extends Component<Props> {
  render() {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    console.error(error);

    return (
      <ErrorWrapper>
        <ErrorHeader>There are errors in your document:</ErrorHeader>
        <ErrorContent>
          <ErrorPre>{this.renderErrors(error)}</ErrorPre>
        </ErrorContent>
      </ErrorWrapper>
    );
  }
  private renderErrors(error: ErrorObject | ErrorObject[]): React.ReactNode {
    if (Array.isArray(error)) {
      return error
        .map((singleError: ErrorObject, index: number) => {
          const formattedError = this.formatErrors(singleError);

          if (!formattedError) {
            return null;
          }
          return <ErrorCode key={index}>{formattedError}</ErrorCode>;
        })
        .filter(Boolean);
    }

    return null;
  }

  private formatErrors = (singleError: ErrorObject): string | null => {
    if (!singleError) {
      return null;
    }

    const message = singleError.message;
    const dataPath = singleError.dataPath;
    const params = singleError.params as any;

    const info = Object.values(params)[0];

    return `${dataPath} ${message}: ${info}`;
  };
}

export default ErrorComponent;
