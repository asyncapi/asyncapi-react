import React, { FunctionComponent } from 'react';

import { RawMessage, isOneOfPayload } from '../../types';

import { H4 } from '../../components';
import { SchemaComponent } from '../Schemas/Schema';

import { MessagePayload, MessagePayloadHeader } from './styled';

type PayloadProps = Required<Pick<RawMessage, 'payload'>>;

export const PayloadComponent: FunctionComponent<PayloadProps> = ({
  payload,
}) => {
  if (isOneOfPayload(payload)) {
    return (
      <>
        <H4>Possible Payloads</H4>
        {payload.oneOf.map((elem: any, index: number) => (
          <PayloadComponent payload={elem} key={index} />
        ))}
      </>
    );
  }
  return (
    <MessagePayload>
      <MessagePayloadHeader>
        <H4>Payload</H4>
      </MessagePayloadHeader>
      <SchemaComponent
        name="Message Payload"
        schema={payload}
        exampleTitle="Example of payload"
        hideTitle={true}
      />
    </MessagePayload>
  );
};
