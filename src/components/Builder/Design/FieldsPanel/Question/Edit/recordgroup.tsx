import React, { useState, useContext } from "react";
import ViewStyle from "../../../../../Elements/View/style";
import View from "../../../../../Elements/View";
import { Button } from "../../../../../Elements/Button";
import { call } from "../../../../../../query";

import { DesignContext, BuilderContext } from "../../../../../../context";
import { Select } from "../../../../../Elements/Select";
import { StatusHandler } from "../../../../../Elements/Notification";
import { BuilderController } from "../../../../../../utils/constants/methods";

export const RecordGroup = () => {
  const { form, setError } = useContext(BuilderContext);

  const {
    sObjects,
    activeQuestion,
    setActiveQuestion,
    setQuestions,
    setQuestionState,
    setQuestionUpdate,
  } = useContext(DesignContext);

  const updateLookupQuestion = (value: string) => {
    setActiveQuestion((question) => {
      return { ...question, forms__Salesforce_Object__c: value };
    });
  };

  const save = () => {
    //setQuestionUpdate(true);

    StatusHandler(
      form.forms__Status__c,
      () => setQuestionUpdate(false),
      () =>
        call(
          setError,
          BuilderController.saveQuestion,
          [JSON.stringify(activeQuestion)],
          (result, e) =>
            resultHandler(
              result,
              e,
              setQuestionUpdate,
              setQuestions,
              activeQuestion
            )
        ),
      null,
      setError
    );
  };

  const addFields = () => {
    setQuestionState("SF");
  };

  return [
    <ViewStyle key={"description"}>
      <h1>Record Group</h1>

      <p>Create a new Record for any standard or custom object you chose.</p>

      <Select
        options={sObjects}
        value={activeQuestion.forms__Salesforce_Object__c}
        onChange={(data) => updateLookupQuestion(data[0].value)}
      />
    </ViewStyle>,
    <ViewStyle key={"save"}>
      <Button
        disabled={
          activeQuestion.forms__Salesforce_Object__c == "" ||
            activeQuestion.forms__Salesforce_Object__c == null
            ? true
            : false
        }
        onClick={() => save()}
      >
        Save
      </Button>
    </ViewStyle>,
    <ViewStyle key={"description"}>
      <h1>Record Group Fields</h1>

      <p>Add Custom Fields to your Salesforce Record Group.</p>
    </ViewStyle>,
    <ViewStyle key={"save"}>
      <Button
        disabled={
          activeQuestion.forms__Salesforce_Object__c == "" ||
            activeQuestion.forms__Salesforce_Object__c == null
            ? true
            : false
        }
        onClick={() => addFields()}
      >
        Update Record Group Fields
      </Button>
    </ViewStyle>,
  ];
};

const resultHandler = (
  result,
  e,
  setQuestionUpdate,
  setQuestions,
  activeQuestion
) => {
  setQuestions((questions) => {
    return questions.map((question) => {
      if (question.Id == result) {
        return activeQuestion;
      }

      return question;
    });
  });

  setQuestionUpdate(false);
};
