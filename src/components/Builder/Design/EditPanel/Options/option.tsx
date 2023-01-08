import React from "react";
import { useBuilderContext } from "../../../../../context/BuilderContext";
import { Question_Option__c } from "../../../../../utils/types/sObjects";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { OptionItem, OptionsEditPopover } from ".";

export const OptionsDroppable = ({ id, options }: { id: string, options: Question_Option__c[] }) => {

  const { setNodeRef } = useDroppable({ id, data: { type: 'options' } });

  return <SortableContext id={id} items={options.map(({ id }) => id)} strategy={rectSortingStrategy}>
    <div ref={setNodeRef} >
      <ul>
        {
          options.map((option, index) => {
            return <SortableOptionItem id={option.id} option={option} key={index} index={index} />
          })
        }
      </ul>
    </div>
  </SortableContext>

}

export const SortableOptionItem = ({ id, option, index }: { id: string, option: Question_Option__c, index: number }) => {

  const { options, handleRemoveOptions } = useBuilderContext();

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useSortable({
    id
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };

  const handleRemove = () => {
    if (!options) return;
    handleRemoveOptions(index)
  }

  return <li style={style}
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    key={index}
    className="slds-m-top_xx-small"
  >
    <div className="slds-grid">
      <div className="slds-col">
        <OptionsEditPopover option={option}>
          <OptionItem option={option} dragOverlay={false} handleRemove={handleRemove} />
        </OptionsEditPopover>
      </div>

    </div>
  </li>
}