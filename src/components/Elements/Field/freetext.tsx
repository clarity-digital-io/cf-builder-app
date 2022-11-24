import React from "react";

export const FreeText = ({ question }) => {
  return question.forms__FreeText_Type__c == "Header" ? (
    <div className="slds-section__title slds-theme--shade primaryPaletteBorder">
      <span className="section-header-title slds-p-horizontal--small slds-truncate">
        {question.forms__Title__c}
      </span>
    </div>
  ) : (
    <div className="slds-text-body_small">{question.forms__Title__c}</div>
  );
};
