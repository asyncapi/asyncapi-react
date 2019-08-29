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

const serverVariablesAccessors: TableAccessor[] = [
  (el: ServerVariableWithKey) => el.key,
  (el: ServerVariableWithKey) =>
    el.content.default ? el.content.default : <em>{NONE_TEXT}</em>,
  (el: ServerVariableWithKey) =>
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
  (el: ServerVariableWithKey) =>
    el.content.description && <Markdown>{el.content.description}</Markdown>,
];

interface Props {
  variables: ServerVariableWithKey[];
  openAccordion: boolean;
}

export const ServerVariablesComponent: React.FunctionComponent<Props> = ({
  variables,
  openAccordion,
}) => {
  const rows = variables.map(
    variable =>
      ({
        key: variable.key,
        accessors: serverVariablesAccessors,
        element: variable,
      } as TableRowProps),
  );

  const className = `${bemClasses.element(`table-cell`)} ${bemClasses.modifier(
    `nested`,
    `table-cell`,
  )}`;
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

  return <TableRow openAccordion={openAccordion} element={element} />;
};
