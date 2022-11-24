import React, { useState, useEffect, useContext } from "react";
import { call } from "../../../RemoteActions";
import { EditContext, DesignContext, BuilderContext } from "../../../Context";
import { Props } from "../../../../utils/types";

export const EditProvider: React.FC<Props> = ({ children }) => {
  const { setError } = useContext(BuilderContext);

  const { navQuestion, activeQuestion, recordGroup } =
    useContext(DesignContext);

  const [activeRecordGroup, setActiveRecordGroup] = useState([]);

  const [loading, setLoading] = useState(false);

  const [activeQuestionOptions, setActiveQuestionOptions] = useState([]);

  const [activeQuestionConnectedFields, setActiveQuestionConnectedFields] =
    useState([]);

  const [criteria, setCriteria] = useState([]);

  const [edit, setEdit] = useState(null);

  useEffect(() => {
    if (navQuestion) {
      setAdditionalFields([]);
      setRequiredFields([]);
      setActiveQuestionOptions(
        activeQuestion.forms__Question_Options__r != null
          ? activeQuestion.forms__Question_Options__r
          : []
      );
      setCriteria(
        activeQuestion.forms__Question_Criteria__r != null
          ? activeQuestion.forms__Question_Criteria__r
          : []
      );
    }
  }, [navQuestion]);

  const [additionalFields, setAdditionalFields] = useState([]);

  const [requiredFields, setRequiredFields] = useState([]);

  const [sObjectEdit, setSObjectEdit] = useState(null);

  useEffect(() => {
    if (sObjectEdit) {
      if (activeQuestion.forms__Type__c == "RecordGroup") {
        setLoading(true);
        call(
          setError,
          "BuilderController.getSObjectFields",
          [activeQuestion.forms__Salesforce_Object__c],
          (result, e) =>
            getSObjectFieldResultHandler(
              result,
              e,
              activeQuestion,
              setRequiredFields,
              setAdditionalFields,
              setSObjectEdit,
              setActiveRecordGroup,
              setLoading,
              recordGroup
            )
        );
      }
    }
  }, [sObjectEdit]);

  return (
    <EditContext.Provider
      value={{
        activeRecordGroup,
        setActiveRecordGroup,
        loading,
        setLoading,
        activeQuestionOptions,
        setActiveQuestionOptions,
        activeQuestionConnectedFields,
        setActiveQuestionConnectedFields,
        criteria,
        setCriteria,
        edit,
        setEdit,
        additionalFields,
        setAdditionalFields,
        requiredFields,
        setRequiredFields,
        sObjectEdit,
        setSObjectEdit,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

const getSObjectFieldResultHandler = (
  result,
  e,
  activeQuestion,
  setRequiredFields,
  setAdditionalFields,
  setSObjectEdit,
  setActiveRecordGroup,
  setLoading,
  recordGroup
) => {
  setSObjectEdit("");
  setAdditionalFields(result.NotRequired);
  setRequiredFields(result.Required);

  setActiveRecordGroup((active) => {
    let existing = recordGroup.has(activeQuestion.Id)
      ? recordGroup.get(activeQuestion.Id)
      : [];
    console.log("existing", existing, recordGroup);
    if (existing.length > 0) {
      return existing;
    }

    let newRequired = Object.keys(result.Required).map((field, index) => {
      let val = result.Required[field];

      let fieldType = Object.keys(val)[0];

      return {
        forms__Form__c: activeQuestion.forms__Form__c,
        forms__Logic__c: "AND",
        forms__Type__c: fieldType,
        forms__Title__c: field,
        forms__Salesforce_Field__c: field,
        forms__Record_Group__c: activeQuestion.Id,
        forms__Order__c: index,
        forms__Page__c: 0,
        forms__Required__c: true,
      };
    });

    return newRequired;
  });

  setLoading(false);
};
