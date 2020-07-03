import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #0d0d0d;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }`