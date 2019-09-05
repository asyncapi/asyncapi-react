import React from 'react';

import { bemClasses } from '../helpers';

export const Markdown: React.FunctionComponent = ({ children }) => (
  <div className={bemClasses.element(`markdown`)}>{children}</div>
);
