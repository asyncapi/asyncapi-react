import React from 'react';

import { ERROR_TEXT } from '../../constants';
import { ErrorObject, ValidationError } from '../../types';

const renderErrors = (errors: ValidationError[]): React.ReactNode => {
  if (!errors) {
    return null;
  }

  return errors
    .map((singleError: ValidationError, index: number) => {
      if (!singleError || !singleError.title || !singleError.location) {
        return null;
      }
      return (
        <div key={index} className="flex">
          <span>{`${singleError.location.startLine}.`}</span>
          <code className="whitespace-pre-wrap break-all ml-2">
            {singleError.title}
          </code>
        </div>
      );
    })
    .filter(Boolean);
};

interface Props {
  error: ErrorObject;
}

export const Error: React.FunctionComponent<Props> = ({ error }) => {
  if (!error) {
    return null;
  }
  const { title, validationErrors } = error;

  return (
    <div className="panel-item">
      <div className="panel-item--center p-8">
        <section className="shadow rounded bg-gray-200 border-red-500 border-l-8">
          <h2 className="p-2">
            {title ? `${ERROR_TEXT}: ${title}` : ERROR_TEXT}
          </h2>
          {validationErrors && validationErrors.length ? (
            <div className="bg-gray-800 text-white text-xs p-2">
              <pre>{renderErrors(validationErrors)}</pre>
            </div>
          ) : null}
        </section>
      </div>
      <div className="panel-item--right" />
    </div>
  );
};
