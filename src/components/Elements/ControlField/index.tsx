import React, { useState, useEffect, useContext } from "react";
import { call } from "../../RemoteActions";

import View from "../View";
import Box from "../Box";

import CloseIcon from "../Icons/close";
import { Button } from "../Button";
import ViewStyle from "../View/style";
import { Select } from "../Select";

import {
  RadioGroup as SalesforceRadioGroup,
  Radio as SalesforceRadio,
  Input as SalesforceInput,
} from "@salesforce/design-system-react";
import { BuilderContext, DesignContext } from "../../Context";

export const ControlGroup = ({
  type,
  relatedId,
  value,
  rows,
  setRows,
  setCondition,
  questions,
  hasFilter = false,
}) => {
  const { setError } = useContext(BuilderContext);

  const { questionOptions } = useContext(DesignContext);

  return [
    <ControlHeader key={"Header"} />,
    <ControlRows
      questionOptions={questionOptions}
      setRows={setRows}
      rows={rows}
      questions={questions}
      hasFilter={hasFilter}
      setError={setError}
    />,
    <ControlAddRow
      type={type}
      setRows={setRows}
      relatedId={relatedId}
    />,
    <ControlCondition
      value={value}
      setCondition={setCondition}
    />,
  ];
};

const ControlCondition = ({ value, setCondition }) => {
  return (
    <ViewStyle space>
      <View className="row middle-xs">
        <View className="col-xs-12">
          <SalesforceRadioGroup
            onChange={(event) => setCondition(event)}
            name={value}
          >
            <SalesforceRadio
              key={"AND"}
              id={"AND"}
              labels={{ label: "All of the Conditions are met (AND)" }}
              value={"AND"}
              checked={value == "AND"}
              variant="base"
            />
            <SalesforceRadio
              key={"OR"}
              id={"OR"}
              labels={{ label: "All of the Conditions are met (OR)" }}
              value={"OR"}
              checked={value == "OR"}
              variant="base"
            />
          </SalesforceRadioGroup>
        </View>
      </View>
    </ViewStyle>
  );
};

const ControlRows = ({
  questionOptions,
  rows,
  setRows,
  questions,
  hasFilter,
  setError,
}) => {
  return rows.map((row, i) => {
    return (
      <ControlRow
        questionOptions={questionOptions}
        key={row.Id}
        order={i}
        row={row}
        setRows={setRows}
        questions={questions}
        hasFilter={hasFilter}
        setError={setError}
      />
    );
  });
};

const getOptions = (row, options) => {
  let type = row.forms__Type__c;
  if (type == "Boolean") {
    return ["True"];
  }

  if (type == "Picklist" && row.forms__Field_Type__c == "Date") {
    return [
      "TODAY",
      "YESTERDAY",
      "LAST_WEEK",
      "LAST_MONTH",
      "NEXT_WEEK",
      "NEXT_MONTH",
    ];
  }

  if (type == "Picklist" && row.forms__Field_Type__c != "Date") {
    return options.has(row.forms__Field__c)
      ? options.get(row.forms__Field__c)
      : [];
  }

  return [];
};

