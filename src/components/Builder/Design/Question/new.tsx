import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
// import { Droppable, Draggable } from "react-beautiful-dnd";
import Main from "../../../Elements/Theme";
import View from "../../../Elements/View";
import ViewStyle from "../../../Elements/View/style";

import Box from "../../../Elements/Box";

import { sortedTypes } from "../../../../utils/constants/fields";

import { getType } from "./icontypes";
import { DesignContext } from "../../../../context";
import { useBuilderContext } from "../../../../context/BuilderContext";

import { DndContext, useDraggable, useDroppable, DragOverlay } from '@dnd-kit/core';
import { DndContextProvider } from "../../../../context/DndContext";

const Draggable = (props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <li ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </li>
  );
}

const Item = ({ value }) => {
  return <div>
    {value}
  </div>
}

export const NewQuestion = () => {
  // const { update } = useContext(DesignContext);

  const { form } = useBuilderContext();
  const [items] = useState(['1', '2', '3', '4', '5']);
  const [activeId, setActiveId] = useState(null);

  return (
    <View full className="row" key={"Body"}>
      <View className="col-xs-12">
        <Box padding="0">
          <ViewStyle space>
            <h1>Form Builder test</h1>

            <p>Drag and Drop any Question type to your Form on the right.</p>
          </ViewStyle>

          <DndContextProvider>
            test
          </DndContextProvider>

          {/* <View space>
            <Droppable isDropDisabled={true} droppableId="new">
              {(provided, snapshot) => (
                <View
                  className="row"
                  key={"DroppableView"}
                  ref={provided.innerRef}
                >
                  {sortedTypes.map((type, index) => {
                    return (
                      <View className="col-xs-6">
                        <Draggable
                          isDragDisabled={
                            form.forms__Status__c == "Published" ? true : false
                          }
                          key={type.id}
                          draggableId={`item-${type.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <SelectableNew
                              key={type.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              disabled={
                                form.forms__Status__c == "Published" || update
                                  ? true
                                  : false
                              }
                              isDragging={snapshot.isDragging}
                            >
                              {getType(type.type)}
                              <span>{type.name}</span>
                            </SelectableNew>
                          )}
                        </Draggable>
                      </View>
                    );
                  })}
                  {provided.placeholder}
                </View>
              )}
            </Droppable>
          </View> */}
        </Box>
      </View>
    </View>
  );
};

const SelectableNew = styled.div`
    user-select: 'none';
    font-size: 1em;
    padding: 1em 0 1em 0; 
    cursor: pointer;
    margin: .5em;
    font-weight: 500;
    background: ${Main.color.white};
		border: 1px solid ${Main.color.border};
		border-radius: 4px; 
    color: ${Main.color.text}

    span {
        display: inline-block;
				vertical-align: middle;
				padding: 0 0 0 1em;
        font-weight: 500;
        color: ${Main.color.text}
    }

    ${(props) =>
    props.isDragging == true &&
    css`
        background: ${Main.color.white};
      `}
		
		${(props) =>
    props.disabled == true &&
    css`
        border: 1px solid ${Main.color.disabled};
        background: ${Main.color.silver};
      `}

    :active {
        box-shadow: none;
    }

    i {
				margin-top: -2px; 
        color: ${Main.color.text}
        vertical-align: middle;
    }

`;
