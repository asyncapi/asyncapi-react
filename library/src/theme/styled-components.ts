import * as styledComponents from 'styled-components';

import { ThemeInterface } from './theme';

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

export { styled, css, ThemeProvider };
