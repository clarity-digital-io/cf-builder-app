import React, { useContext } from "react";
import { Checkbox as SalesforceCheckbox } from "@salesforce/design-system-react";
import { DesignContext } from "../../Context";

export const Checkbox = ({ question }) => {
  const { questionOptions } = useContext(DesignContext);

  return (
    <fieldset className="slds-form-element slds-form-element_stacked">
      <legend className="slds-form-element__legend slds-form-element__label">
        {question.forms__Title__c}
      </legend>
      {questionOptions.get(question.Id) != null
        ? questionOptions.get(question.Id).map((option, index) => {
            return (
              <SalesforceCheckbox
                key={index}
                assistiveText={{
                  label: option.forms__Label__c,
                }}
                id={option.Id}
                labels={{
                  label: option.forms__Label__c,
                }}
                onChange={(e, status) => {}}
                checked={false}
              />
            );
          })
        : []}
    </fieldset>
  );
};
