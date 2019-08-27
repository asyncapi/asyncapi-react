import React, { Component } from 'react';

import { ServerVariable, TypeWithKey } from '../../types';

import {
  Markdown,
  TableAccessor,
  TableHeader,
  TableRow,
  TableCellWithNested,
  TableWrapperNested,
  TableBodyWrapperNested,
} from '../../components';
import { ServerVariablesEnumList, ServerVariablesEnumElement } from './styled';
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
      <ServerVariablesEnumList>
        {el.content.enum.map(value => (
          <ServerVariablesEnumElement key={value}>
            {value}
          </ServerVariablesEnumElement>
        ))}
      </ServerVariablesEnumList>
    ) : (
      { ANY_TEXT }
    ),
  (el: ServerVariableWithKey) =>
    el.content.description && <Markdown>{el.content.description}</Markdown>,
];

interface Props {
  variables: ServerVariableWithKey[];
  openAccordion: boolean;
}

export class ServerVariablesComponent extends Component<Props> {
  render() {
    const { variables, openAccordion } = this.props;

    const vars = (
      <TableCellWithNested colSpan={4}>
        <div>
          <TableWrapperNested>
            <TableHeader
              title={URL_VARIABLES_TEXT}
              columns={SERVER_COLUMN_NAMES}
              nested={true}
            />
            <TableBodyWrapperNested>
              {variables.map(variable => (
                <TableRow
                  key={variable.key}
                  accessors={serverVariablesAccessors}
                  element={variable}
                  nested={true}
                />
              ))}
            </TableBodyWrapperNested>
          </TableWrapperNested>
        </div>
      </TableCellWithNested>
    );
    return <TableRow openAccordion={openAccordion} element={vars} />;
  }
}
