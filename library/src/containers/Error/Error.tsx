import React, { useState } from 'react';
import { ErrorObject } from 'ajv';

import { bemClasses } from '../../helpers';
import { ParserError } from '../../types';
import {
  ERROR,
  EXPAND_ERROR_BUTTON,
  COLLAPSE_ERROR_BUTTON,
} from '../../constants';

const renderErrors = (
  error: ParserError['validationError'],
): React.ReactNode => {
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
        <code className={bemClasses.element(`error-content-code`)} key={index}>
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

interface Props {
  error: ParserError;
}

export const ErrorComponent: React.FunctionComponent<Props> = ({ error }) => {
  const [visible, setVisible] = useState(false);

  if (!error) {
    return null;
  }

  const { message, validationError } = error;
  const buttonClassName = `error-button`;
  const expandedButtonClassName = visible
    ? bemClasses.modifier(`expanded`, buttonClassName)
    : ``;
  const buttonClassNames = bemClasses.concatenate([
    bemClasses.element(buttonClassName),
    expandedButtonClassName,
  ]);

  return (
    <div className={bemClasses.element(`error`)}>
      <header className={bemClasses.element(`error-header`)}>
        <h2>
          {ERROR}: {message}
        </h2>
        <button
          onClick={() => setVisible(state => !state)}
          className={buttonClassNames}
        >
          {visible ? COLLAPSE_ERROR_BUTTON : EXPAND_ERROR_BUTTON}
        </button>
      </header>
      {!!validationError && visible && (
        <div className={bemClasses.element(`error-content`)}>
          <pre className={bemClasses.element(`error-content-pre`)}>
            {renderErrors(validationError)}
          </pre>
        </div>
      )}
    </div>
  );
};
