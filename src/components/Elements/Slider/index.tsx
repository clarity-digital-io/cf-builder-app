import React from "react";

import { Slider as SalesforceSlider } from "@salesforce/design-system-react";

export const Slider = ({ min, max, defaultValue, onChange }) => {
  return (
    <SalesforceSlider
      id={"Slider"}
      size="small"
      defaultValue={defaultValue}
      min={min}
      max={max}
      onChange={(e) => onChange(e)}
    />
  );
};
