import React from "react";
import { RadioGroup as SalesforceRadioGroup } from "@salesforce/design-system-react";
import { Radio as SalesforceRadio } from "@salesforce/design-system-react";
import { Question__c } from "../../../utils/types/sObjects";

export const MultipleChoice = ({ question }: { question: Question__c }) => {

  return (
    <SalesforceRadioGroup
      labels={{ label: question.cforms__Title__c }}
      name={question.Name}
      required={question.cforms__Required__c}
    >
      {/* <SalesforceRadio
        key={option.Id}
        id={option.Id}
        labels={{ label: option.forms__Label__c }}
        value={option.Id}
        variant="base"
      /> */}
    </SalesforceRadioGroup>
  );
};
