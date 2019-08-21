import React, { FunctionComponent, useState } from 'react';
import {
  ErrorWrapper,
  ErrorHeader,
  ErrorContent,
  ErrorCode,
  ErrorPre,
} from './styled';
import { ErrorObject } from 'ajv';
import { ParserError } from '../../types';

type ValidationError = ParserError['validationError'];

interface Props {
  error: ParserError;
}

const ErrorComponent: FunctionComponent<Props> = ({ error }) => {
  const [visible, setVisible] = useState(true);

  if (!error) {
    return null;
  }

  const { message, validationError } = error;

  return (
    <ErrorWrapper>
      <button onClick={() => setVisible(!visible)}>STYLE ME</button>
      <ErrorHeader>Error: {message}</ErrorHeader>
      {!!validationError && visible && (
        <ErrorContent>
          <ErrorPre>{renderErrors(validationError)}</ErrorPre>
        </ErrorContent>
      )}
    </ErrorWrapper>
  );
};

function renderErrors(error: ValidationError): React.ReactNode {
  if (!error) {
    return null;
  }

  return error
    .map((singleError: ErrorObject, index: number) => {
      const formattedError = formatErrors(singleError);

      if (!formattedError) {
        return null;
      }
      return <ErrorCode key={index}>{formattedError}</ErrorCode>;
    })
    .filter(Boolean);
}

const formatErrors = (singleError: ErrorObject): string | null => {
  if (!singleError) {
    return null;
  }

  const { message, dataPath, params, keyword } = singleError;

  const info = Object.values(params)[0];

  return `${dataPath} ${message}${keyword === 'type' ? '' : `: ${info}`}`;
};

export default ErrorComponent;
