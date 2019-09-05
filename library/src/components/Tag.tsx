import React from 'react';

import { bemClasses } from '../helpers';

export const Tag: React.FunctionComponent = ({ children }) => (
  <span className={bemClasses.element(`tag`)}>{children}</span>
);