const ControlRow = ({
  key,
  questionOptions,
  order,
  row,
  setRows,
  questions,
  hasFilter = false,
  setError,
}) => {
  const [operators, setOperators] = useState(
    getCorrectOperators(row.forms__Field_Type__c)
  );

  const [types, setTypes] = useState(getCorrectTypes(row));

  const options = getOptions(row, questionOptions);

  const setQuestionSelection = (selection, order) => {
    let value = selection[0].value;

    let question = questions.find((question) => question.Id == value);

    setOperators(getCorrectOperators(question.forms__Type__c));

    setRows((rows) => {
      return rows.map((row, i) => {
        if (i == order) {
          return {
            ...row,
            forms__Title__c: question.forms__Title__c,
            forms__Field__c: question.Id,
            forms__Field_Type__c: question.forms__Type__c,
            forms__Operator__c: "",
            forms__Type__c: "",
            forms__Value__c: "",
          };
        }
        return row;
      });
    });
  };

  const setOperatorSelection = (selection, order) => {
    let value = selection[0].value;
    setRows((rows) => {
      return rows.map((row, i) => {
        if (i == order) {
          return {
            ...row,
            forms__Operator__c: value,
            forms__Type__c: "",
            forms__Value__c: "",
          };
        }
        return row;
      });
    });

    setTypes(getCorrectTypes({ ...row, forms__Operator__c: value }));
  };

  const setTypeSelection = (selection, order) => {
    let value = selection[0].value;

    setRows((rows) => {
      return rows.map((row, i) => {
        if (i == order) {
          return { ...row, forms__Type__c: value, forms__Value__c: "" };
        }
        return row;
      });
    });

    //setValueField(value);
  };

  const setValueSelection = (selection, order) => {
    let value = selection[0].value;
    setRows((rows) => {
      return rows.map((row, i) => {
        if (i == order) {
          return { ...row, forms__Value__c: value };
        }
        return row;
      });
    });
  };

  const removeRow = (order) => {
    setRows((rows) => {
      let newRows = rows.filter((row, i) => {
        if (i != order) {
          return row;
        }
      });

      return newRows;
    });
  };

  const closeStyle = {
    height: "60%",
    width: "60%",
  };

  return (
    <View className="row middle-xs">
      <View className="col-xs-1">
        <Box padding=".5em">
          <span id="center">{order + 1}</span>
        </Box>
      </View>
      <View className="col-xs-3">
        <Box padding=".5em">
          {hasFilter ? (
            <ControlFieldQuestion
              order={order}
              record={row.forms__Field__c}
              values={questions}
              setSelection={setQuestionSelection}
            />
          ) : (
            <ControlFieldQuestion
              order={order}
              record={row}
              values={questions}
              setSelection={setQuestionSelection}
            />
          )}
        </Box>
      </View>
      <View className="col-xs-2">
        <Box padding=".5em">
          <ControlField
            order={order}
            record={row.forms__Operator__c}
            values={operators}
            setSelection={setOperatorSelection}
          />
        </Box>
      </View>
      <View className="col-xs-2">
        <Box padding=".5em">
          <ControlField
            order={order}
            record={row.forms__Type__c}
            values={types}
            setSelection={setTypeSelection}
          />
        </Box>
      </View>
      <View className="col-xs-3">
        <Box padding=".5em">
          <ControlValueField
            options={options}
            order={order}
            record={row}
            setSelection={setValueSelection}
          />
        </Box>
      </View>
      <View className="col-xs-1">
        <Box padding=".5em">
          <div style={closeStyle} onClick={() => removeRow(order)}>
            <CloseIcon />
          </div>
        </Box>
      </View>
    </View>
  );
};

