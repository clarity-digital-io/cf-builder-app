import React, { useState, useContext } from "react";
import ViewStyle from "../../../../Elements/View/style";
import { DesignContext } from "../../../../../context";
import { Slider } from "../../../../Elements/Slider";

export const Comment = () => {
  const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

  const handleMaxLengthUpdate = (e) => {
    let value = e.target.value;
    setActiveQuestion((question) => {
      return { ...question, forms__Max_Length__c: value };
    });
  };

  return (
    <ViewStyle>
      <h1>Comment Settings</h1>

      <ViewStyle>
        <p>Maximum characters accepted.</p>

        <Slider
          min={0}
          max={1000}
          defaultValue={activeQuestion.forms__Max_Length__c || 1000}
          onChange={(e) => handleMaxLengthUpdate(e)}
        />
      </ViewStyle>
    </ViewStyle>
  );
};
