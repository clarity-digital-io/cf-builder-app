import React, { useContext } from "react";

import View from "../../Elements/View";
import Box from "../../Elements/Box";

import { QuestionState } from "./Question/state";
import { ConnectState } from "./Connect";
import { MappingState } from "./Connect/mapping";
import { SettingsState } from "./Settings";
import { EditPageState } from "./EditPage";
import { Display } from "./Display";
import { useBuilderContext } from "../../../context/BuilderContext";
import { NavStates } from "../../../reducers/BuilderProvider";
import { BuilderDndContextProvider } from "../../../context/BuilderDndContext";

const Design = () => {

  const { navState } = useBuilderContext();

  const getNavState = (nav: NavStates) => {
    console.log({ nav, q: NavStates.QUESTIONS })
    switch (nav) {
      case NavStates.QUESTIONS:
        return <QuestionState />;
      case NavStates.CONNECT:
      case NavStates.MAPPING:
        return <ConnectState />;
      case NavStates.SETTINGS:
        return <SettingsState />;
      case NavStates.EDIT:
        return <EditPageState />;
    }
  };

  const getDisplayNavState = (nav: NavStates) => {
    switch (nav) {
      case NavStates.MAPPING:
        return <MappingState key={"MappingState"} />;
      default:
        return <Display key={"DisplayState"} />;
    }
  };

  return (
    <BuilderDndContextProvider>
      <View full main>
        <View key={"QuestionState"} scroll edit>
          <Box padding="0">{getNavState(navState)}</Box>
        </View>

        <View key={"QuestionDisplay"} form>
          <Box padding="0">{getDisplayNavState(navState)}</Box>
        </View>
      </View>
    </BuilderDndContextProvider>
  );
};

export default Design;
