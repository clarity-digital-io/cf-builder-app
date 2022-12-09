import React, { useContext, useState } from "react";
import { DesignContext } from "../../../context";
import { Combobox } from "@salesforce/design-system-react";

export const Dropdown = ({ question }) => {
  const { questionOptions } = useContext(DesignContext);
  const [selection, setSelection] = useState([]);
  return (
    <Combobox
      required={question.forms__Required__c}
      id={question.Name}
      events={{
        onSelect: (event, data) => setSelection(data.selection),
      }}
      labels={{
        label: question.forms__Title__c,
        placeholder: question.forms__Placeholder__c,
      }}
      options={
        questionOptions.get(question.Id) != null
          ? questionOptions.get(question.Id).map((option) => {
            return {
              id: option.Id,
              label: option.forms__Label__c,
              value: option.Id,
            };
          })
          : null
      }
      selection={selection}
      value={""}
      variant="readonly"
    />
  );
};
