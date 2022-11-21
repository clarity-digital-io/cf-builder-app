import React from "react";
import styled from "styled-components";

const BuilderLayout = ({ children }) => {
  return <App key={"BuilderApp"}>{children}</App>;
};

const App = styled.div`
  min-height: 100vh;
`;

export default BuilderLayout;
