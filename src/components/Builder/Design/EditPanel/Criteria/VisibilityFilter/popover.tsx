import React, { ReactElement, useState } from "react";

import { Popover, Button } from "@salesforce/design-system-react";
import { Question_Criteria__c, Question__c } from "../../../../../../utils/types/sObjects";
import { BuilderContextProvider } from "../../../../../../context/BuilderContext";
import { VisibilityFilter } from "./filter";

export const VisibilityFilterPopover = ({ question, criterion, children }: { question: Question__c, criterion: Question_Criteria__c, children: ReactElement }) => {

  const handleCriterionUpdate = (test) => {
    console.log(test)
  }

  const [isOpen, setOpen] = useState(false);

  return <Popover
    position={'overflowBoundaryElement'}
    isOpen={isOpen}
    body={
      <BuilderContextProvider>
        <VisibilityFilter question={question} criterion={criterion} handleCriterionUpdate={handleCriterionUpdate} />
      </BuilderContextProvider>
    }
    footer={
      <div className="slds-text-align_right">
        <Button label="Cancel" onClick={() => setOpen(false)} />
      </div>
    }
    id="popover-controlled-with-footer"
    onClose={() => setOpen(false)}
    onRequestClose={() => setOpen(false)}
  >
    <button onClick={() => setOpen(true)}>
      {children}
    </button>
  </Popover >
}