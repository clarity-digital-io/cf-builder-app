import React, { ReactElement, useState } from "react";

import { Popover as SalesforcePopover, Button } from "@salesforce/design-system-react";
import { Question_Criteria__c, Question__c } from "../../../../../../utils/types/sObjects";
import { BuilderContextProvider, useBuilderContext } from "../../../../../../context/BuilderContext";
import { VisibilityFilter } from "./filter";
import styled from "styled-components";

export const VisibilityFilterPopover = ({ setNewCriterion, question, criterion, children }: { setNewCriterion, question: Question__c, criterion: Question_Criteria__c, children: ReactElement }) => {

  const { dndQuestions } = useBuilderContext();
  console.log('VisibilityFilterPopover', { dndQuestions })

  const [criterionUpdate, setCriterionUpdate] = useState();
  const [isOpen, setOpen] = useState(false);

  const handleCriterionUpdate = (_criterionUpdate) => {
    console.log({ _criterionUpdate });
    setCriterionUpdate(_criterionUpdate);
  }

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
        <Button variant='brand' label="Done" onClick={() => {
          if (criterionUpdate == null) return;
          const { operatorSelection, selection } = criterionUpdate;
          setOpen(false)
          setNewCriterion({ ...criterion, cforms__Question__c: selection.id, cforms__Operator__c: operatorSelection.id })
        }} />
      </div>
    }
    id="popover-controlled-with-footer"
    onClose={() => setOpen(false)}
    onRequestClose={() => setOpen(false)}
  >
    <div className="slds-box slds-m-top_x-small" onClick={() => setOpen(true)}>
      {children}
    </div>
  </Popover >
}

const Popover = styled(SalesforcePopover)`
  z-index: 9999 !important;
`;