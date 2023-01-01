import React from "react";
import { Textarea as SalesforceTextarea } from "@salesforce/design-system-react";
import { Question__c } from "../../../utils/types/sObjects";

export const Comment = ({ question }: { question: Question__c }) => {
  return (
    <SalesforceTextarea
      aria-describedby={question.Id}
      id={question.Name}
      name={question.Name}
      label={question.cforms__Title__c}
      required={question.cforms__Required__c}
    />
  );
};
