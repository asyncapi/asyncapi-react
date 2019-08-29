import React, { useState } from 'react';
import { ErrorObject } from 'ajv';

import { bemClasses } from '../../helpers';
import { ParserError } from '../../types';
import { ERROR, EXPAND_ERROR_BUTTON } from '../../constants';

const renderErrors = (error: ValidationError): React.ReactNode => {
  if (!error) {
    return null;
  }

  return error
    .map((singleError: ErrorObject, index: number) => {
      const formattedError = formatErrors(singleError);

      if (!formattedError) {
        return null;
      }
      return (
        <code className={bemClasses.element(`error-code`)} key={index}>
          {formattedError}
        </code>
      );
    })
    .filter(Boolean);
};

export const formatErrors = (singleError: ErrorObject): string => {
  const { message, dataPath, params, keyword } = singleError;

  const info = Object.values(params)[0];
  return `${dataPath} ${message}${keyword === 'type' ? '' : `: ${info}`}`;
};

type ValidationError = ParserError['validationError'];

interface Props {
  error: ParserError;
}

export const ErrorComponent: React.FunctionComponent<Props> = ({ error }) => {
  const [visible, setVisible] = useState(true);

  if (!error) {
    return null;
  }
  const { message, validationError } = error;
  const buttonClassName = `${bemClasses.element(
    `error-button`,
  )} ${bemClasses.modifier(`expanded`, `error-button`)}`;

  return (
    <div className={bemClasses.element(`error`)}>
      <button
        onClick={() => setVisible(state => !state)}
        className={buttonClassName}
      >
        {EXPAND_ERROR_BUTTON}
      </button>
      <header className={bemClasses.element(`error-header`)}>
        <h2>
          {ERROR}: {message}
        </h2>
      </header>
      {!!validationError && visible && (
        <div className={bemClasses.element(`error-content`)}>
          <pre className={bemClasses.element(`error-pre`)}>
            {renderErrors(validationError)}
          </pre>
        </div>
      )}
    </div>
  );
};
