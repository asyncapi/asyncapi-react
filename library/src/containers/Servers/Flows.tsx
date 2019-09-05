import React from 'react';

import { ServerSecurityFlow } from './Flow';

import { TableRow } from '../../components';
import { bemClasses } from '../../helpers';
import { OAuthFlows, OAuthFlow } from '../../types';

interface Props {
  flows: OAuthFlows;
}

export const ServerSecurityFlows: React.FunctionComponent<Props> = ({
  flows,
}) => {
  if (!Object.keys(flows).length) {
    return null;
  }

  const sortedFlows = Object.keys(flows)
    .sort()
    .reduce((r, k) => ((r[k] = flows[k]), r), {});
  const nodes = Object.entries(sortedFlows).map(([flowName, flow]) => (
    <li
      key={flowName}
      className={bemClasses.element(`server-security-flows-list-item`)}
    >
      <ServerSecurityFlow name={flowName} flow={flow as OAuthFlow} />
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