const ControlAddRow = ({ type, setRows, relatedId }) => {
  const add = () => {
    setRows((rows) => {
      switch (type) {
        case "assign":
          return rows.concat([
            {
              forms__Operator__c: "",
              forms__Type__c: "",
              forms__Value__c: "",
              forms__Title__c: "",
              forms__Field__c: null,
              forms__Field_Type__c: "",
              forms__Clarity_Form_Assignment__c: relatedId,
            },
          ]);
          break;
        default:
          return rows.concat([
            {
              forms__Operator__c: "",
              forms__Type__c: "",
              forms__Value__c: "",
              forms__Title__c: "",
              forms__Field__c: null,
              forms__Field_Type__c: "",
              forms__Question__c: relatedId,
            },
          ]);
          break;
      }
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

const ControlFieldQuestion = ({ order, record, values, setSelection }) => {
  return (
    <Select
      order={order}
      key={record.Id}
      value={record.forms__Field__c}
      options={values}
      onChange={setSelection}
      valueField={"Id"}
      labelField={"forms__Title__c"}
    />
  );
};

const ControlField = ({
  labelField = null,
  valueField = null,
  order,
  record,
  values,
  setSelection,
}) => {
  return (
    <Select
      order={order}
      key={record}
      value={record}
      options={values}
      onChange={setSelection}
      valueField={valueField}
      labelField={labelField}
    />
  );
};

const ControlFieldInput = ({ type, order, record, setSelection }) => {
  return (
    <SalesforceInput
      type="text"
      id={order}
      value={record}
      onChange={setSelection}
    />
  );
};

const getOptionsHandler = (result, e, setOptions) => {
  setOptions(result.map((r) => r.forms__Label__c));
};

const ControlValueField = ({ options, order, record, setSelection }) => {
  switch (record.forms__Type__c) {
    case "String":
      return (
        <ControlFieldInput
          type={"text"}
          order={order}
          record={record.forms__Value__c}
          setSelection={setSelection}
        />
      );
    case "Number of New Records":
    case "Number":
      return (
        <ControlFieldInput
          type={"number"}
          order={order}
          record={record.forms__Value__c}
          setSelection={setSelection}
        />
      );
    case "Reference":
      return (
        <ControlFieldInput
          type={"text"}
          order={order}
          record={record.forms__Value__c}
          setSelection={setSelection}
        />
      );
    case "Picklist":
      return (
        <ControlField
          labelField={"forms__Label__c"}
          valueField={"Id"}
          order={order}
          record={record.forms__Value__c}
          values={options}
          setSelection={setSelection}
        />
      );
    case "Boolean":
      return (
        <ControlField
          order={order}
          record={record.forms__Value__c}
          values={options}
          setSelection={setSelection}
        />
      );
    case "Date":
      return (
        <ControlFieldInput
          type={"date"}
          order={order}
          record={record.forms__Value__c}
          setSelection={setSelection}
        />
      );
    default:
      return "";
  }
};

const ControlHeader = () => {
  return (
    <View className="row middle-xs">
      <View className="col-xs-1">
        <Box padding=".5em"></Box>
      </View>
      <View className="col-xs-3">
        <Box padding=".5em">Question</Box>
      </View>
      <View className="col-xs-2">
        <Box padding=".5em">Operator</Box>
      </View>
      <View className="col-xs-2">
        <Box padding=".5em">Type</Box>
      </View>
      <View className="col-xs-3">
        <Box padding=".5em">Value</Box>
      </View>
      <View className="col-xs-1">
        <Box padding=".5em"></Box>
      </View>
    </View>
  );
};

const getCorrectOperators = (fieldType) => {
  switch (fieldType) {
    case "MultipleChoice":
    case "Dropdown":
    case "Checkbox":
    case "Email":
      return ["Equals", "Not Equal", "Is Not Null"];
      break;
    case "Comment":
    case "Attachments":
    case "Lookup":
      return ["Is Not Null"];
      break;
    case "Slider":
    case "Number":
    case "Date":
    case "RecordGroup":
      return [
        "Equals",
        "Not Equal",
        "Is Not Null",
        "Is Greater than or equal to",
        "Is Less than or equal to",
      ];
      break;
    default:
      return [];
      break;
  }
};

const getCorrectTypes = (row) => {
  switch (row.forms__Operator__c) {
    case "Equals":
      return getTypeForEquals(row.forms__Field_Type__c);
      break;
    case "Not Equal":
      return getTypeForEquals(row.forms__Field_Type__c);
      break;
    case "Is Not Null":
      return ["Boolean"];
      break;
    case "Is Greater than or equal to":
      return getTypeForGLEqual(row.forms__Field_Type__c);
      break;
    case "Is Less than or equal to":
      return getTypeForGLEqual(row.forms__Field_Type__c);
      break;
    default:
      return [];
      break;
  }
};

const getTypeForGLEqual = (fieldType) => {
  switch (fieldType) {
    case "MultipleChoice":
    case "Dropdown":
    case "Checkbox":
    case "Email":
    case "Lookup":
    case "Slider":
    case "Number":
      return ["Number"];
      break;
    case "Date":
      return ["Date"];
      break;
    case "RecordGroup":
      return ["Number of New Records"];
      break;
  }
};

const getTypeForEquals = (fieldType) => {
  switch (fieldType) {
    case "MultipleChoice":
    case "Dropdown":
    case "Checkbox":
      return ["Picklist"];
      break;
    case "Email":
      return ["String"];
      break;
    case "Slider":
    case "Number":
      return ["Number"];
      break;
    case "RecordGroup":
      return ["Number of New Records"];
      break;
    case "Date":
      return ["Date"];
      break;
  }
};
