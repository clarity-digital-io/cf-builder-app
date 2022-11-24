import React from "react";
import styled from "styled-components";
import { Props } from "../../../utils/types";

const BuilderLayout: React.FC<Props> = ({ children }) => {
  return <App key={"BuilderApp"}>{children}</App>;
};

const App = styled.div`
  min-height: 100vh;
`;

export default BuilderLayout;
