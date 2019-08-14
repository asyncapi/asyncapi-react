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

// TODO: handle more errors, see whether

// TODO: refactor
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
      return error.map((singleError: ErrorObject, index: number) => (
        <ErrorCode key={index}>{this.formatErrors(singleError)}</ErrorCode>
      ));
    }

    return <ErrorCode>{(error && error.message) || error}</ErrorCode>;
  }

  private formatErrors: (
    err: ErrorObject,
  ) => string | undefined = singleError => {
    const data =
      singleError &&
      singleError.message &&
      `${singleError.dataPath} ${
        singleError.message
      }: ${(singleError.params as any).allowedValues ||
        (singleError.params as any).additionalProperty ||
        (singleError.params as any).missingProperty}`;

    return data;
  };
}

export default ErrorComponent;
