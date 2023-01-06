import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { BreadCrumb } from "@salesforce/design-system-react";

import { OptionsEdit } from "./Options";
import { CriteriaEdit } from "./Criteria";
import { QuestionEdit } from "./Question";
import { FormEdit } from "./Form";
import { useBuilderContext } from "../../../../context/BuilderContext";
import { QuestionOptionTypes } from "../../../../utils/options";

export const Edit = () => {

  const { question } = useBuilderContext()

  const isOptionsType = question != null && (Object).values(QuestionOptionTypes).includes(question.cforms__Type__c)

  return <Panel header="Form">

    {
      question ?
        <>
          <QuestionEdit />
          {isOptionsType && <OptionsEdit />}
          <CriteriaEdit />
        </> :
        <FormEdit />
    }

  </Panel>
}

const Panel = ({ header, children }: { header: string, children: ReactElement[] | ReactElement }) => {

  const { question, initQuestionEdit } = useBuilderContext();

  const [trail, setTrail] = useState<Array<JSX.Element>>([
    <a key={'parent'} id="parent-entity">{header}</a>
  ]);

  const buildTrail = useCallback(() => {
    if (question) {
      setTrail(
        [
          <a key={'parent'} id="parent-entity" onClick={() => initQuestionEdit(null)}>{header}</a>,
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