import React, { useState } from "react";

import View from "../../Elements/View";

import { useBuilderContext } from "../../../context/BuilderContext";
import { Display } from "./Display";
import {
  Modal
} from "@salesforce/design-system-react";
import { FieldItem, Fields } from "./FieldsPanel";
import { Edit } from "./EditPanel";

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
import { Question__c } from "../../../utils/types/sObjects";
import { QuestionTypes } from "../../../utils/types/fields";
import { FieldType } from "../../../utils/constants/fields";

const Design = () => {

  const { availableFields, dndQuestions, setDndQuestion, initQuestionEdit } = useBuilderContext();

  // field moving
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
    if (active.data.current.type == 'fields') {
      setFieldActive(active.data.current.field);
    } else {
      setActiveId(active.id)
      setActiveData(active.data.current.question)
    }
  };

  const handleDragCancel = () => {
    setActiveId(null)
    setActiveData(null)
    setFieldActive(null)
  };

  const handleDragOver = ({ active, over }) => {

    // handle when it's not over a droppable region
    const overId = over?.id;
    if (!overId) return;

    // handle 2 types fields (left panel) and questions (main display panel)
    if (active.data.current.type == 'fields') { }

    if (active.data.current.type == 'questions') { // update to enum
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

    if (
      active.data.current.type == 'questions' &&
      over.data.current.type == 'questions' &&
      active.id !== over.id
    ) {

      if (!active.data.current.sortable) return;

      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in dndQuestions
          ? dndQuestions[overContainer].length + 1
          : over.data.current.sortable.index;

      if (activeContainer === overContainer) {
        setDndQuestion({
          ...dndQuestions,
          [overContainer]: arrayMove(
            dndQuestions[overContainer],
            activeIndex,
            overIndex
          )
        });
      } else {
        setDndQuestion(moveBetweenContainers(
          dndQuestions,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        ));
      }

    }

    if (
      active.data.current.type == 'fields' &&
      over.data.current.type == 'questions'
    ) {

      const orderIndexAt = over.data.current.sortable ? over.data.current.sortable.index : 0;
      const overContainer = over.data.current?.sortable ? over.data.current.sortable.containerId : over.id;
      const overIndex =
        over.id in dndQuestions
          ? dndQuestions[overContainer].length + 1
          : over.data.current.sortable.index;

      const newQuestion = generateQuestionSObject(active.id, overContainer, orderIndexAt, active.data.current.field);
      const newItems = {
        ...dndQuestions,
        [overContainer]: insertAtIndex(dndQuestions[overContainer], overIndex, newQuestion),
      };

      const updatedAvailableFields = availableFields.map(afield => {
        const { quantity, id } = afield;
        return { ...afield, id: id + '-' + quantity };
      })

      setDndQuestion(newItems, updatedAvailableFields);

      initQuestionEdit(newQuestion)
    }

    if (active.data.current.type == 'fields') {
      setFieldActive(null);
    } else {
      setActiveId(null);
      setActiveData(null);
    }
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
        <Fields />
        <Display activeId={activeId} />
        <Edit />
        <DragOverlay>{activeId && activeData ? <Item id={activeId} data={activeData} dragOverlay={true} /> : null}</DragOverlay>
        <DragOverlay>{fieldActive ? <FieldItem field={fieldActive} dragOverlay={true} /> : null}</DragOverlay>

      </DndContext>
    </View>
  );
};

const generateQuestionSObject = (id: string, page: number, order: number, field: FieldType): Question__c => {

  return {
    id: id + 'new',
    cforms__Order__c: order,
    cforms__Page__c: page,
    cforms__Title__c: field.name,
    cforms__Type__c: field.type
  }
}

const moveBetweenContainers = (
  items: Record<number, Array<Question__c>>,
  activeContainer: number,
  activeIndex: number,
  overContainer: number,
  overIndex: number,
  item: Question__c
) => {
  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
  };
};

export default Design;
