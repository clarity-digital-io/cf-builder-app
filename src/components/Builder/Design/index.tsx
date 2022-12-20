import React, { useState } from "react";

import View from "../../Elements/View";

import { useBuilderContext } from "../../../context/BuilderContext";
import { Display } from "./Display";
import {
  Modal
} from "@salesforce/design-system-react";
import { FieldItem, Fields } from "./FieldsPanel";
import { Edit } from "./EditPanel";
import { EditFormContextProvider } from "../../../context/EditContext";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Item from "./Display/components/Item";
import { insertAtIndex, removeAtIndex } from "./Display/utils/array";

const Design = () => {
  const { dndQuestions, setDndQuestion } = useBuilderContext();

  const [activeId, setActiveId] = useState(null);
  const [activeData, setActiveData] = useState(null);

  const [fieldActive, setFieldActive] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => {
    console.log({ active })
    if (active.data.current.type == 'fields') {
      setFieldActive(active.data.current.field);
    } else {
      setActiveId(active.id)
      setActiveData(active.data.current.question)
    }
  };

  const handleDragCancel = () => {
    setActiveId(null)
  };

  const handleDragOver = ({ active, over }) => {
    console.log({ active, over })
    const overId = over?.id;

    if (!overId) {
      return;
    }

    if (active.data.current.type == 'fields') {
      // need differetn process here 
      // activecontainer will be undefined since fields-(id) are not sortable yet
      // so need to drop them in state of questions
      // activeContainer is 


    } else {

      if (!active.data.current.sortable) return;

      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;

      if (activeContainer !== overContainer) {
        const activeIndex = active.data.current.sortable.index;
        console.log({ over });
        const overIndex =
          over.id in dndQuestions
            ? dndQuestions[overContainer].length + 1
            : over.data.current.sortable.index;

        setDndQuestion(
          moveBetweenContainers(
            dndQuestions,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          )
        )
      }
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      if (active.data.current.type == 'fields') {
        setFieldActive(null);
      } else {
        setActiveId(null);
        setActiveData(null);
      }
      return;
    }
    console.log("handledragend", { active, over });

    if (active.id !== over.id) {
      if (!active.data.current.sortable) return;

      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in dndQuestions
          ? dndQuestions[overContainer].length + 1
          : over.data.current.sortable.index;

      let newItems;
      if (activeContainer === overContainer) {
        newItems = {
          ...dndQuestions,
          [overContainer]: arrayMove(
            dndQuestions[overContainer],
            activeIndex,
            overIndex
          )
        };
      } else {
        console.log({ over });

        newItems = moveBetweenContainers(
          dndQuestions,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      }
      setDndQuestion(newItems);
    }

    if (active.data.current.type == 'fields') {
      setFieldActive(null);
    } else {
      setActiveId(null);
      setActiveData(null);
    }
  };

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };


  return (
    <View full main>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Fields fieldActive={fieldActive} />
        <EditFormContextProvider>
          <Display activeId={activeId} />
          <Edit />
        </EditFormContextProvider>
        <DragOverlay>{activeId && activeData ? <Item id={activeId} data={activeData} dragOverlay /> : null}</DragOverlay>
        <DragOverlay>{fieldActive ? <FieldItem field={fieldActive} dragOverlay /> : null}</DragOverlay>

      </DndContext>
    </View>
  );
};

export default Design;
