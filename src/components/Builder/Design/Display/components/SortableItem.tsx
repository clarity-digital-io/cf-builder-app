import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";
import { Question__c } from "../../../../../utils/types/sObjects";
import styled from "styled-components";

const SortableItem = ({ id, data }: { id: string, data: Question__c }) => {
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
      <Item id={id} dragOverlay={false} data={data} />
    </li>
  );
};


export default SortableItem;
