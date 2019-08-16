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
  const paramList = Object.keys(params).map(elem => ({
    name: elem,
    param: params[elem],
  }));

  return (
    <StyledParameters>
      <ParameterHeader>
        <H3>Channel Parameters</H3>
      </ParameterHeader>
      {paramList.map(arg => (
        <Parameter key={arg.name} param={arg.param} name={arg.name} />
      ))}
    </StyledParameters>
  );
};
