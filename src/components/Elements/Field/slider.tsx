import React, { useState } from "react";

import { Slider as SalesforceSlider } from "@salesforce/design-system-react";

export const Slider = ({ question }) => {
  const [answer, updateAnswer] = useState("");

  return (
    <SalesforceSlider
      value={answer || 0}
      id={question.Id}
      label={question.forms__Title__c}
      size="small"
      onChange={(e) => updateAnswer(e.target.value)}
      min={question.forms__Min_Range__c}
      max={question.forms__Max_Range__c}
      step={question.forms__Step__c}
      required={question.forms__Required__c}
    />
  );
};
