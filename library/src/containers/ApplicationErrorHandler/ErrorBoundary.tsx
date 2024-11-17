import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ErrorObject } from '../../types';
import { Error } from '../Error/Error';

interface Props {
  children: ReactNode;
}

function fallbackRender({ error }: FallbackProps) {
  const ErrorObject: ErrorObject = {
    title: 'Something went wrong',
    type: 'application-error',
    validationErrors: [
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        title: error?.message,
      },
    ],
  };
  return <Error error={ErrorObject} />;
}

const AsyncApiErrorBoundary = ({ children }: Props) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [children]);

  return (
    <ErrorBoundary key={key} fallbackRender={fallbackRender}>
      {children}
    </ErrorBoundary>
  );
};

export default AsyncApiErrorBoundary;
