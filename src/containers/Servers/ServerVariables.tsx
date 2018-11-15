import React, { Component } from 'react';

import { 
    Header,
    H4, 
    Markdown, 
    TableColumnName, 
    TableAccessor, 
    TableWrapper, 
    TableHeader, 
    TableBodyWrapper, 
    TableRow, 
    TableCell,
    TableCellWithNested,
    TableWrapperNested,
    TableHeaderWrapperNested,
    TableBodyWrapperNested,
} from '../../components';

import { ServerVariable, TypeWithKey } from '../../common';

import { ServerVariablesEnumList, ServerVariablesEnumElement } from './styled';

type ServerVariableWithKey = TypeWithKey<string, ServerVariable>;

const serverVariablesColumnsName: TableColumnName[] = [
  "Name",
  "Default value",
  "Possible values",
  "Description",
]

const serverVariablesAccessors: TableAccessor[] = [
  (el: ServerVariableWithKey) => el.key,
  (el: ServerVariableWithKey) => el.content.default ? el.content.default : <em>None</em>,
  (el: ServerVariableWithKey) => el.content.enum ? (
    <ServerVariablesEnumList>
      {el.content.enum.map(value => <ServerVariablesEnumElement key={value}>{value}</ServerVariablesEnumElement>)}
    </ServerVariablesEnumList>
  ) : "Any",
  (el: ServerVariableWithKey) => el.content.description ? <Markdown>{el.content.description}</Markdown> : null,
]

export interface SchemaServerProps {
  variables: ServerVariableWithKey[];
  openAccordion: boolean;
}

class ServerVariablesComponent extends Component<SchemaServerProps> {
  public render() {
    const { variables, openAccordion } = this.props;

    const vars = (
      <TableCellWithNested colSpan={3}>
        <div>
          <TableWrapperNested>
            <TableHeader title="URL Variables" columns={serverVariablesColumnsName} nested />
            <TableBodyWrapperNested>
              {variables.map(variable => <TableRow key={variable.key} accessors={serverVariablesAccessors} element={variable} nested />)}
            </TableBodyWrapperNested>
          </TableWrapperNested>
        </div>
      </TableCellWithNested>
    )
    return <TableRow openAccordion={openAccordion} element={vars} />;
  }
}

export default ServerVariablesComponent;
