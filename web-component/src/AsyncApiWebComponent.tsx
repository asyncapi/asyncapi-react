import * as React from 'react';
// @ts-ignore
import { register } from 'web-react-components';
import AsyncApiComponent, { AsyncApiProps } from '@asyncapi/react-component';

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
      this.props.cssImportPath || 'assets/asyncapi.css';

    return (
      <>
        <style>@import '{finalCssImportPath}';</style>
        <AsyncApiComponent {...this.props} />
      </>
    );
  }
}

register(AsyncApiWebComponent, 'asyncapi-component', [
  'schema',
  'config',
  'cssImportPath',
]);
