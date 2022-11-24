import React, { useContext } from "react";

import View from "../../Elements/View";
import Box from "../../Elements/Box";

import { QuestionState } from "./Question/state";
import { ConnectState } from "./Connect";
import { MappingState } from "./Connect/mapping";
import { SettingsState } from "./Settings";
import { EditPageState } from "./EditPage";
import { Display } from "./Display";
import { BuilderContext } from "../../Context";

const Design = () => {
  const { navState } = useContext(BuilderContext);

  const getNavState = (nav) => {
    switch (nav) {
      case "QUESTIONS":
        return <QuestionState />;
      case "CONNECT":
      case "MAPPING":
        return <ConnectState />;
      case "SETTINGS":
        return <SettingsState />;
      case "EDIT_PAGE":
        return <EditPageState />;
    }
  };

  const getDisplayNavState = (nav) => {
    switch (nav) {
      case "MAPPING":
        return <MappingState key={"MappingState"} />;
      default:
        return <Display key={"DisplayState"} />;
    }
  };

  return (
    <View full main>
      <View key={"QuestionState"} scroll edit>
        <Box padding="0">{getNavState(navState)}</Box>
      </View>

      <View key={"QuestionDisplay"} form>
        <Box padding="0">{getDisplayNavState(navState)}</Box>
      </View>
    </View>
  );
};

export default Design;
