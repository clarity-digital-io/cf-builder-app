import { Popover as SalesforcePopover, Input, Button } from "@salesforce/design-system-react";
import React, { ReactElement, useState } from "react";
import { useBuilderContext } from "../../../../../context/BuilderContext";
import { Question_Option__c } from "../../../../../utils/types/sObjects";
import { DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { QuestionTypes } from "../../../../../utils/types/fields";
import styled from "styled-components";
import { PictureOptionsDroppable } from "./picturechoice";
import { OptionsDroppable } from "./option";

export const OptionsEdit = () => {
  const { question, options, setNewOption, handleDrageUpdateOptions } = useBuilderContext();

  const isPictureChoice = question?.cforms__Type__c === QuestionTypes.PictureChoice;

  const handleNewOption = (isPictureChoice: boolean) => {
    if (!question) return;
    const order = options && options.length > 0 ? options.length : 0;
    const option: Question_Option__c = {
      id: `qo-${question.id}-${order}`,
      cforms__Question__c: question.id,
      cforms__Label__c: `qo-${question.id}-${order}`,
      cforms__Order__c: order
    }
    setNewOption(option, isPictureChoice)
  }

  const [activeOption, setActiveOption] = useState(null);

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

  const handleDragStart = ({ active }) => {
    const _activeOption = options?.find(_option => _option.id == active.id);
    setActiveOption(active.id)
  };

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

    handleDrageUpdateOptions(activeIndex, overIndex, isPictureChoice)

  }

  const handleDragCancel = () => {
    setActiveOption(null)
  };


  return <section className="slds-box slds-ui-gen__vertical-layout slds-m-top_small">
    <div className="slds-grid slds-grid_vertical">

      <div className="slds-text-title slds-m-bottom_xx-small">
        Question Options
      </div>

      <DndContext
        sensors={sensors}
        onDragCancel={handleDragCancel}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >

        {
          options && options.length > 0 && question && question.cforms__Type__c !== QuestionTypes.PictureChoice &&
          <OptionsDroppable id={question.id} options={options} />
        }

        {
          options && options.length > 0 && question && question.cforms__Type__c === QuestionTypes.PictureChoice &&
          <PictureOptionsDroppable id={question.id} options={options} />
        }

        <DragOverlay>{activeOption ? <OptionItem option={activeOption} dragOverlay={true} /> : null}</DragOverlay>

      </DndContext>

      <div className="slds-m-top_x-small">
        <Button
          label="Add Option"
          onClick={(e) => handleNewOption(question?.cforms__Type__c === QuestionTypes.PictureChoice)}
        />
      </div>

    </div>
  </section>

}

export const OptionsEditPopover = ({ option, children }: { option: Question_Option__c, children: ReactElement | ReactElement[] }) => {

  const [isOpen, setOpen] = useState(false);
  const [optionLabel, setOptionLabel] = useState('');
  const { options, handleUpdateOptions } = useBuilderContext();

  return <Popover
    hasNoTriggerStyles={true}
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

export const OptionItem = ({ option, dragOverlay, handleRemove }: { option: Question_Option__c, dragOverlay: boolean, handleRemove?: any }) => {

  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <div className="slds-grid slds-box slds-box_xx-small slds-grid_align-spread">
      <Drag className="slds-col slds-large-size_1-of-5">
        <svg className="slds-button__icon" aria-hidden="true">
          <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#drag_and_drop"></use>
        </svg>
      </Drag>
      <Point className="slds-col slds-large-size_3-of-5">
        {option.cforms__Label__c}
      </Point>
      <Point onClick={handleRemove} className="slds-col slds-large-size_1-of-5">
        <svg className="slds-button__icon slds-float_right slds-align_absolute-center" aria-hidden="true">
          <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
        </svg>
      </Point>
    </div>
  )
}

const Drag = styled.div`
  cursor: grab;
`

const Point = styled.div`
  cursor: pointer; 
`

const Popover = styled(SalesforcePopover)`
  z-index: 9999 !important;
  display: block  !important; 
`;

const PopoverInner = styled.div`
`