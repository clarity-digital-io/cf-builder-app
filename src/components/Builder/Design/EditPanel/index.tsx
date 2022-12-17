import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { BreadCrumb } from "@salesforce/design-system-react";

import { useEditFormContext } from "../../../../context/EditContext";

import { OptionsEdit } from "./Options";
import { CriteriaEdit } from "./Criteria";
import { QuestionEdit } from "./Question";
import { FormEdit } from "./Form";

export const Edit = () => {

  const { question } = useEditFormContext()
  console.log({ question })
  return <Panel header="Form">

    {
      question ?
        <>
          <QuestionEdit />
          <OptionsEdit />
          <CriteriaEdit />
        </> :
        <FormEdit />
    }

    {/* <div>
      edit question
      <span>
        -- edit question logic criteria
      </span>
      <span>
        -- edit record group question
      </span>
      <span>
        -- useQuestionContext to manage state HERE
      </span>
    </div>
    <div>
      <span>
        !! maybe to be done here not sure yet
      </span>

      <span>
        need to set a form connection too
      </span>
      <span>
        (prefill) question
      </span>
      <span>
        (mapping) question answer to a new object or a existing one (update)
      </span>
      <span>
        prefill and mapping use the same object to store info
      </span>
    </div> */}
  </Panel>
}

const Panel = ({ header, children }: { header: string, children: ReactElement[] | ReactElement }) => {

  const { question, setQuestionUpdate } = useEditFormContext();

  const [trail, setTrail] = useState<Array<JSX.Element>>([
    <a key={'parent'} id="parent-entity">{header}</a>
  ]);

  const buildTrail = useCallback(() => {
    if (question) {
      setTrail(
        [
          <a key={'parent'} id="parent-entity" onClick={() => setQuestionUpdate(null)}>{header}</a>,
          <a key={'child'} id="parent-entity">{question.cforms__Title__c}</a>
        ]
      )
    } else {
      setTrail([
        <a key={'parent'} id="parent-entity">{header}</a>
      ])
    }
  }, [question, trail]);

  useEffect(() => {
    buildTrail();
  }, [question]);

  return <div className="slds-panel slds-size_medium slds-panel_docked slds-panel_docked-right slds-is-open" aria-hidden="false">
    <div className="slds-panel__header">
      <BreadCrumb
        assistiveText={{ label: 'Form edit breadcrumbs' }}
        trail={trail}
      />
    </div>
    <div className="slds-panel__body">
      {children}
    </div>
  </div>
}