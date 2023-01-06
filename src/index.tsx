import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Main from "./components/Elements/Theme";
import Builder from "./components/Builder";
import { BuilderContextProvider } from "./context/BuilderContext";
import { SetupContextProvider } from "./context/SetupContext";

const Layout = styled.div`
  background: ${Main.color.white};
  margin: 0em;
  border-radius: 2px;
`;

ReactDOM.render(
  <Layout>
    <SetupContextProvider>
      <BuilderContextProvider>
        <Builder />
      </BuilderContextProvider>
    </SetupContextProvider>
  </Layout>,
  document.getElementById("app")
);

