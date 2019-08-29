import React from 'react';

import { bemClasses } from '../helpers';

interface Props {
  title?: any;
  code: string;
}

export const CodeComponent: React.FunctionComponent<Props> = ({
  title,
  code,
}) => (
  <div className={bemClasses.element(`code-wrapper`)}>
    {title && (
      <header className={bemClasses.element(`code-header`)}>
        <h4>{title}</h4>
      </header>
    )}
    <pre className={bemClasses.element(`code-pre`)}>
      <code className={bemClasses.element(`code-body`)}>{code}</code>
    </pre>
  </div>
);
