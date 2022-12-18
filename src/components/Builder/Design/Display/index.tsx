import { useDroppable, useDraggable, DndContext, DragEndEvent, useSensor, useSensors, MouseSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, useSortable, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import styled from "styled-components";
import { useBuilderContext } from "../../../../context/BuilderContext";
import { useBuilderDnd } from "../../../../hooks/BuilderDnd";
import { Question__c } from "../../../../utils/types/sObjects";
import { Single } from "./single";

const Draggable = (props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
    data: props.data
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

const Item = ({ item, dragOverlay }: { item: Question__c, dragOverlay: boolean }) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };
  console.log({ item })
  return (
    <div style={style} className="item">
      Item {item.cforms__Title__c}
    </div>
  );
};

const SortableItem = ({ id, item }: { id: string, item: Question__c }) => {
  console.log({ sortableItemId: id })
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  console.log({ isDragging, id })
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
      <Item item={item} dragOverlay={false} />
    </li>
  );

};


const Droppable = ({ pageId, items }: { pageId: string, items: Question__c[] }) => {
  console.log({ pageId })
  const { setNodeRef } = useDroppable({ id: pageId });

  console.log({ items })
  return <SortableContext key={pageId} id={pageId} items={items} strategy={rectSortingStrategy}>
    <ul className="droppable" ref={setNodeRef}>
      {items.map((item, index) => (
        <SortableItem key={index} id={item.Id} item={item} />
      ))}
    </ul>
  </SortableContext>


}

export const Display = () => {

  const { pages, questions } = useBuilderContext();
  console.log({ pages, questions })

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = ({ active, over }) => {
    console.log({ active, over })

  }
  const handleDragEnd = (event: DragEndEvent) => {
    console.log({ event })
  }

  return (
    <FormDesign key={"Display"}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>

        {
          pages != null ? pages.map((pageId, index) =>
            <Section key={index}>
              <Droppable
                pageId={pageId}
                items={questions[pageId]}
              />
            </Section>)
            : null
        }
      </DndContext>
    </FormDesign>
  );
};

const FormDesign = styled.div`
    height: 92.5vh;
    overflow-y: auto;
    background: #b0c4df;
    `;

const Section = styled.section`
    padding: 20px; 
    margin: 20px; 
    border: 1px solid #000; 
    `