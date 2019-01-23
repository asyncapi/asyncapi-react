import React, { Component } from 'react';
import {
  Error,
  ErrorHeader,
  ErrorContent,
  ErrorCode,
  ErrorPre,
} from './styled';

import { Error as ErrorType } from '../../types';
// import { H1 } from '../../components';

interface Props {
  error?: ErrorType;
}

class ErrorComponent extends Component<Props> {
  render() {
    const { error } = this.props;

    if (!error) return null;

    return (
      <Error>
        <ErrorHeader>There are errors in your document:</ErrorHeader>
        <ErrorContent>
          <ErrorPre>
            <ErrorCode>{(error && error.message) || error}</ErrorCode>
          </ErrorPre>
        </ErrorContent>
      </Error>
    );
  }
}

export default ErrorComponent;
