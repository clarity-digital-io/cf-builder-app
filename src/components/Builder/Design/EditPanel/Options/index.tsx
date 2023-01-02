import { Popover as SalesforcePopover, Input, Button } from "@salesforce/design-system-react";
import React, { ReactElement, useState } from "react";
import { BuilderContextProvider, useBuilderContext } from "../../../../../context/BuilderContext";
import { QuestionOptionTypes } from "../../../../../utils/options";
import styled from "styled-components";
import { Question_Option__c } from "../../../../../utils/types/sObjects";
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";

export const OptionsEdit = () => {
  const { question, options, setNewOption, handleUpdateOptions } = useBuilderContext();
  console.log({ options })

  const handleNewOption = () => {
    if (!question) return;
    const order = options && options.length > 0 ? options.length : 0;
    const option: Question_Option__c = {
      id: `qo-${question.id}-${order}`,
      cforms__Question__c: question.id,
      cforms__Label__c: `qo-${question.id}-${order}`,
      cforms__Order__c: order
    }
    setNewOption(option)
  }

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = ({ active, over }) => {
    console.log({ active, over })

  }

  const handleDragEnd = ({ active, over }) => {
    console.log({ active, over })
    const activeIndex = active.data.current.sortable.index;
    const overIndex = over.data.current.sortable.index;
    const newOptions = arrayMove(
      options,
      activeIndex,
      overIndex
    )

    handleUpdateOptions(newOptions)
  }

  if (question != null && (Object).values(QuestionOptionTypes).includes(question.cforms__Type__c)) {
    return <section className="slds-box slds-ui-gen__vertical-layout slds-m-top_small">
      <div className="slds-grid slds-grid_vertical">

        <div className="slds-text-title slds-m-bottom_xx-small">
          Question Options
        </div>

        <DndContext
          sensors={sensors}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >

          {
            options && options.length > 0 &&
            <OptionsDroppable id={question.id} options={options} />
          }

        </DndContext>

        <div className="slds-m-top_x-small">
          <Button
            label="Add Option"
            onClick={(e) => handleNewOption()} // add new criteria here setCriteria([].concat(newcriteria))
          />
        </div>

      </div>
    </section>
  }

  return null;
}

const OptionsEditPopover = ({ option, children }: { option: Question_Option__c, children: ReactElement | ReactElement[] }) => {

  const [isOpen, setOpen] = useState(false);
  const [optionLabel, setOptionLabel] = useState('');
  const { options, handleUpdateOptions } = useBuilderContext();

  return <Popover
    position={'overflowBoundaryElement'}
    isOpen={isOpen}
    body={

      <div className="slds-p-top_medium slds-ui-gen__layout-item">
        <Input
          type="text"
          id="base-id"
          label="Option Label"
          onChange={(e) => setOptionLabel(e.target.value)}
        />
      </div>

    }
    footer={
      <div className="slds-text-align_right">
        <Button label="Cancel" onClick={() => setOpen(false)} />
        <Button variant='brand' label="Done" onClick={() => {
          setOpen(false)
          handleUpdateOptions(options?.map(_option => {
            if (option.id == _option.id) {
              return { ...option, cforms__Label__c: optionLabel }
            } else {
              return _option;
            }
          }))
        }} />
      </div>
    }
    id="popover-controlled-with-footer"
  >
    <PopoverInner onClick={() => setOpen(true)}>
      {children}
    </PopoverInner>
  </Popover>
}

const OptionsDroppable = ({ id, options }: { id: string, options: Question_Option__c[] }) => {

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

const SortableOptionItem = ({ id, option, index }: { id: string, option: Question_Option__c, index: number }) => {

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

  return <li style={style}
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    key={index}
    className="slds-m-top_xx-small"
  >
    <OptionsEditPopover option={option}>
      <Button
        iconCategory="utility"
        iconName="drag_and_drop"
        iconPosition="left"
        label={option.cforms__Label__c}
      />
    </OptionsEditPopover>
  </li>
}

const Popover = styled(SalesforcePopover)`
  z-index: 9999 !important;
  display: block  !important; 
`;

const PopoverInner = styled.div`
`