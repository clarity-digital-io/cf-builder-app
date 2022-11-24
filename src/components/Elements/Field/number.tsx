import React, { useState } from "react";
import { Input } from "@salesforce/design-system-react";

export const Number = ({ question, disabled = false }) => {
  const [value, updateValue] = useState(0);

  return (
    <Input
      id={question.Id}
      label={question.forms__Title__c}
      onChange={(e, data) => updateValue(data.number)}
      value={value || ""}
      variant="counter"
      required={question.forms__Required__c}
    />
  );
};
