import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    background-color: rgb(231, 235, 240);
  }
`