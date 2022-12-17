import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import styled from "styled-components";
import { Question__c } from "../../../../../../utils/types/sObjects";

const Droppable = ({ id, items }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <DroppableUl ref={setNodeRef}>
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </DroppableUl>
    </SortableContext>
  );
};

const DroppableUl = styled.ul`
  min-width: 110px;
  padding: 20px 10px;
  border: 1px solid black;
  border-radius: 5px;
  list-style-type: none;
`

export default Droppable;



