import React, { Component } from 'react';
import {
  ErrorWrapper,
  ErrorHeader,
  ErrorContent,
  ErrorCode,
  ErrorPre,
} from './styled';
import { ErrorObject } from 'ajv';
import { ParserError } from '../../../src/helpers/parser';

type ValidationError = ParserError['validationError'];

interface Props {
  error: ParserError;
}

class ErrorComponent extends Component<Props> {
  render() {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    const { message, validationError } = error;

    return (
      <ErrorWrapper>
        {/* <ErrorHeader>There are errors in your document:</ErrorHeader> TODO: discuss -> I would just show line 32, and delete this one */}
        <ErrorHeader>Error: {message}</ErrorHeader>
        {!!validationError && (
          <ErrorContent>
            <ErrorPre>{this.renderErrors(validationError)}</ErrorPre>
          </ErrorContent>
        )}
      </ErrorWrapper>
    );
  }

  renderErrors(error: ValidationError): React.ReactNode {
    if (!error) {
      return null;
    }

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

  formatErrors = (singleError: ErrorObject): string | null => {
    if (!singleError) {
      return null;
    }

    const message = singleError.message;
    const dataPath = singleError.dataPath;
    const params = singleError.params as any;

    const info = Object.values(params)[0];

    return `${dataPath} ${message}${
      singleError.keyword === 'type' ? '' : `: ${info}`
    }`;
  };
}

export default ErrorComponent;
