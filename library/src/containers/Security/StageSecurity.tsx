import React, { FunctionComponent } from 'react';
import { SecurityRequirement } from '../../types';
import styled from 'styled-components';

interface Props {
  stage: string;
  security: SecurityRequirement[] | undefined;
}

export const StageSecurity: FunctionComponent<Props> = ({
  stage,
  security,
}) => {
  if (!security) {
    return null;
  }
  return (
    <div>
      <h3>{stage}</h3>

      {security.map(arg => (
        <div>
          <StyledSecRequirement>
            {Object.keys(arg)[0] + ' '}
          </StyledSecRequirement>
          {arg[Object.keys(arg)[0]].map(elem => (
            <p>{elem}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

const StyledSecRequirement = styled.p`
  color: teal;
`;
