import React, { useEffect, useContext, useState } from "react";
import ViewStyle from "../../../../Elements/View/style";

import { Button } from "../../../../Elements/Button";
import { EditContext, BuilderContext } from "../../../../Context";

export const ConnectedObject = () => {
  const { form, setNavState } = useContext(BuilderContext);

  const {
    activeQuestionConnectedFields,
    setActiveQuestionConnectedFields,
    setSObjectEdit,
    requiredFields,
    additionalFields,
  } = useContext(EditContext);

  useEffect(() => {
    if (form.forms__Connected_Object__c) {
      setSObjectEdit(form.forms__Connected_Object__c);
    }
  }, []);

  const update = (e) => {
    let target = e.target.value;
    let value = e.target.checked;
  };

  return [
    <ViewStyle key={"description"}>
      <h1>
        Connected Object:{" "}
        {form.forms__Connected_Object__c ? (
          form.forms__Connected_Object__c
        ) : (
          <Button small add onClick={() => setNavState("SETTINGS")}>
            Create a Connected Section
          </Button>
        )}
      </h1>

      <p>
        Any fields updated in this{" "}
        {form.forms__Connected_Object__c
          ? form.forms__Connected_Object__c
          : "Connected Object"}{" "}
        section will reflect in the{" "}
        {form.forms__Connected_Object__c
          ? form.forms__Connected_Object__c
          : "Connected Object"}{" "}
        Record.
      </p>

      <p>Would you like to provide to an existing record?</p>
    </ViewStyle>,
    <ViewStyle key={"fields"}>
      <h1>Additional Fields</h1>

      {/* <Select options={sObjects} value={form.Connected_Object__c} onChange={update} /> */}
    </ViewStyle>,
  ];
};
