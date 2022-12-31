import { Input } from "@salesforce/design-system-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useBuilderContext } from "../../../../../context/BuilderContext";
import { useEditFormContext } from "../../../../../context/EditContext";
import { QuestionTypes } from "../../../../../utils/types/fields";
import { Question__c } from "../../../../../utils/types/sObjects";

const Item = ({ id, data, dragOverlay }: { id: number | string, data: Question__c, dragOverlay: boolean }) => {
  const { initQuestionEdit } = useEditFormContext();

  // const { questions } = useBuilderContext();

  // const [fieldQuestion, setFieldQuestion] = useState<Question__c>(null);
  // console.log({ fieldQuestion })
  // useEffect(() => {
  //   const question = questions[id];
  //   setFieldQuestion(question);
  // }, [questions])

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

  // if (!fieldQuestion) {
  //   return null;
  // }

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
        <QuestionComponent questionType={data.cforms__Type__c} />
      </div>

      {
        isHovering ?
          <div className="slds-drop-zone__actions">
            <div className="slds-button-group" role="group">
              <button className="slds-button slds-button_icon slds-button_icon-brand slds-button_icon-x-small" title="Move">
                <svg className="slds-button__icon" aria-hidden="true">
                  <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#move"></use>
                </svg>
                <span className="slds-assistive-text">Move</span>
              </button>
              <button className="slds-button slds-button_icon slds-button_icon-brand slds-button_icon-x-small" title="Close">
                <svg className="slds-button__icon" aria-hidden="true">
                  <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
                </svg>
                <span className="slds-assistive-text">Close</span>
              </button>
            </div>
          </div> :
          null
      }

    </div>
  );
};

const QuestionComponent = ({ questionType }: { questionType: QuestionTypes }) => {
  console.log({ questionType })
  switch (questionType) {
    case QuestionTypes.MultipleChoice:
    case QuestionTypes.Comment:
    case QuestionTypes.Dropdown:
    case QuestionTypes.Slider:
    case QuestionTypes.Date:
    case QuestionTypes.Email:
    case QuestionTypes.Number:
    case QuestionTypes.Lookup:
    case QuestionTypes.RecordGroup:
    case QuestionTypes.Image:
    case QuestionTypes.Checkbox:
    case QuestionTypes.FreeText:
    case QuestionTypes.PictureChoice:
    case QuestionTypes.InputField:
    case QuestionTypes.GeoLocation:
    case QuestionTypes.Attachments:
      return <Input
        type="text"
        id="base-id"
        label={questionType.toString()}
      />
    default:
      return <Input
        type="text"
        id="base-id"
        label="Value"
      />
  }
}

export default Item;
