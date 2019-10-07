import React from 'react';

import { bemClasses } from '../../helpers';
import { ServerVariable, TypeWithKey } from '../../types';
import {
  Markdown,
  Table,
  TableRowProps,
  TableAccessor,
} from '../../components';
import {
  URL_VARIABLES_TEXT,
  NONE_TEXT,
  ANY_TEXT,
  SERVER_COLUMN_NAMES,
} from '../../constants';

type ServerVariableWithKey = TypeWithKey<string, ServerVariable>;

const serverVariablesAccessors: Array<TableAccessor<ServerVariableWithKey>> = [
  el => <span>{el.key}</span>,
  el =>
    el.content.default ? (
      <span>{el.content.default}</span>
    ) : (
      <em>{NONE_TEXT}</em>
    ),
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
  identifier: string;
  dataIdentifier: string;
}

export const ServerVariablesComponent: React.FunctionComponent<Props> = ({
  variables,
  identifier: id,
  dataIdentifier: dataId,
}) => {
  if (!variables.length) {
    return null;
  }
  const className = `server-variables`;
  const rows: TableRowProps[] = variables.map(variable => ({
    key: variable.key,
    accessors: serverVariablesAccessors,
    element: variable,
  }));
  const identifier = bemClasses.identifier([
    { id, toKebabCase: false },
    'url-variables',
  ]);
  const dataIdentifier = bemClasses.identifier([
    { id: dataId, toKebabCase: false },
    'url-variables',
  ]);

  return (
    <section
      className={bemClasses.element(className)}
      id={identifier}
      data-asyncapi-id={dataIdentifier}
    >
      <header className={bemClasses.element(`${className}-header`)}>
        <h4>{URL_VARIABLES_TEXT}</h4>
      </header>
      <div className={bemClasses.element(`${className}-table`)}>
        <Table
          header={{
            columns: SERVER_COLUMN_NAMES,
          }}
          rows={rows}
        />
      </div>
    </section>
  );
};
