import React from "react";

import { Slider as SalesforceSlider } from "@salesforce/design-system-react";
import { Question__c } from "../../../utils/types/sObjects";

export const Slider = ({ question }: { question: Question__c }) => {

  return (
    <SalesforceSlider
      value={0}
      id={question.Id}
      label={question.cforms__Title__c}
      size="full"
      min={question.cforms__Min_Range__c}
      max={question.cforms__Max_Range__c}
      step={question.cforms__Step__c}
      required={question.cforms__Required__c}
    />
  );
};
