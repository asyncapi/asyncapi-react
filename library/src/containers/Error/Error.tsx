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
        <div key={index} className="aui-flex">
          <span>{`${singleError.location.startLine}.`}</span>
          <code className="aui-whitespace-pre-wrap aui-break-all aui-ml-2">
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
      <div className="panel-item--center aui-p-8">
        <section className="aui-shadow aui-rounded aui-bg-gray-200 aui-border-red-500 aui-border-l-8">
          <h2 className="aui-p-2">
            {title ? `${ERROR_TEXT}: ${title}` : ERROR_TEXT}
          </h2>
          {validationErrors && validationErrors.length ? (
            <div className="aui-bg-gray-800 aui-text-white aui-text-xs aui-p-2">
              <pre>{renderErrors(validationErrors)}</pre>
            </div>
          ) : null}
        </section>
      </div>
      <div className="panel-item--right" />
    </div>
  );
};
