import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";

import Item from "./Item";
import { Question__c } from "../../../../../utils/types/sObjects";

const SortableItem = ({ droppableId, id, index, data }: { droppableId: string | number, id: string, index: number, data: Question__c }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useSortable({
    id,
    data: {
      question: data,
      type: 'questions'
    }
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <QuestionListItem
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Item droppableId={droppableId} id={id} dragOverlay={false} index={index} data={data} />
    </QuestionListItem>
  );
};

const QuestionListItem = styled.li`
  cursor: grab;
  opacity: 1 !important;
  user-select: none;
`

export default SortableItem;
