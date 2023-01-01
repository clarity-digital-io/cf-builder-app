import React from "react";
import { CenterSpinner } from "../Elements/Spinner";
import { IconSettings } from "@salesforce/design-system-react";
import { useBuilderContext } from "../../context/BuilderContext";
import Navigation from "./Navigation";
import Design from "./Design"
import styled from "styled-components";

const Builder = () => {

  const { form, isLoading } = useBuilderContext();

  return (
    <Layout>
      <IconSettings iconPath={getIconPath()}>
        {
          form && !isLoading ?
            <>
              <Navigation />
              <Design />
            </> :
            <CenterSpinner />
        }
      </IconSettings>
    </Layout>
  );
};

const Layout = styled.section`
  min-height: 100vh;
`;

const getIconPath = () => {
  return process.env.NODE_ENV == "development"
    ? "/assets/icons"
    : "/_slds/icons";
};

export default Builder;
