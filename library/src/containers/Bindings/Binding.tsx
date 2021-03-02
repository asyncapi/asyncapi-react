import React from 'react';

import { bemClasses } from '../../helpers';

const className = `binding`;
interface Props {
  name?: string;
  binding?: any;
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
      {Object.entries(binding).map(([x, y]) => (
        <div key={x}>
          <div className="flex py-2">
            <div className="flex-1">{x}</div>
            <div className="flex-1">{String(y)}</div>
          </div>
        </div>
      ))}
    </section>
  );
};
