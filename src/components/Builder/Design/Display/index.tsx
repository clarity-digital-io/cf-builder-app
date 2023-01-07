import React from "react";

import Droppable from "./components/Droppable";
import styled from "styled-components";
import { useBuilderContext } from "../../../../context/BuilderContext";
import { Button } from "@salesforce/design-system-react";

export const Display = ({ activeId }) => {

  const { dndQuestions, setDndQuestion } = useBuilderContext();

  const handleAddPage = () => {
    const len = Object.keys(dndQuestions).length;
    setDndQuestion({
      ...dndQuestions,
      [len]: []
    });
  }
  return (
    <DisplayStyle>
      <Container className="slds-grid slds-wrap slds-p-around_small">
        {Object.keys(dndQuestions).map((group: any) => (
          <Droppable
            id={group}
            items={dndQuestions[group]}
            activeId={activeId}
            key={group}
          />
        ))}
        {/* add page button below */}
        {/* <Droppable
          id={Object.keys(dndQuestions).length}
          items={[]}
          activeId={activeId}
          key={Object.keys(dndQuestions).length}
        /> */}
        <div className="slds-col">
          <div className="slds-grid slds-grid_align-end">
            <div className="slds-col slds-p-top_small">
              <Button
                onClick={() => handleAddPage()}
                variant="brand"
                iconCategory="utility"
                iconName="new"
                iconPosition="left"
                label="Add Page"
              />
            </div>
          </div>
        </div>
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