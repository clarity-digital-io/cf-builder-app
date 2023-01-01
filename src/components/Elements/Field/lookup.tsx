import React from "react";
import { Combobox } from "@salesforce/design-system-react";
import { Question__c } from "../../../utils/types/sObjects";

export const Lookup = ({ question }: { question: Question__c }) => {
  return (
    <Combobox
      id="combobox-inline-single"
      labels={{
        label: question.cforms__Title__c,
      }}
      options={[]}
      selection={[]}
      value={""}
      variant="inline-listbox"
    />
  );
};
