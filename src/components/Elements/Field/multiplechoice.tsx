import React, { useContext } from "react";
import { DesignContext } from "../../../context";
import { RadioGroup as SalesforceRadioGroup } from "@salesforce/design-system-react";
import { Radio as SalesforceRadio } from "@salesforce/design-system-react";

export const MultipleChoice = ({ question }) => {
  const { questionOptions } = useContext(DesignContext);

  return (
    <SalesforceRadioGroup
      labels={{ label: question.forms__Title__c }}
      onChange={(event) => console.log(event)}
      name={question.forms__Label__c}
      required={question.forms__Required__c}
    >
      {questionOptions.get(question.Id) != null
        ? questionOptions.get(question.Id).map((option) => {
          return (
            <SalesforceRadio
              key={option.Id}
              id={option.Id}
              labels={{ label: option.forms__Label__c }}
              value={option.Id}
              variant="base"
            />
          );
        })
        : null}
    </SalesforceRadioGroup>
  );
};
