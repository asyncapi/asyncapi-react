import React from 'react';

import { SchemaComponent } from '../Schemas/Schema';

import { bemClasses } from '../../helpers';
import { RawMessage, isOneOfPayload, isAnyOfPayload } from '../../types';
import {
  ONE_OF_PAYLOADS_TEXT,
  ANY_OF_PAYLOADS_TEXT,
  PAYLOAD_TEXT,
  MESSAGE_PAYLOAD_TEXT,
  PAYLOAD_EXAMPLE_TEXT,
} from '../../constants';

type PayloadProps = Required<Pick<RawMessage, 'payload'>>;

export const PayloadComponent: React.FunctionComponent<PayloadProps> = ({
  payload,
}) => {
  if (isOneOfPayload(payload)) {
    return (
      <>
        <h4>{ONE_OF_PAYLOADS_TEXT}</h4>
        {payload.oneOf.map((elem, index: number) => (
          <PayloadComponent payload={elem} key={index} />
        ))}
      </>
    );
  }

  if (isAnyOfPayload(payload)) {
    return (
      <>
        <h4>{ANY_OF_PAYLOADS_TEXT}</h4>
        {payload.anyOf.map((elem, index: number) => (
          <PayloadComponent payload={elem} key={index} />
        ))}
      </>
    );
  }

  return (
    <div className={bemClasses.element(`payload`)}>
      <header className={bemClasses.element(`payload-header`)}>
        <h4>{PAYLOAD_TEXT}</h4>
      </header>
      <div className={bemClasses.element(`payload-schema`)}>
        <SchemaComponent
          name={MESSAGE_PAYLOAD_TEXT}
          schema={payload}
          exampleTitle={PAYLOAD_EXAMPLE_TEXT}
          hideTitle={true}
        />
      </div>
    </div>
  );
};
