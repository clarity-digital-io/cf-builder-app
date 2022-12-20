import React from "react";

import Droppable from "./components/Droppable";
import styled from "styled-components";
import { useBuilderContext } from "../../../../context/BuilderContext";

export const Display = ({ activeId }) => {

  const { dndQuestions } = useBuilderContext();

  return (
    <DisplayStyle>
      <Container className="slds-grid slds-wrap">
        {Object.keys(dndQuestions).map((group: any) => (
          <Droppable
            id={group}
            items={dndQuestions[group]}
            activeId={activeId}
            key={group}
          />
        ))}
        <Droppable
          id={Object.keys(dndQuestions).length}
          items={[]}
          activeId={activeId}
          key={Object.keys(dndQuestions).length}
        />
      </Container>
    </DisplayStyle>
  );
}

const DisplayStyle = styled.div`
  flex-grow: 1;
  margin-right: 0em;
  margin-left: 0em;
  padding: 0;
  background: #d8e6fe; 
`
const Container = styled.div`
  overflow: auto; 
`