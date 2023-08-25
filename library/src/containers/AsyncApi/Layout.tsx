import React, { useState } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
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
  asyncapi: AsyncAPIDocumentInterface;
  config: ConfigInterface;
  error?: ErrorObject;
}

const AsyncApiLayout: React.FunctionComponent<Props> = ({
  asyncapi,
  config,
  error = null,
}) => {
  const [observerClassName, setObserverClassName] = useState('container:xl');

  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: ({ width }) => {
      requestAnimationFrame(() => {
        if (width === undefined) {
          return;
        }

        const possibleClassName =
          width <= 1280 ? 'container:xl' : 'container:base';
        if (possibleClassName !== observerClassName) {
          setObserverClassName(possibleClassName);
        }
      });
    },
  });

  const configShow = config.show || {};
  return (
    <ConfigContext.Provider value={config}>
      <SpecificationContext.Provider value={asyncapi}>
        <section className="aui-root">
          <div
            className={`${observerClassName} relative md:flex bg-white leading-normal`}
            id={config.schemaID || undefined}
            ref={ref}
          >
            {configShow.sidebar && <Sidebar />}
            <div className="panel--center relative py-8 flex-1">
              <div className="relative z-10">
                {configShow.errors && error && <Error error={error} />}
                {configShow.info && <Info />}
                {configShow.servers && <Servers />}
                {configShow.operations && <Operations />}
                {configShow.messages && <Messages />}
                {configShow.schemas && <Schemas />}
              </div>
              <div className="panel--right absolute top-0 right-0 h-full bg-gray-800" />
            </div>
          </div>
        </section>
      </SpecificationContext.Provider>
    </ConfigContext.Provider>
  );
};

export default AsyncApiLayout;
