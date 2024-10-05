import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createGlobalStyle } from "styled-components";

const GlobalSyle = createGlobalStyle`

*{
  box-sizing:border-box;

  margin: 0;
  padding: 0;
  body{
    background-color: #5D5A5A;
    color: white;
    min-height: 100vh;
  }

}
`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalSyle></GlobalSyle>
    <App />
  </StrictMode>
);
