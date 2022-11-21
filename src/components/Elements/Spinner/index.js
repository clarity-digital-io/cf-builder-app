import React from "react";
import styled, { css } from "styled-components";

import { Spinner as SalesforceSpinner } from "@salesforce/design-system-react";

export const Spinner = () => {
  return (
    <SpinHolder>
      <SalesforceSpinner
        size="small"
        variant="base"
        assistiveText={{ label: "Main Frame Loading..." }}
      />
    </SpinHolder>
  );
};

const SpinHolder = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
`;

export const CenterSpinner = () => {
  return (
    <CenterHolder>
      <SalesforceSpinner
        size="small"
        variant="base"
        assistiveText={{ label: "Main Frame Loading..." }}
      />
    </CenterHolder>
  );
};

const CenterHolder = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
`;
