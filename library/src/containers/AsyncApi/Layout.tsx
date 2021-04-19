import React from 'react';
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
import { useSpec } from '../../store';
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
  const { ref, width = 1 } = useResizeObserver<HTMLDivElement>();
  bemClasses.setSchemaID(config.schemaID);

  return (
    <useSpec.Provider spec={asyncapi}>
      <section
        className={`${
          width <= 1280 ? 'container:xl' : 'container:base'
        } relative md:flex bg-white`}
        id={bemClasses.getSchemaID()}
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
          </div>
          <div className="panel--right absolute top-0 right-0 h-full bg-gray-800"></div>
        </div>
      </section>
    </useSpec.Provider>
  );
};

export default AsyncApiLayout;
