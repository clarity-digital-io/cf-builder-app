import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";
import { Question__c } from "../../../../../../utils/types/sObjects";

const SortableItem = ({ id }: { id: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

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
      <Item id={id} dragOverlay={false} />
    </li>
  );
};

export default SortableItem;
