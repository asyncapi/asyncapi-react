import React, { useState, useEffect, useContext } from 'react';
import { SchemaInterface } from '@asyncapi/parser';
import { CollapseButton, HiChevronRight } from '../CollapseButton';

interface props {
  schemaName?: string;
  schema: SchemaInterface;
}

const PayloadContext = React.createContext({
  reverse: false,
  deepExpanded: false,
});

export const Payload2 = ({ schema, schemaName = 'Payload' }: props) => {
  // const { reverse, deepExpanded } = useContext(PayloadContext);
  const [expanded, setExpanded] = useState(false);
  const [deepExpand, setDeepExpand] = useState(false);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center mt-2">
          <CollapseButton
            onClick={() => setExpanded((prev) => !prev)}
            expanded={expanded}
          >
            <span className="break-anywhere text-sm w-full">Payload</span>
          </CollapseButton>
          <button
            type="button"
            onClick={() => setDeepExpand((prev) => !prev)}
            className="ml-1 text-sm text-gray-500"
          >
            {deepExpand ? 'Collapse all' : 'Expand all'}
          </button>
        </div>

        <div className="flex items-center">
          <CollapseButton
            onClick={() => setExpanded((prev) => !prev)}
            expanded={expanded}
            rotateAngle={180}
          >
            <span className="break-anywhere text-sm w-full">Conditions</span>
          </CollapseButton>
        </div>
      </div>
    </div>
  );
};
