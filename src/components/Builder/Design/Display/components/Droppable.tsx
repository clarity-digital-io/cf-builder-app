import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import styled from "styled-components";
import { Question__c } from "../../../../../utils/types/sObjects";

const Droppable = ({ id, items }) => {
  const { setNodeRef } = useDroppable({ id });
  console.log({ items })
  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <OuterPaddingBox className="slds-col slds-size_1-of-2">
        <DroppableUl ref={setNodeRef} >
          <InnerDroppableUl>
            {items.map((item) => (
              <SortableItem key={item} id={item} />
            ))}
          </InnerDroppableUl>
          <div className="">
            Add field(s) here
          </div>
        </DroppableUl>
      </OuterPaddingBox>
    </SortableContext >
  );
};

const DroppableUl = styled.ul`
  border: 1px dashed #0176d3;
  list-style-type: none;
`
const InnerDroppableUl = styled.div`
  padding: 10px 0px;
  border: 3px solid #fff;
`
const OuterPaddingBox = styled.div`
  padding: 10px;
`

export default Droppable;



