import React from 'react';
import { OAuthFlow } from '@asyncapi/parser';

import { ServerSecurityFlow } from './Flow';

import { TableRow } from '../../components';
import { bemClasses } from '../../helpers';

interface Props {
  flows: {
    [key: string]: OAuthFlow;
  };
}

export const ServerSecurityFlows: React.FunctionComponent<Props> = ({
  flows,
}) => {
  if (!Object.keys(flows).length) {
    return null;
  }

  // TODO: check if this should be removed
  // const sortedFlows: { [key: string]: OAuthFlow } = Object.keys(flows)
  //   .sort()
  //   .reduce((accumulator, currentValue) => {
  //     accumulator[currentValue] = flows[currentValue];
  //     return accumulator;
  //   }, {});

  const nodes = Object.entries(flows).map(([flowName, flow]) => (
    <li
      key={flowName}
      className={bemClasses.element(`server-security-flows-list-item`)}
    >
      <ServerSecurityFlow name={flowName} flow={flow} />
    </li>
  ));

  const nestedTableCellClassName = bemClasses.modifier(`nested`, `table-cell`);
  const flowsTableCellClassName = bemClasses.element(
    `server-security-flows-table-cell`,
  );
  const className = bemClasses.concatenate([
    nestedTableCellClassName,
    flowsTableCellClassName,
  ]);

  const element = (
    <td className={className} colSpan={6}>
      <ul className={bemClasses.element(`server-security-flows-list`)}>
        {nodes}
      </ul>
    </td>
  );

  return <TableRow element={element} nested={true} />;
};
