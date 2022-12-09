import React from "react";
import { DragDrop } from "./Design";
import { CenterSpinner } from "../Elements/Spinner";
import { IconSettings } from "@salesforce/design-system-react";
import { useBuilderContext } from "../../context/BuilderContext";
import styled from "styled-components";

const Builder = () => {

  const { form, isLoading } = useBuilderContext();
  console.log({ form, isLoading })
  return (
    <Layout>
      <IconSettings iconPath={getIconPath()}>
        {form ? <DragDrop /> : <CenterSpinner />}
      </IconSettings>
    </Layout>
  );
};

const Layout = styled.div`
  min-height: 100vh;
`;

const getIconPath = () => {
  return process.env.NODE_ENV == "development"
    ? "/assets/icons"
    : "/_slds/icons";
};

export default Builder;
