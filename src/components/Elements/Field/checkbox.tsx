import React from "react";
import { Checkbox as SalesforceCheckbox } from "@salesforce/design-system-react";
import { Question__c } from "../../../utils/types/sObjects";

export const Checkbox = ({ question }: { question: Question__c }) => {
  return (
    <fieldset className="slds-form-element slds-form-element_stacked">
      <legend className="slds-form-element__legend slds-form-element__label">
        {question.cforms__Title__c}
      </legend>
      <SalesforceCheckbox
        key={0}
        assistiveText={{
          label: 'Checkbox 1'
        }}
        id={0}
        labels={{
          label: 'Checkbox 1'
        }}
        checked={false}
      />
    </fieldset>
  );
};
