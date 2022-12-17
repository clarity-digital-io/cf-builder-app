import React, { useEffect, useContext } from "react";
import { DesignContext, EditContext } from "../../../../../../context";

import View from "../../../../../Elements/View";
import ViewStyle from "../../../../../Elements/View/style";

import Box from "../../../../../Elements/Box";

import CloseIcon from "../../../../../Elements/Icons/close";

import { Select } from "../../../../../Elements/Select";
import { Button } from "../../../../../Elements/Button";

export const SalesforceFields = ({ questionId }) => {
  const {
    activeRecordGroup,
    setActiveRecordGroup,
    setSObjectEdit,
    requiredFields,
  } = useContext(EditContext);
  const { recordGroup, activeQuestion } = useContext(DesignContext);

  useEffect(() => {
    setActiveRecordGroup((active) => {
      return recordGroup.has(activeQuestion.Id)
        ? active.concat(recordGroup.get(activeQuestion.Id))
        : [];
    });

    setSObjectEdit(activeQuestion.forms__Type__c);
  }, [questionId]);

  return (
    <View className="row middle-xs">
      <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Box>
          <ViewStyle space border>
            <h1>
              {activeQuestion.forms__Type__c}:{" "}
              {activeQuestion.forms__Salesforce_Object__c}{" "}
            </h1>

            <ViewStyle>
              <p>{activeQuestion.forms__Title__c}</p>
            </ViewStyle>
          </ViewStyle>

          <ViewStyle space border>
            <h1>Salesforce Fields</h1>

            <SalesforceSelects
              records={activeRecordGroup}
              setActiveRecordGroup={setActiveRecordGroup}
              relatedId={activeQuestion.Id}
              formId={activeQuestion.forms__Form__c}
              sObject={activeQuestion.forms__Salesforce_Object__c}
            />
          </ViewStyle>
        </Box>
      </View>
    </View>
  );
};

const SalesforceSelects = ({
  records,
  setActiveRecordGroup,
  relatedId,
  formId,
  sObject,
}) => {
  return [
    <ControlSelects records={records} sObject={sObject} />,
    <ControlAddRow
      setActiveRecordGroup={setActiveRecordGroup}
      relatedId={relatedId}
      formId={formId}
    />,
  ];
};

const ControlSelects = ({ records, sObject }) => {
  return records.map((row, i) => {
    return (
      <ControlSelect
        order={i}
        row={row}
        sObject={sObject}
      />
    );
  });
};

const ControlSelect = ({ order, row, sObject }) => {
  const { setActiveRecordGroup, additionalFields, requiredFields } =
    useContext(EditContext);

  const { setQuestionState, setActiveQuestion } = useContext(DesignContext);

  const edit = (state) => {
    setQuestionState(state);
    setActiveQuestion(row);
  };

  const setSelection = (value, order) => {
    setActiveRecordGroup((records) => {
      let newFields = records.map((record, i) => {
        let val = additionalFields.hasOwnProperty(value)
          ? additionalFields[value]
          : "";

        if (val == "") return record;

        let fieldType = Object.keys(val)[0];

        let lookupObject = null;

        if (val.hasOwnProperty("REFERENCE")) {
          lookupObject = val["REFERENCE"];
        }
        console.log("sObject", value);
        if (i == order) {
          return {
            ...record,
            forms__Title__c: value,
            forms__Salesforce_Field__c: value,
            forms__Type__c: fieldType,
            forms__Lookup__c: lookupObject,
            forms__Salesforce_Object__c: sObject,
          };
        } else if (record.forms__Title__c == null) {
          return {
            ...record,
            forms__Title__c: value,
            forms__Salesforce_Object__c: sObject,
          };
        }

        return { ...record, forms__Salesforce_Object__c: sObject };
      });

      return newFields;
    });
  };

  const removeRow = (order) => {
    setActiveRecordGroup((activeRecordGroup) => {
      let newRows = activeRecordGroup.filter((rec, i) => {
        if (i != order) {
          return rec;
        }
      });

      return newRows;
    });
  };

  const closeStyle = {
    height: "40%",
    width: "40%",
  };

  return (
    <View className="row middle-xs">
      <View className="col-xs-1">
        <Box padding=".5em">
          <span id="center">{order + 1}</span>
        </Box>
      </View>
      <View className="col-xs-5">
        <Box padding=".5em">
          <Select
            disabled={row.forms__Required__c}
            key={row.forms__Order__c}
            value={row.forms__Salesforce_Field__c}
            options={Object.keys(requiredFields).concat(
              Object.keys(additionalFields)
            )}
            onChange={(data) =>
              setSelection(data[0].value, row.forms__Order__c)
            }
          />
        </Box>
      </View>
      <View className="col-xs-2">
        <Box padding=".5em">
          {
            <Button
              disabled={row.forms__Required__c}
              onClick={() => edit("EDIT")}
            >
              Edit
            </Button>
          }
        </Box>
      </View>
      <View className="col-xs-2">
        <Box padding=".5em">
          {row.Id != null && !row.forms__Required__c ? (
            <Button onClick={() => edit("LOGIC")}>
              Logic
            </Button>
          ) : (
            <Button disabled>Logic</Button>
          )}
        </Box>
      </View>
      <View className="col-xs-2">
        <Box padding=".5em">
          {!row.forms__Required__c ? (
            <div
              style={closeStyle}
              disabled={true}
              onClick={() => removeRow(order)}
            >
              <CloseIcon />
            </div>
          ) : null}
        </Box>
      </View>
    </View>
  );
};

const ControlAddRow = ({ setActiveRecordGroup, relatedId, formId }) => {
  const add = () => {
    setActiveRecordGroup((records) => {
      return records.concat([
        {
          forms__Form__c: formId,
          forms__Logic__c: "AND",
          forms__Type__c: "",
          forms__Title__c: "",
          forms__Salesforce_Field__c: "",
          forms__Record_Group__c: relatedId,
          forms__Order__c: records.length,
          forms__Page__c: 0,
        },
      ]);
    });
  };

  return (
    <View className="row center-xs middle-xs">
      <View className="col-xs-1">
        <Button onClick={() => add()}>
          &#43;
        </Button>
      </View>
      <View className="col-xs-11"></View>
    </View>
  );
};
