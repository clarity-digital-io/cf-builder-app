import { Input } from "@salesforce/design-system-react";
import React, { useState } from "react";
import { useBuilderContext } from "../../../../../context/BuilderContext";
import { QuestionTypes } from "../../../../../utils/types/fields";
import { Question__c } from "../../../../../utils/types/sObjects";
import { Lookup, Attachments, MultipleChoice, Dropdown, Slider, Comment, Checkbox, RecordGroup, Date } from "../../../../Elements/Field";
import { removeAtIndex } from "../utils/array";

const Item = ({ droppableId, id, index, data, dragOverlay }: { droppableId: number | string, id: number | string, data: Question__c, index: number, dragOverlay: boolean }) => {
  const { initQuestionEdit } = useBuilderContext();

  const { dndQuestions, setDndQuestion } = useBuilderContext();

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    if (!dragOverlay) {
      setIsHovering(true);
    }
  };

  const handleMouseOut = () => {
    if (!dragOverlay) {
      setIsHovering(false);
    }
  };

  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <div style={style} className={isHovering ? 'slds-is-hovered slds-drop-zone__container slds-m-top_x-small' : 'slds-drop-zone__container slds-m-top_x-small'} onMouseEnter={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className="slds-drop-zone__label slds-drop-zone__label_container">
        <div className="slds-media slds-media_center">
          <div className="slds-media__figure">
            <span className="slds-icon_container slds-icon-utility-connected_apps slds-current-color">
              <svg className="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#connected_apps"></use>
              </svg>
            </span>
          </div>
          <div className="slds-media__body" onMouseEnter={handleMouseOver} >
            <h2>
              <button className="slds-drop-zone__label_button slds-button_reset" onClick={() => initQuestionEdit(data)}>
                <span className="slds-assistive-text">Edit: </span>
                <span>{data.id} id</span>
              </button>
            </h2>
          </div>
        </div>
      </div>

      <div className="slds-p-around_x-small" >
        <QuestionComponent question={data} questionType={data.cforms__Type__c} />
      </div>

      <div className="slds-drop-zone__actions">
        <div className="slds-button-group" role="group">
          <button className="slds-button slds-button_icon slds-button_icon-brand slds-button_icon-x-medium" title="Move">
            <svg className="slds-button__icon" aria-hidden="true">
              <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#move"></use>
            </svg>
            <span className="slds-assistive-text">Move</span>
          </button>
          <button onClick={() => {
            const newItems = {
              ...dndQuestions,
              [droppableId]: removeAtIndex(dndQuestions[droppableId], index),
            };
            setDndQuestion(newItems);
          }}
            className="slds-button slds-button_icon slds-button_icon-brand slds-button_icon-x-medium" title="Close">
            <svg className="slds-button__icon" aria-hidden="true">
              <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
            </svg>
            <span className="slds-assistive-text">Delete</span>
          </button>
        </div>
      </div>

    </div>
  );
};

const QuestionComponent = ({ question, questionType }: { question: Question__c, questionType: QuestionTypes | string }) => {
  switch (typeof questionType === 'string' ? parseInt(questionType) : questionType) {
    case QuestionTypes.MultipleChoice:
      return <MultipleChoice question={question} />
    case QuestionTypes.Comment:
      return <Comment question={question} />
    case QuestionTypes.Dropdown:
      return <Dropdown question={question} />
    case QuestionTypes.Slider:
      return <Slider question={question} />
    case QuestionTypes.Lookup:
      return <Lookup question={question} />
    case QuestionTypes.RecordGroup:
      return <RecordGroup question={question} />
    case QuestionTypes.Image:
    case QuestionTypes.Checkbox:
      return <Checkbox question={question} />
    case QuestionTypes.FreeText:
    case QuestionTypes.PictureChoice:
    case QuestionTypes.GeoLocation:
    case QuestionTypes.Attachments:
      return <Attachments question={question} />
    case QuestionTypes.Date:
      return <Date question={question} />
    case QuestionTypes.InputField:
    case QuestionTypes.Email:
    case QuestionTypes.Number:

      return <Input type="text" label={questionType.toString()} />
    default:
      return <Input type="text" label="Value" />
  }
}

export default Item;
