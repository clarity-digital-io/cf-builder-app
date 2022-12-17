import React, { useContext } from "react";
import View from "../../../../../Elements/View";
import Box from "../../../../../Elements/Box";
import ViewStyle from "../../../../../Elements/View/style";
import { DesignContext } from "../../../../../../context";
import { InputNumber } from "../../../../../Elements/Input";

export const Number = ({ type }) => {
  const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

  const updateMin = (v) => {
    let value = parseInt(v);

    if (activeQuestion.forms__Max_Range__c > value) {
      setActiveQuestion((question) => {
        return { ...question, forms__Min_Range__c: value };
      });
    }
  };

  const updateMax = (v) => {
    let value = parseInt(v);

    if (activeQuestion.forms__Min_Range__c < value) {
      setActiveQuestion((question) => {
        return { ...question, forms__Max_Range__c: value };
      });
    }
  };

  const updateStep = (v) => {
    let value = parseInt(v);

    if (activeQuestion.forms__Max_Range__c > value) {
      setActiveQuestion((question) => {
        return { ...question, forms__Step__c: value };
      });
    }
  };

  return (
    <ViewStyle>
      <h1>{type} Settings</h1>

      <p>
        Control minimum number, maximum number, and step size of the slider.
      </p>

      <ViewStyle>
        <View className="row">
          <View className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
            <Box padding="0">
              <h2>Min.</h2>

              <InputNumber
                min={0}
                max={activeQuestion.forms__Max_Range__c - 1}
                onChange={updateMin}
                value={activeQuestion.forms__Min_Range__c}
              />
            </Box>
          </View>
          <View className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
            <Box padding="0">
              <h2>Max</h2>

              <InputNumber
                min={activeQuestion.forms__Min_Range__c}
                onChange={updateMax}
                value={activeQuestion.forms__Max_Range__c}
              />
            </Box>
          </View>

          <View className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
            <Box padding="0">
              <h2>Step</h2>

              <InputNumber
                onChange={updateStep}
                value={activeQuestion.forms__Step__c}
              />
            </Box>
          </View>
        </View>
      </ViewStyle>
    </ViewStyle>
  );
};
