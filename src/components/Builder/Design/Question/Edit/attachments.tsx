import React, { useContext } from "react";
import ViewStyle from "../../../../Elements/View/style";
import { DesignContext } from "../../../../Context";
import { Slider } from "../../../../Elements/Slider";

import { RadioGroup as SalesforceRadioGroup } from "@salesforce/design-system-react";

import { Radio as SalesforceRadio } from "@salesforce/design-system-react";

export const Attachments = () => {
  const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

  const handleMaxLengthUpdate = (value) => {
    setActiveQuestion((question) => {
      return { ...question, forms__Max_Length__c: value };
    });
  };

  const onChange = (e) => {
    let value = e.target.value;

    setActiveQuestion((question) => {
      return { ...question, forms__Attachment_Type__c: value };
    });
  };

  return [
    <ViewStyle>
      <p>Maximum attachments accepted.</p>

      <Slider
        min={0}
        max={10}
        defaultValue={activeQuestion.forms__Max_Length__c}
        onChange={(e) => handleMaxLengthUpdate(e)}
      />
    </ViewStyle>,
    <ViewStyle>
      <p>Select an Attachment Type.</p>

      <SalesforceRadioGroup
        onChange={(event) => onChange(event)}
        name={"Free Text Type"}
      >
        <SalesforceRadio
          key={"Photo"}
          id={"Photo"}
          labels={{ label: "Photo" }}
          value={"Photo"}
          checked={activeQuestion.forms__Attachment_Type__c == "Photo"}
          variant="base"
        />
        <SalesforceRadio
          key={"Other"}
          id={"Other"}
          labels={{ label: "Other" }}
          value={"Other"}
          checked={activeQuestion.forms__Attachment_Type__c == "Other"}
          variant="base"
        />
      </SalesforceRadioGroup>
    </ViewStyle>,
  ];
};
