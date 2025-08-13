import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8f9fa;
    line-height: 1.6;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    color: #667eea;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Responsive breakpoints */
  @media (max-width: 1200px) {
    .container {
      max-width: 960px;
    }
  }

  @media (max-width: 992px) {
    .container {
      max-width: 720px;
    }
  }

  @media (max-width: 768px) {
    .container {
      max-width: 540px;
    }
  }

  @media (max-width: 576px) {
    .container {
      max-width: 100%;
      padding: 0 15px;
    }
  }
`;

export default GlobalStyle;
