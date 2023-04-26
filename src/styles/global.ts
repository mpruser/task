import { createGlobalStyle } from 'styled-components';
import { variables } from './variables';
import { reset } from './reset';

export const GlobalStyle = createGlobalStyle`
  ${variables}
  ${reset}
`;
