import React, { Component } from 'react';

import { H4, Markdown } from '../../components';
import { Parameter } from '../../common';
import { Parameters, ParametersHeader, Parameter as ParameterWrapper, ParameterHeader } from './styled';

import SchemaComponent from '../Schemas/Schema';

interface Props {
  parameters?: Parameter[],
  hideTitle?: boolean,
}

class ParametersComponent extends Component<Props> {
  private renderParameters() {
    const { parameters } = this.props;

    return parameters!.map((param, index) => (
      <ParameterWrapper key={index}>
        {param.name || param.description ?
          <ParameterHeader>
            {param.name && <H4>{param.name}</H4>}
            {param.description && <Markdown>{param.description}</Markdown>}
          </ParameterHeader>
        : null}
        <SchemaComponent name={param.name ? param.name : ""} schema={param.schema} hideTitle={true} />
      </ParameterWrapper>
    ))
  }

  render() {
    const { parameters, hideTitle } = this.props;

    if (!parameters) return null;

    return (
      <Parameters>
        {!hideTitle &&
          <ParametersHeader>
            <H4>Topic Parameters</H4>
          </ParametersHeader>
        }
        {this.renderParameters()}
      </Parameters>
    );
  }
}

export default ParametersComponent;
