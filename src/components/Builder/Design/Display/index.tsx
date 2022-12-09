import React from "react";
import styled from "styled-components";
import { Single } from "./single";

export const Display = () => {
  return (
    <FormDesign key={"Display"}>
      {/* <Single /> */}
    </FormDesign>
  );
};

const FormDesign = styled.div`
  height: 92.5vh;
  overflow-y: auto;
  background: #b0c4df;
`;
