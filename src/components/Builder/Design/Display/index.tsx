import { useDroppable, useDraggable } from "@dnd-kit/core";
import React from "react";
import styled from "styled-components";
import { useBuilderDndContext } from "../../../../context/BuilderDndContext";
import { useBuilderDnd } from "../../../../hooks/BuilderDnd";
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

export const Display = () => {

  const { formFields } = useBuilderDndContext();
  console.log({ formFields })
  const { setNodeRef: setFirstDroppableRef } = useDroppable({
    id: 'droppable-1'
  });

  return (
    <FormDesign key={"Display"}>
      {/* <Single /> */}

      <section>
        <div ref={setFirstDroppableRef}>
          {
            formFields.map((field) => {
              const { id, active, name, type } = field;

              return <Draggable key={id} id={id} data={field}>
                {name}
              </Draggable>
            })
          }
          <div>Drop Fields here</div>
        </div>
      </section>
    </FormDesign>
  );
};

const FormDesign = styled.div`
  height: 92.5vh;
  overflow-y: auto;
  background: #b0c4df;
`;
