import React, { useState } from 'react';
import { AsyncAPIDocument } from '@asyncapi/parser';
import useResizeObserver from 'use-resize-observer';

import { Sidebar } from '../Sidebar/Sidebar';
import { Info } from '../Info/Info';
import { Servers } from '../Servers/Servers';
import { Operations } from '../Operations/Operations';
import { Messages } from '../Messages/Messages';
import { Error } from '../Error/Error';

import { ConfigInterface } from '../../config';
import { bemClasses } from '../../helpers';
import { SpecificationContext } from '../../contexts';
import { ErrorObject } from '../../types';

interface Props {
  asyncapi: AsyncAPIDocument;
  config: ConfigInterface;
  error?: ErrorObject;
}

const AsyncApiLayout: React.FunctionComponent<Props> = ({
  asyncapi,
  config,
  error = null,
}) => {
  const [divWidth, setDivWidth] = useState(1281);

  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: ({ width }) => {
      if (divWidth !== width) {
        width && setDivWidth(width);
      }
    },
  });
  bemClasses.setSchemaID(config.schemaID);

  return (
    <SpecificationContext.Provider value={{ asyncapi }}>
      <section
        className={`${
          divWidth <= 1280 ? 'container:xl' : 'container:base'
        } aui-relative md:aui-flex aui-bg-white`}
        id={bemClasses.getSchemaID()}
        ref={ref}
      >
        {config.show?.sidebar && <Sidebar config={config.sidebar} />}
        <div className="panel--center aui-relative aui-py-8 aui-flex-1">
          <div className="aui-relative aui-z-10">
            {config.show?.errors && error && <Error error={error} />}
            {config.show?.info && <Info />}
            {config.show?.servers && <Servers />}
            {config.show?.operations && <Operations />}
            {config.show?.messages && <Messages />}
          </div>
          <div className="panel--right aui-absolute aui-top-0 aui-right-0 aui-h-full aui-bg-gray-800" />
        </div>
      </section>
    </SpecificationContext.Provider>
  );
};

export default AsyncApiLayout;
