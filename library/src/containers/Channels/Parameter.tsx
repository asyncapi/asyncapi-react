import React, { FunctionComponent } from 'react';
// import styled from 'styled-components';
import { H4, Markdown } from '../../components';
import { Parameter as ParamType } from '../../types';

import { SchemaComponent } from '../Schemas/Schema';
import {
  StyledParameters,
  ParametersHeader,
  StyledParameter as ParameterWrapper,
  ParameterHeader,
} from './styled';

interface Props {
  name: string;
  param: ParamType;
}

export const Parameter: FunctionComponent<Props> = ({ param, name }) => {
  return (
    <StyledParameters>
      <ParametersHeader>
        <H4>Channel Parameters</H4>
      </ParametersHeader>
      <ParameterWrapper>
        {param.description ? (
          <ParameterHeader>
            {param.description && <Markdown>{param.description}</Markdown>}
          </ParameterHeader>
        ) : null}
        {param.location && <H4>Location: {param.location}</H4>}
        <SchemaComponent name={name} schema={param.schema} hideTitle={true} />
      </ParameterWrapper>
    </StyledParameters>
  );
};
//   {param.description && (
//     <>
//       <h4>Description:</h4>
//       <Markdown>{param.description}</Markdown>
//     </>
//   )}
//   {param.location && (
//     <>
//       <h4>Description:</h4>
//       {param.location}
//     </>
//   )}
//   {param.schema && (
//     <>
//       <h4>Schema</h4>
//       <SchemaComponent schema={param.schema} name={name} />
//     </>
//   )}
// </StyledDiv>

// const StyledDiv = styled.section`
//   padding: 10px;
//   border-bottom: 1px solid gray;
// `;

// import React, { Component } from 'react';

// import { Parameter } from '../../types';

// import { SchemaComponent } from '../Schemas/Schema';

// import { H4, Markdown } from '../../components';
// import {
//   Parameters,
//   ParametersHeader,
//   Parameter as ParameterWrapper,
//   ParameterHeader,
// } from './styled';

// interface Props {
//   parameters?: Parameter[];
//   hideTitle?: boolean;
// }

// class ParametersComponent extends Component<Props> {
//   render() {
//     const { parameters, hideTitle } = this.props;

//     if (!parameters) {
//       return null;
//     }

//     return (
//       <Parameters>
//         {!hideTitle && (
//           <ParametersHeader>
//             <H4>Topic Parameters</H4>
//           </ParametersHeader>
//         )}
//         {this.renderParameters()}
//       </Parameters>
//     );
//   }
//   private renderParameters() {
//     const { parameters } = this.props;

//     return parameters!.map((param, index) => (
//       <ParameterWrapper key={index}>
//         {param.name || param.description ? (
//           <ParameterHeader>
//             {param.name && <H4>{param.name}</H4>}
//             {param.description && <Markdown>{param.description}</Markdown>}
//           </ParameterHeader>
//         ) : null}
//         <SchemaComponent
//           name={param.name ? param.name : ''}
//           schema={param.schema}
//           hideTitle={true}
//         />
//       </ParameterWrapper>
//     ));
//   }
// }
