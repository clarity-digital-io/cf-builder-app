import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";


import {
  DragDropUpdateContext
} from "../../../Context";
import { Props } from "../../../../utils/types";

export const DragDropUpdateProvider: React.FC<Props> = ({ children }) => {
  const [eventsMap] = useState(() => new Map());

  const addEvent = (event, callback) => {
    eventsMap.set(event, callback);
  };

  const removeEvent = (event) => {
    eventsMap.delete(event);
  };

  const emitEvent = (event, ...rest) => {
    if (!eventsMap.has(event)) return;
    eventsMap.get(event)(...rest);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    emitEvent(result.destination.droppableId, result);
  };

  return (
    <DragDropUpdateContext.Provider value={{ addEvent, removeEvent }}>
      <DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>
    </DragDropUpdateContext.Provider>
  );
};