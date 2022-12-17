import React, { useContext } from "react";

import View from "../../Elements/View";
import Box from "../../Elements/Box";

import { QuestionState } from "./FieldsPanel/Question/state";
// import { ConnectState } from "./Connect";
// import { MappingState } from "./Connect/mapping";
// import { SettingsState } from "./Settings";
import { EditPageState } from "./EditPanel/EditPage";
import { Display } from "./Display";
import { useBuilderContext } from "../../../context/BuilderContext";
import { NavStates } from "../../../reducers/BuilderProvider";
import { BuilderDndContextProvider } from "../../../context/BuilderDndContext";
import { Test } from "./Display/Test";
import {
  Modal
} from "@salesforce/design-system-react";
import { Fields } from "./FieldsPanel";
import { Edit } from "./EditPanel";
import { EditFormContextProvider } from "../../../context/EditContext";

const Design = () => {

  // const { navState } = useBuilderContext();

  // const getNavState = (nav: NavStates) => {
  //   console.log({ nav, q: NavStates.QUESTIONS })
  //   switch (nav) {
  //     case NavStates.CONNECT:
  //     case NavStates.MAPPING:
  //       return <ConnectState />;
  //     case NavStates.SETTINGS:
  //       return <SettingsState />;
  //     case NavStates.EDIT:
  //       return <EditPageState />;
  //   }
  // };

  // const getDisplayNavState = (nav: NavStates) => {
  //   switch (nav) {
  //     case NavStates.MAPPING:
  //       return <Modal isOpen={true}><MappingState key={"MappingState"} /></Modal>
  //     default:
  //       return <Test />

  //   }
  // };

  return (
    <View full main>

      <View scroll>
        <Fields />
      </View>

      <EditFormContextProvider>
        <View key={"QuestionDisplay"} form={true}>
          <Box padding="0"><Test /></Box>
        </View>

        <View scroll>
          <Edit />
        </View>
      </EditFormContextProvider>

    </View>
  );
};

export default Design;
