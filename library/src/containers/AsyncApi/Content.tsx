import React from 'react';
import { AsyncAPIDocument } from '@asyncapi/parser';
import useResizeObserver from 'use-resize-observer';

import { Sidebar } from '../Sidebar/Sidebar';
import { Info } from '../Info/Info';
import { Servers } from '../Servers/Servers';
import { Operations } from '../Operations/Operations';
import { Messages } from '../Messages/Messages';

// import { ConfigInterface } from '../../config';
import { bemClasses, stateHelpers } from '../../helpers';
import { useSpec, useExpandedContext, useChangeHashContext } from '../../store';

interface AsyncApiContentProps {
  asyncapi: AsyncAPIDocument;
  config: any; // fix type
}

const AsyncApiContent: React.FunctionComponent<AsyncApiContentProps> = ({
  asyncapi,
  config,
}) => {
  const { ref, width = 1 } = useResizeObserver<HTMLDivElement>();

  bemClasses.setSchemaID(config.schemaID);
  const numberOfElement = stateHelpers.calculateNumberOfElements({
    spec: asyncapi.json(),
    showConfig: config.show,
  });
  const initialExpandedElements = stateHelpers.calculateInitialExpandedElements(
    {
      spec: asyncapi.json(),
      showConfig: config.show,
      expandConfig: config.expand || {},
    },
  );

  return (
    <useSpec.Provider spec={asyncapi}>
      <useExpandedContext.Provider
        numberOfElements={numberOfElement}
        numberOfExpandedElement={initialExpandedElements}
      >
        <useChangeHashContext.Provider schemaName={bemClasses.getSchemaID()}>
          <main
            className={`${
              width <= 1280 ? 'container:xl' : 'container:base'
            } relative md:flex bg-white`}
            id={bemClasses.getSchemaID()}
            ref={ref}
          >
            {config.show.sidebar && <Sidebar config={config.sidebar} />}
            <div className="panel--center relative py-8 flex-1">
              <div className="relative z-10">
                {/* {config.showErrors && !!error && (
                  <ErrorComponent error={error} />
                )} */}
                {config.show.info && <Info />}
                {config.show.servers && <Servers />}
                {config.show.operations && <Operations />}
                {config.show.messages && <Messages />}
              </div>
              <div className="panel--right absolute top-0 right-0 h-full bg-gray-800"></div>
            </div>
          </main>
        </useChangeHashContext.Provider>
      </useExpandedContext.Provider>
    </useSpec.Provider>
  );
};

export default AsyncApiContent;
