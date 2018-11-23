import React, { Component } from 'react';

import { InputWrapper, InputField, Button } from './styled';

interface Props {
  link: string;
}

class FetchSchema extends Component<Props> {
  state = {
    value: "",
  }

  render() {
    const { value } = this.state;

    return (
      <InputWrapper>
        <InputField
          value={value}
          placeholder={"dupa"}
          onChange={(e: any) => this.setState({ value:  e.target.value })}
        />
        <Button type="button">Fetch schema</Button>
      </InputWrapper>
    );
  }
}

export default FetchSchema;
