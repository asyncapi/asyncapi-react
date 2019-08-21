import React, { FunctionComponent } from 'react';
import { Parameters as ParamsType } from '../../types';
import { Parameter } from './Parameter';
import { H3 } from '../../components/';
import { StyledParameters, ParameterHeader } from './styled';

interface Props {
  params?: ParamsType;
}

export const Parameters: FunctionComponent<Props> = ({ params }) => {
  if (!params) {
    return null;
  }

  return (
    <StyledParameters>
      <ParameterHeader>
        <H3>Channel Parameters</H3>
      </ParameterHeader>
      {Object.entries(params).map(([name, param]) => (
        <Parameter key={name} param={param} name={name} />
      ))}
    </StyledParameters>
  );
};
