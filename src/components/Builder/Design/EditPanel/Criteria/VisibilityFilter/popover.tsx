import React, { ReactElement, useState } from "react";

import { Popover as SalesforcePopover, Button } from "@salesforce/design-system-react";
import { Question_Criteria__c, Question__c } from "../../../../../../utils/types/sObjects";
import { BuilderContextProvider, useBuilderContext } from "../../../../../../context/BuilderContext";
import { VisibilityFilter } from "./filter";
import styled from "styled-components";

export const VisibilityFilterPopover = ({ handleUpdateCriterion, question, criterion, children }: { handleUpdateCriterion: (criterion: Question_Criteria__c) => void, question: Question__c, criterion: Question_Criteria__c, children: ReactElement }) => {

  const [criterionUpdate, setCriterionUpdate] = useState<Question_Criteria__c>();
  const [isOpen, setOpen] = useState(false);

  const handleCriterionUpdate = (_criterionUpdate: Question_Criteria__c) => {
    setCriterionUpdate(_criterionUpdate);
  }

  return <Popover
    hasNoTriggerStyles={true}
    onRequestClose={() => setOpen(false)}
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
        <Button variant='brand' label="Done" onClick={() => {
          if (criterionUpdate == null) return;
          const { operatorSelection, selection } = criterionUpdate;
          setOpen(false)
          handleUpdateCriterion({ ...criterion, cforms__Question__c: selection.id, cforms__Operator__c: operatorSelection.id })
        }} />
      </div>
    }
    id="popover-controlled-with-footer"
    onClose={() => setOpen(false)}
  >
    <div className="slds-m-top_x-small" onClick={() => setOpen(true)}>
      {children}
    </div>
  </Popover >
}

const Popover = styled(SalesforcePopover)`
  z-index: 9999 !important;
`;