/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { Component } from 'react';
import { InputWrapper, InputField, Button } from './styled';
import { fetchSchema } from '@/utils';

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
          onChange={(e) => this.setState({ link: e.target.value })}
        />
        <Button type="button" onClick={this.fetchSchemaFromExternalResources}>
          Fetch schema
        </Button>
      </InputWrapper>
    );
  }

  private fetchSchemaFromExternalResources = async () => {
    try {
      new URL(this.state.link);
    } catch (e) {
      return;
    }
    const {
      props: { parentCallback },
      state: { link },
    } = this;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
    parentCallback((await fetchSchema(link)) as string);
  };
}

export default FetchSchema;
