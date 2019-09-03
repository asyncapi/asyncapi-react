import React from 'react';

import { bemClasses } from '../../helpers';
import { ServerVariable, TypeWithKey } from '../../types';
import {
  Markdown,
  Table,
  TableRowProps,
  TableAccessor,
  TableRow,
} from '../../components';
import {
  URL_VARIABLES_TEXT,
  NONE_TEXT,
  ANY_TEXT,
  SERVER_COLUMN_NAMES,
} from '../../constants';

type ServerVariableWithKey = TypeWithKey<string, ServerVariable>;

const serverVariablesAccessors: Array<TableAccessor<ServerVariableWithKey>> = [
  el => el.key,
  el => (el.content.default ? el.content.default : <em>{NONE_TEXT}</em>),
  el =>
    el.content.enum ? (
      <ul className={bemClasses.element(`server-variables-enum-list`)}>
        {el.content.enum.map(value => (
          <li
            className={bemClasses.element(`server-variables-enum-list-item`)}
            key={value}
          >
            {value}
          </li>
        ))}
      </ul>
    ) : (
      <em>{ANY_TEXT}</em>
    ),
  el => el.content.description && <Markdown>{el.content.description}</Markdown>,
];

interface Props {
  variables: ServerVariableWithKey[];
  openAccordion: boolean;
}

export const ServerVariablesComponent: React.FunctionComponent<Props> = ({
  variables,
  openAccordion = false,
}) => {
  if (!variables.length) {
    return null;
  }

  const rows: TableRowProps[] = variables.map(variable => ({
    key: variable.key,
    accessors: serverVariablesAccessors,
    element: variable,
  }));

  const nestedTableCellClassName = bemClasses.modifier(`nested`, `table-cell`);
  const variablesTableCellClassName = bemClasses.element(
    `server-variables-table-cell`,
  );
  const className = bemClasses.concatenate([
    nestedTableCellClassName,
    variablesTableCellClassName,
  ]);

  const element = (
    <td className={className} colSpan={4}>
      <div className={bemClasses.element(`server-variables`)}>
        <Table
          header={{
            title: URL_VARIABLES_TEXT,
            columns: SERVER_COLUMN_NAMES,
          }}
          rows={rows}
          nested={true}
        />
      </div>
    </td>
  );

  return (
    <TableRow
      openAccordion={openAccordion}
      accordion={true}
      element={element}
    />
  );
};
