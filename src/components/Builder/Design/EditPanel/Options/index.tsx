import React from "react";
import { useEditFormContext } from "../../../../../context/EditContext";
import { QuestionOptionTypes } from "../../../../../utils/options";

export const OptionsEdit = () => {
  const { question, options } = useEditFormContext();

  if (question != null && (Object).values(QuestionOptionTypes).includes(question.cforms__Type__c)) {
    return <section className="slds-ui-gen__vertical-layout">
      options edit
    </section>
  }

  return null;
}