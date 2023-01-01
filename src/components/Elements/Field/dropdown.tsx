import React from "react";
import { Combobox } from "@salesforce/design-system-react";
import { Question__c } from "../../../utils/types/sObjects";

export const Dropdown = ({ question }: { question: Question__c }) => {
  return (
    <Combobox
      required={question.cforms__Required__c}
      id={question.Name}
      labels={{
        label: question.cforms__Title__c,
        placeholder: question.cforms__Title__c,
      }}
      options={[]}
      selection={''}
      value={""}
      variant="readonly"
    />
  );
};
