import React from 'react';

import { bemClasses } from '../../helpers';
import { BaseBindings } from '../../types';
import { BindingComponent } from './Binding';

const className = `bindings`;
interface Props {
  bindings?: BaseBindings;
  title?: string;
}

export const BindingsComponent: React.FunctionComponent<Props> = ({
  bindings,
  title,
}) => {
  if (!bindings || bindings.length === 0) {
    return null;
  }
  const content = (
    <div className={`${bemClasses.element(`${className}-table`)} p-4`}>
      {Object.entries(bindings).map(([name, binding]) => (
        <BindingComponent name={name} binding={binding} key={name} />
      ))}
    </div>
  );
  return (
    <section className={bemClasses.element(className)}>
      <div className={bemClasses.element(`${className}-header`)}>
        <h4>{title}</h4>
        <div className={bemClasses.element(`${className}-description`)}>
          {content}
        </div>
      </div>
    </section>
  );
};
