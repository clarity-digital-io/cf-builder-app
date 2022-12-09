import React from "react";

import styled from "styled-components";
import Main from "../Elements/Theme";
import { Props } from "../../utils/types";
import { BuilderContextProvider } from "../../context/BuilderContext";

const App: React.FC<Props> = ({ children }) => {
  return (
    <Layout>
      <BuilderContextProvider>
        {children}
      </BuilderContextProvider>
    </Layout>
  );
};

const Layout = styled.div`
  background: ${Main.color.white};
  margin: 0em;
  border-radius: 2px;
`;

export default App;
