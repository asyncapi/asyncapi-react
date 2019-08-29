import React from 'react';

import { bemClasses } from '../helpers';

export const TreeSpace: React.FunctionComponent = () => (
  <span className={bemClasses.element(`tree-space`)} />
);

export const TreeLeaf: React.FunctionComponent = () => (
  <span className={bemClasses.element(`tree-leaf`)} />
);
