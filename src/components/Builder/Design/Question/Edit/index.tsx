import React, { useContext } from "react";
import { DesignContext, EditContext } from "../../../../../context";

import { Checkbox } from "@salesforce/design-system-react";
import { Input as SalesforceInput } from "@salesforce/design-system-react";

import { Attachments } from "./attachments";
import { Multiple } from "./multiple";
import { Comment } from "./comment";
import { Number } from "./number";
import { Lookup } from "./lookup";
import { RecordGroup } from "./recordgroup";
import { ConnectedObject } from "./connectedobject";
import { FreeText } from "./freetext";
import { Spinner } from "../../../../Elements/Spinner";

import Box from "../../../../Elements/Box";
import View from "../../../../Elements/View";
import ViewStyle from "../../../../Elements/View/style";

const getQuestionType = (type) => {
  switch (type) {
    case "Attachments":
      return <Attachments />;
    case "MultipleChoice":
    case "Dropdown":
    case "Checkbox":
      return <Multiple />;
    case "Comment":
      return <Comment />;
    case "Slider":
    case "Number":
      return <Number type={type} />;
    case "Lookup":
    case "REFERENCE":
      return <Lookup />;
    case "RecordGroup":
      return <RecordGroup />;
    case "ConnectedObject":
      return <ConnectedObject />;
    case "FreeText":
      return <FreeText />;
    default:
      return <div></div>;
  }
};

export const EditQuestion = () => {
  const { loading } = useContext(EditContext);

  const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

  const updateRequiredStatus = (e) => {
    let checked = e.target.checked;

    setActiveQuestion((question) => {
      return { ...question, forms__Required__c: checked };
    });
  };

  const updateActiveQuestion = (e) => {
    let value = e.target.value;

    setActiveQuestion((question) => {
      return { ...question, forms__Title__c: value };
    });
  };
  return (
    <View className="row middle-xs">
      <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Box padding="0">
          <ViewStyle space border>
            <h1>Settings</h1>
            {showRequiredInput(activeQuestion.forms__Type__c) ? (
              <Checkbox
                labels={{
                  label: "Required Field",
                }}
                id="checkbox-toggle-example"
                variant="toggle"
                defaultChecked={activeQuestion.forms__Required__c}
                onChange={(e, { checked }) => updateRequiredStatus(e)}
              />
            ) : null}
          </ViewStyle>

          <ViewStyle space border>
            <SalesforceInput
              aria-describedby={activeQuestion.Id}
              value={
                activeQuestion.forms__Title__c ||
                activeQuestion.forms__Salesforce_Field__c
              }
              id={activeQuestion.Id}
              label={"Question Label"}
              onChange={(e) => updateActiveQuestion(e)}
            />
          </ViewStyle>

          <ViewStyle space scroll>
            {hasExtraEditSettings(activeQuestion.forms__Type__c) ? (
              loading ? (
                <Spinner />
              ) : (
                getQuestionType(activeQuestion.forms__Type__c)
              )
            ) : null}
          </ViewStyle>
        </Box>
      </View>
    </View>
  );
};

const hasExtraEditSettings = (type) => {
  switch (type) {
    case "Email":
      return false;
      break;
    default:
      return true;
      break;
  }
};

const showRequiredInput = (type) => {
  switch (type) {
    case "ConnectedObject":
    case "RecordGroup":
    case "FreeText":
      return false;
      break;
    default:
      return true;
      break;
  }
};
