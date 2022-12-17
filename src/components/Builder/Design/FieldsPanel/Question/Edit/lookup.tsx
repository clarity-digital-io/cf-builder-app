import React, { useState, useContext } from "react";
import ViewStyle from "../../../../../Elements/View/style";
import { Select } from "../../../../../Elements/Select";

import { DesignContext, EditContext } from "../../../../../../context";

export const Lookup = () => {
  const { additionalFields } = useContext(EditContext);

  const { sObjects, activeQuestion, setActiveQuestion, questions } =
    useContext(DesignContext);

  const updateLookupQuestion = (data) => {
    let value = data[0].value;
    setActiveQuestion((question) => {
      return { ...question, forms__Lookup__c: value };
    });
  };

  const updatFilter = (e) => { };

  return [
    <ViewStyle key="header">
      <h1>Lookup</h1>

      {activeQuestion.forms__Type__c == "REFERENCE" ? (
        <Select
          options={[activeQuestion.forms__Salesforce_Field__c]}
          value={activeQuestion.forms__Salesforce_Field__c}
          onChange={(e) => updateLookupQuestion(e)}
        />
      ) : (
        <Select
          options={sObjects}
          value={activeQuestion.forms__Lookup__c}
          onChange={(e) => updateLookupQuestion(e)}
        />
      )}
    </ViewStyle>,
  ];
};
