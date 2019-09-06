import React from 'react';

import { bemClasses, createNestedClassName } from '../helpers';

export type TableAccessorReturn = React.ReactNode;
export type TableAccessor<T = Record<string, any>> =
  | ((arg: T) => TableAccessorReturn)
  | string;

export interface TableRowProps {
  element: any;
  rootKey?: string | number;
  accessors?: TableAccessor[];
  nested?: boolean;
  className?: string;
}

export const TableRow: React.FunctionComponent<TableRowProps> = ({
  element,
  rootKey = '',
  accessors = [],
  nested = false,
  className = '',
}) => {
  const renderRowByAccessors = (
    acs: TableAccessor[],
    el: Record<string, any>,
    nest: boolean,
  ): React.ReactNode[] =>
    acs.map((accessor, index) => (
      <td key={index} className={createNestedClassName(`table-cell`, nested)}>
        {resolveAccessor(accessor, el)}
      </td>
    ));

  const resolveAccessor = (
    accessor: TableAccessor,
    el: Record<string, any>,
  ): TableAccessorReturn => {
    if (accessor instanceof Function) {
      return accessor(el);
    }

    const value = el[accessor];
    if (typeof value === 'boolean' || typeof value === 'number') {
      return value.toString();
    }
    return value;
  };

  const content =
    accessors && accessors.length
      ? renderRowByAccessors(accessors, element, nested)
      : element;
  const nestedClassName = createNestedClassName(`table-row`, nested);

  return (
    <tr
      key={rootKey}
      className={bemClasses.concatenate([nestedClassName, className])}
    >
      {content}
    </tr>
  );
};
