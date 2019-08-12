import React, { FunctionComponent } from 'react';
import { Parameters as ParamsType } from '../../types';
import { Parameter } from './Parameter';
import { H3 } from '../../components/';
interface Props {
  params: ParamsType;
}

export const Parameters: FunctionComponent<Props> = ({ params }) => {
  const paramList = Object.keys(params).map(elem => ({
    name: elem,
    param: params[elem],
  }));

  return (
    <>
      <H3>Parameters</H3>
      {paramList.map(arg => (
        <Parameter key={arg.name} param={arg.param} name={arg.name} />
      ))}
    </>
  );
};
