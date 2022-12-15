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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDnd } from "../../../../hooks/BuilderDnd";
import { useBuilderDndContext } from "../../../../context/BuilderDndContext";

const Draggable = (props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
    data: { 
      ...props.data,
      supports: ['type1'],
    },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

export const NewQuestion = () => {

  const { activeAvailableField, availableFields } = useBuilderDndContext();

  return (
    <View full className="row" key={"Body"}>
      <View className="col-xs-12">
        <Box padding="0">
          <ViewStyle space>
            <h1>Form Builder test</h1>

            <p>Drag and Drop any Question type to your Form on the right.</p>

            <div>
              {
                availableFields.map((field) => {
                  const { id, active, name, type } = field;
                  return <Draggable key={id} id={id}>

                    <button key={id} className="slds-button slds-button_outline-brand">{name}</button>

                  </Draggable>
                })
              }
            </div>

            {/* <DragOverlay>
              {
                activeAvailableField ?

                  <button key={activeAvailableField.id} className="slds-button slds-button_outline-brand">{activeAvailableField.name}</button> :
                  null
              }
            </DragOverlay> */}

          </ViewStyle>

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
`;


// const SelectableNew = styled.div`
//     user-select: 'none';
//     font-size: 1em;
//     padding: 1em 0 1em 0; 
//     cursor: pointer;
//     margin: .5em;
//     font-weight: 500;
//     background: ${Main.color.white};
// 		border: 1px solid ${Main.color.border};
// 		border-radius: 4px; 
//     color: ${Main.color.text}

//     span {
//         display: inline-block;
// 				vertical-align: middle;
// 				padding: 0 0 0 1em;
//         font-weight: 500;
//         color: ${Main.color.text}
//     }

//     ${(props) =>
//     props.isDragging == true &&
//     css`
//         background: ${Main.color.white};
//       `}
		
// 		${(props) =>
//     props.disabled == true &&
//     css`
//         border: 1px solid ${Main.color.disabled};
//         background: ${Main.color.silver};
//       `}

//     :active {
//         box-shadow: none;
//     }

//     i {
// 				margin-top: -2px; 
//         color: ${Main.color.text}
//         vertical-align: middle;
//     }

// `;
