import React, { useContext } from "react";
import styled from "styled-components";
import { BuilderContext } from "../../../Context";
import { Single } from "./single";
import { Multi } from "./multi";

export const Display = () => {
  const { form } = useContext(BuilderContext);

  return (
    <FormDesign key={"Display"}>
      {form.forms__Multi_Page__c ? (
        <Multi form={form} />
      ) : (
        <Single form={form} />
      )}
    </FormDesign>
  );
};

const FormDesign = styled.div`
  height: 92.5vh;
  overflow-y: auto;
  background: #b0c4df;
`;
