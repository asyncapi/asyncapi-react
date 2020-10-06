// @ts-ignore
import { register } from 'web-react-components';
import AsyncApiComponent, { AsyncApiProps } from '@kyma-project/asyncapi-react';

import * as React from 'react';

export interface AsyncApiWebComponentProps extends AsyncApiProps {
  cssImportPath?: string;
}

export class AsyncApiWebComponent extends React.Component<
  AsyncApiWebComponentProps
> {
  constructor(props: AsyncApiWebComponentProps) {
    super(props);
  }

  render() {
    const finalCssImportPath =
      this.props.cssImportPath || '/assets/async-api/fiori.css';

    return (
      <>
        <style>@import '{finalCssImportPath}';</style>
        <AsyncApiComponent {...this.props} />
      </>
    );
  }
}

register(AsyncApiWebComponent, 'async-api-component', [
  'schema',
  'config',
  'cssImportPath',
]);
