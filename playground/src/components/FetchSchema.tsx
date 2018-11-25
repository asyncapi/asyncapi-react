import React, { Component } from 'react';

import { InputWrapper, InputField, Button } from './styled';

import { fetchSchema } from '../common';

interface Props {
  parentCallback(value: string): void;
}

interface State {
  link: string;
}

class FetchSchema extends Component<Props, State> {
  state = {
    link: "",
  }

  private fetchSchemaFromExternalResources = async () => {
    const { props: { parentCallback }, state: { link } } = this;
    parentCallback(await fetchSchema(link))
  }

  render() {
    const { link } = this.state;

    return (
      <InputWrapper>
        <InputField
          value={link}
          placeholder="Link for external schema"
          onChange={(e: any) => this.setState({ link:  e.target.value })}
        />
        <Button type="button" onClick={this.fetchSchemaFromExternalResources}>Fetch schema</Button>
      </InputWrapper>
    );
  }
}

export default FetchSchema;
