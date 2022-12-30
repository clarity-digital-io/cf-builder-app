import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import styled from "styled-components";
import { Question__c } from "../../../../../utils/types/sObjects";

const Droppable = ({ id, items }: { id: string, items: Question__c[] }) => {
  const { setNodeRef } = useDroppable({ id, data: { type: 'fields' } });
  return (
    <SortableContext id={id} items={items.map(({ id }) => id)} strategy={rectSortingStrategy}>
      <OuterPaddingBox className="slds-col slds-large-size_1-of-2">
        <DroppableUl ref={setNodeRef} >
          <InnerDroppableUl>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} data={item} />
            ))}

          </InnerDroppableUl>
          <div className="slds-p-around_medium">
            <span className="slds-align_absolute-center slds-text-body_small">Add field(s) here</span>
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



