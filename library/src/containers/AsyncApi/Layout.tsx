import React, { useState } from 'react';
import { AsyncAPIDocument } from '@asyncapi/parser';
import useResizeObserver from 'use-resize-observer';

import { Sidebar } from '../Sidebar/Sidebar';
import { Info } from '../Info/Info';
import { Servers } from '../Servers/Servers';
import { Operations } from '../Operations/Operations';
import { Messages } from '../Messages/Messages';
import { Schemas } from '../Schemas/Schemas';
import { Error } from '../Error/Error';

import { ConfigInterface } from '../../config';
import { SpecificationContext, ConfigContext } from '../../contexts';
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

  return (
    <ConfigContext.Provider value={config}>
      <SpecificationContext.Provider value={asyncapi}>
        <section
          className={`${
            divWidth <= 1280 ? 'container:xl' : 'container:base'
          } relative md:flex bg-white`}
          id={config.schemaID || undefined}
          ref={ref}
        >
          {config.show?.sidebar && <Sidebar config={config.sidebar} />}
          <div className="panel--center relative py-8 flex-1">
            <div className="relative z-10">
              {config.show?.errors && error && <Error error={error} />}
              {config.show?.info && <Info />}
              {config.show?.servers && <Servers />}
              {config.show?.operations && <Operations />}
              {config.show?.messages && <Messages />}
              {config.show?.schemas && <Schemas />}
            </div>
            <div className="panel--right absolute top-0 right-0 h-full bg-gray-800" />
          </div>
        </section>
      </SpecificationContext.Provider>
    </ConfigContext.Provider>
  );
};

export default AsyncApiLayout;
