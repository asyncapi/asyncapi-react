import React from 'react';
import { ErrorObject } from 'ajv';

import { bemClasses } from '../../helpers';
import { ParserError } from '../../types';
import { Toggle } from '../../components';
import { ERROR_TEXT } from '../../constants';

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
  if (!error) {
    return null;
  }
  const className = `error`;
  const { message, validationError } = error;

  const header = (
    <h2>
      {ERROR_TEXT}: {message}
    </h2>
  );

  return (
    <section className={bemClasses.element(className)}>
      <Toggle header={header} className={className}>
        {!!validationError && (
          <div className={bemClasses.element(`${className}-body`)}>
            <pre className={bemClasses.element(`${className}-body-pre`)}>
              {renderErrors(validationError)}
            </pre>
          </div>
        )}
      </Toggle>
    </section>
  );
};
