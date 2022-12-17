import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Main from "./components/Elements/Theme";
import Builder from "./components/Builder";
import { BuilderContextProvider } from "./context/BuilderContext";

const Layout = styled.div`
  background: ${Main.color.white};
  margin: 0em;
  border-radius: 2px;
`;

ReactDOM.render(
  <Layout>
    <BuilderContextProvider>
      <Builder />
    </BuilderContextProvider>
  </Layout>,
  document.getElementById("app")
);

