import React from 'react';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorObject } from '../../types';
import { Error } from '../Error/Error';

interface Props {
  children: ReactNode;
}

interface FallbackProps {
  error: any;
  resetErrorBoundary?: (...args: any[]) => void;
}

function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  const ErrorObject: ErrorObject = {
    title: "Something went wrong",
    type: 'application-error',
    validationErrors:[
      {
        title:error.message,
      }
    ]
  };
  return <Error error={ErrorObject} />;
}

const AsyncApiErrorBoundary = ({ children }: Props) => {
  const onReset = (details: any) => {
    // TODO: some magic to make monaco editor undo
    console.log('resetting', details);
  };

  return (
    <ErrorBoundary fallbackRender={fallbackRender} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
};

export default AsyncApiErrorBoundary;
