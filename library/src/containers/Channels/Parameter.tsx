import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Markdown } from '../../components';
import { Parameter as ParamType } from '../../types';
import {} from './styled';
interface Props {
  name: string;
  param: ParamType;
}

export const Parameter: FunctionComponent<Props> = ({ param, name }) => {
  console.log(param, name);
  return (
    <StyledDiv>
      * - <span>{name}</span>
      {param.description && (
        <>
          <h4>Description:</h4>
          <Markdown>{param.description}</Markdown>
        </>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.section`
  padding: 10px;
  border-bottom: 1px solid gray;
`;
