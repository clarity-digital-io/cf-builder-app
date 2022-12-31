import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";
import { Question__c } from "../../../../../utils/types/sObjects";

const SortableItem = ({ droppableId, id, index, data }: { droppableId: string | number, id: string, index: number, data: Question__c }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      question: data,
      type: 'questions'
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Item droppableId={droppableId} id={id} dragOverlay={false} index={index} data={data} />
    </li>
  );
};


export default SortableItem;
