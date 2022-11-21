import React, { useState } from "react";
import { Combobox } from "@salesforce/design-system-react";

export const Lookup = ({ question }) => {
  return (
    <Combobox
      id="combobox-inline-single"
      events={{
        onChange: (event, { value }) => {},
        onRequestRemoveSelectedOption: (event, data) => {},
        onSubmit: (event, { value }) => {},
        onSelect: (event, data) => {},
      }}
      labels={{
        label: question.forms__Title__c,
      }}
      options={[]}
      selection={[]}
      value={""}
      variant="inline-listbox"
    />
  );
};
