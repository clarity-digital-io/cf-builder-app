import React from "react";
import styled, { css, ThemeProvider } from "styled-components";

import View from "../../../Elements/View";
import Main from "../../../Elements/Theme";

import { Question } from "./question";

export const GenerateQuestion = ({ key, item, provided, snapshot }) => {
  return (
    <div
      key={key}
      isDragging={snapshot.isDragging}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Question question={item} />
    </div>
  );
};

export const DropView = styled(View)`
  padding: 2em !important;
  padding-bottom: 4em;
  min-height: 35vh;
`;
