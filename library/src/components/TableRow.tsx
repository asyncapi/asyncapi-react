import React from 'react';

import { bemClasses } from '../helpers';

export type TableAccessorReturn = React.ReactNode;
export type TableAccessor =
  | ((arg: Record<string, any>) => TableAccessorReturn)
  | string;

export interface TableRowProps {
  element: any;
  key?: string | number;
  accessors?: TableAccessor[];
  nested?: boolean;
  openAccordion?: boolean;
}

export const TableRow: React.FunctionComponent<TableRowProps> = ({
  element,
  key = '',
  accessors = [],
  nested = false,
  openAccordion = false,
}) => {
  const renderRowByAccessors = (
    acs: TableAccessor[],
    el: Record<string, any>,
    nest: boolean,
  ): React.ReactNode[] =>
    acs.map((accessor, index) => (
      <td
        key={index}
        className={
          nest
            ? bemClasses.modifier(`nested`, `table-cell`)
            : bemClasses.element(`table-cell`)
        }
      >
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

  const content = accessors
    ? renderRowByAccessors(accessors, element, nested)
    : element;

  const className = `table-row`;
  const nestedClassName = nested
    ? bemClasses.modifier(`nested`, className)
    : bemClasses.element(className);
  const openAccordionClassName = openAccordion
    ? bemClasses.modifier(`open-accordion`, className)
    : '';

  return (
    <tr
      key={key}
      className={bemClasses.concatenate([
        nestedClassName,
        openAccordionClassName,
      ])}
    >
      {content}
    </tr>
  );
};
