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
    link: '',
  };

  render() {
    const { link } = this.state;

    return (
      <InputWrapper>
        <InputField
          value={link}
          placeholder="Link for external schema"
          onChange={(e: any) => this.setState({ link: e.target.value })}
        />
        <Button type="button" onClick={this.fetchSchemaFromExternalResources}>
          Fetch schema
        </Button>
      </InputWrapper>
    );
  }

  private fetchSchemaFromExternalResources = async () => {
    try {
      // tslint:disable-next-line
      new URL(this.state.link);
    } catch (e) {
      return;
    }
    const {
      props: { parentCallback },
      state: { link },
    } = this;
    parentCallback(await fetchSchema(link));
  };
}

export default FetchSchema;
