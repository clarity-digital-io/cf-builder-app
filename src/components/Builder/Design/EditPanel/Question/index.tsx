import React from "react";
import { useEditFormContext } from "../../../../../context/EditContext";

import { Input, Checkbox } from "@salesforce/design-system-react";

export const QuestionEdit = () => {
  const { question, setQuestionUpdate } = useEditFormContext();

  if (!question) {
    return <div>
      no question selected
    </div>
  }

  return <section className="slds-ui-gen__vertical-layout">
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      <Input
        id="base-id"
        label="Title"
        placeholder="My placeholder"
        value={question.cforms__Title__c}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestionUpdate({
          ...question,
          cforms__Title__c: e.target.value
        })}
      />
    </div>
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      <Checkbox
        labels={{
          label: 'Required',
        }}
        id="checkbox-toggle-example--required"
        variant="toggle"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestionUpdate({
          ...question,
          cforms__Required__c: e.target.value
        })}
        required
      />
    </div>
  </section>
}