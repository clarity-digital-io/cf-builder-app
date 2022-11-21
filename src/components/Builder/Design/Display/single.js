import React, { useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { useDrag } from "./useDrag";

import { GenerateQuestion, Card, DropView } from "./elements";
import { QuestionPreview } from "./questionPreview";

import { BuilderContext } from "../../../Context";

export const Single = ({ style, form }) => {
  const { previewMode } = useContext(BuilderContext);

  const { questions } = useDrag();

  const background = {
    background: "#fff",
  };

  return previewMode.active ? (
    <div className="slds-m-around_x-large">
      <div style={background} className="slds-box">
        <div className="slds-p-around_x-large">
          {questions.map((item, index) => (
            <QuestionPreview question={item} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Droppable droppableId="question">
        {(provided, snapshot) => (
          <DropView
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
          >
            {questions.map((item, index) => (
              <Draggable
                isDragDisabled={
                  form.forms__Status__c == "Published" ? true : false
                }
                key={`question${item.Id}${index}`}
                draggableId={`question${item.Id}${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <GenerateQuestion
                    key={item.Id}
                    item={item}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </DropView>
        )}
      </Droppable>
    </div>
  );
};
