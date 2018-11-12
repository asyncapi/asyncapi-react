import React, { Component } from 'react';
const OpenAPISampler = require('openapi-sampler');

import { Header, H2, H3, H4, HeaderParagraph, TableColumn, Markdown } from '../../components';

import { Map, Parameter, Schema } from '../../common';

import { Parameters, ParametersHeader, Parameter as ParameterWrapper, ParameterHeader } from './styled';

import SchemaComponent from '../Schemas/Schema';

export interface ParametersProps {
  parameters?: Parameter[],
  hideTitle?: boolean,
}

class ParametersComponent extends Component<ParametersProps> {
  private renderParameters() {
    const { parameters } = this.props;

    if (parameters) {
      return parameters.map((param, index) => (
        <ParameterWrapper key={index}>
          {param.name || param.description ?
            <ParameterHeader>
              {param.name ? <H4>{param.name}</H4> : null}
              {param.description ? <Markdown>{param.description}</Markdown> : null}
            </ParameterHeader>
          : null}
          <SchemaComponent name={param.name ? param.name : ""} schema={param.schema} hideTitle={true} />
        </ParameterWrapper>
      ))
    }
    return null;
  }

  public render() {
    const { parameters, hideTitle } = this.props;

    return (
      parameters ?
        <Parameters>
          {!hideTitle ?
            <ParametersHeader>
              <H4>Topic Parameters</H4>
            </ParametersHeader>
          : null}
          {this.renderParameters()}
        </Parameters>
      : null
    );
  }
}

export default ParametersComponent;
