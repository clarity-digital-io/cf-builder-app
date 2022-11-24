import React from "react";
import { Button as SalesforceButton } from "@salesforce/design-system-react";
import { ButtonProps } from "../../../utils/types";


export const Button = ({ variant, onClick, disabled, children }: ButtonProps) => {
  return (
    <SalesforceButton
      variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </SalesforceButton>
  );
};
