import React from 'react';

import { bemClasses } from '../../helpers';

import { BindingFieldComponent } from './BindingField';

const className = `binding`;
interface Props {
  name: string;
  binding: any;
}

export const BindingComponent: React.FunctionComponent<Props> = ({
  name,
  binding,
}) => {
  if (!binding) {
    return null;
  }

  return (
    <section>
      <div>
        <div className="flex py-2">
          <div
            className={bemClasses.concatenate([
              bemClasses.element(`${className}-protocol`),
              bemClasses.element(`badge`),
            ])}
          >
            {name}
          </div>
        </div>
      </div>
      {Object.entries(binding).map(([key, value]) => (
        <BindingFieldComponent
          value={value}
          context={key}
          bindingType={name}
          key={key}
        />
      ))}
    </section>
  );
};
