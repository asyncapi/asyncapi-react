import React, { Component } from 'react';
import {
  ErrorWrapper,
  ErrorHeader,
  ErrorContent,
  ErrorCode,
  ErrorPre,
} from './styled';
import { ErrorObject, EnumParams } from 'ajv';

interface Props {
  error?: ErrorObject | ErrorObject[];
}

class ErrorComponent extends Component<Props> {
  render() {
    const { error } = this.props;

    if (!error) {
      return null;
    }

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
        <ErrorCode key={index}>
          {(singleError &&
            singleError.message &&
            `${singleError.dataPath} ${singleError.message}: ${
              (singleError.params as EnumParams).allowedValues
            }`) ||
            singleError}
        </ErrorCode>
      ));
    }

    return <ErrorCode>{(error && error.message) || error}</ErrorCode>;
  }
}

export default ErrorComponent;
