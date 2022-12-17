import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Droppable from "./components/Droppable";
import Item from "./components/Item";
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";

import styled from "styled-components";
import { useBuilderContext } from "../../../../../context/BuilderContext";

export const Test = () => {
  const [itemGroups, setItemGroups] = useState({
    group1: ["1", "2", "3"],
    group2: ["4", "5", "6"],
    group3: ["7", "8", "9"],
  });


  const { questions, handleQuestionsUpdate } = useBuilderContext();
  console.log({ questions })

  const [activeId, setActiveId] = useState(null);

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

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups) => {
        const activeIndex = active.data.current.sortable.index;
        console.log({ over });
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index;

        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  };
  // const handleDragOver = ({ active, over }) => {
  //   const overId = over?.id;

  //   if (!overId) {
  //     return;
  //   }
  //   console.log({ active })
  //   const activeContainer = active.data.current.sortable.containerId;
  //   const overContainer = over.data.current?.sortable.containerId || over.id;
  //   console.log({ activeContainer, overContainer })
  //   if (activeContainer !== overContainer) {
  //     const activeIndex = active.data.current.sortable.index;
  //     const overIndex = over.id in questions ? questions[overContainer].length + 1 : over.data.current.sortable.index;
  //     console.log('drag over', { over, activeIndex, overIndex })

  //     // const updatedQuestions = moveBetweenContainers(
  //     //   questions,
  //     //   activeContainer,
  //     //   activeIndex,
  //     //   overContainer,
  //     //   overIndex,
  //     //   active.id
  //     // )
  //     // console.log('updatedQuestions drag over', { updatedQuestions })
  //     // handleQuestionsUpdate(updatedQuestions)
  //     setItemGroups((itemGroups) => {
  //       const activeIndex = active.data.current.sortable.index;
  //       const overIndex =
  //         over.id in itemGroups
  //           ? itemGroups[overContainer].length + 1
  //           : over.data.current.sortable.index;

  //       return moveBetweenContainers(
  //         itemGroups,
  //         activeContainer,
  //         activeIndex,
  //         overContainer,
  //         overIndex,
  //         active.id
  //       );
  //     });
  //   }
  // };

  const handleDragEnd = ({ active, over }) => {
    console.log("handledragend0", { active, over });

    if (!over) {
      setActiveId(null);
      return;
    }
    console.log("handledragend", { active, over });

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : over.data.current.sortable.index;

      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            )
          };
        } else {
          console.log({ over });

          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
    }

    setActiveId(null);
  };

  // const handleDragEnd = ({ active, over }) => {
  //   console.log("handledragend0", { active, over });

  //   if (!over) {
  //     setActiveId(null);
  //     return;
  //   }
  //   console.log("handledragend", { active, over });
  //   if (active.id !== over.id) {
  //     const activeContainer = active.data.current.sortable.containerId;
  //     const overContainer = over.data.current?.sortable.containerId || over.id;
  //     const activeIndex = active.data.current.sortable.index;

  //     console.log('drag end', { activeContainer, overContainer, activeIndex })

  //     const overIndex = over.id in questions ? questions[overContainer].length + 1 : over.data.current.sortable.index;
  //     let updatedQuestions = {};
  //     if (activeContainer === overContainer) {
  //     //   console.log('overcontainer', { overContainer, questions: questions[overContainer] })
  //     //   updatedQuestions = {
  //     //     ...questions,
  //     //     [overContainer]: arrayMove(
  //     //       questions[overContainer],
  //     //       activeIndex,
  //     //       overIndex
  //     //     ),
  //     //   };
  //     // } else {
  //     //   console.log({ active })
  //     //   updatedQuestions = moveBetweenContainers(
  //     //     questions,
  //     //     activeContainer,
  //     //     activeIndex,
  //     //     overContainer,
  //     //     overIndex,
  //     //     active.id
  //     //   )
  //     // }
  //     // console.log('updatedQuestions', { updatedQuestions })
  //     // handleQuestionsUpdate(updatedQuestions)
  //     const overIndex =
  //       over.id in itemGroups
  //         ? itemGroups[overContainer].length + 1
  //         : over.data.current.sortable.index;

  //     setItemGroups((itemGroups) => {
  //       let newItems;
  //       if (activeContainer === overContainer) {
  //         newItems = {
  //           ...itemGroups,
  //           [overContainer]: arrayMove(
  //             itemGroups[overContainer],
  //             activeIndex,
  //             overIndex
  //           ),
  //         };
  //       } else {
  //         newItems = moveBetweenContainers(
  //           itemGroups,
  //           activeContainer,
  //           activeIndex,
  //           overContainer,
  //           overIndex,
  //           active.id
  //         );
  //       }

  //       return newItems;
  //     });
  //   }

  //   setActiveId(null);
  // };

  // moving between pages
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
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Container>
        {Object.keys(itemGroups).map((group) => (
          <Droppable
            id={group}
            items={itemGroups[group]}
            activeId={activeId}
            key={group}
          />
        ))}
      </Container>
      <DragOverlay>{activeId ? <Item id={activeId} dragOverlay /> : null}</DragOverlay>
    </DndContext>
  );
}

const Container = styled.div`
  display: flex;
  > * {
    margin: 5px; 
  }
`