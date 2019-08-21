import React, { FunctionComponent } from 'react';
// import styled from 'styled-components';
import { H4, Markdown } from '../../components';
import { Parameter as ParamType } from '../../types';

import { SchemaComponent } from '../Schemas/Schema';
import {
  StyledParameter,
  StyledParameter as ParameterWrapper,
  ParameterHeader,
} from './styled';

interface Props {
  name: string;
  param: ParamType;
}

export const Parameter: FunctionComponent<Props> = ({
  param: { description, location, schema },
  name = '',
}) => (
  <StyledParameter>
    <ParameterWrapper>
      {description ? (
        <ParameterHeader>
          {description && <Markdown>{description}</Markdown>}
        </ParameterHeader>
      ) : null}
      {location && <H4>Location: {location}</H4>}
      <SchemaComponent name={name} schema={schema} hideTitle={true} />
    </ParameterWrapper>
  </StyledParameter>
);
