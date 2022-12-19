import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useBuilderContext } from "../../../../../context/BuilderContext";
import { useEditFormContext } from "../../../../../context/EditContext";
import { Question__c } from "../../../../../utils/types/sObjects";

const Item = ({ id, dragOverlay }) => {

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
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  // if (!fieldQuestion) {
  //   return null;
  // }

  return (
    <div style={style} className="slds-drop-zone__container slds-is-hovered" onMouseEnter={handleMouseOver} onMouseOut={handleMouseOut}>
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
              {/* <button className="slds-drop-zone__label_button slds-button_reset" onClick={() => initQuestionEdit(fieldQuestion)}>
                <span className="slds-assistive-text">Edit: </span>
                <span>{fieldQuestion.cforms__Type__c}</span>
              </button> */}
            </h2>
          </div>
        </div>
      </div>

      <div className="demo-only demo-component" style={{ width: '100%', height: '2rem', padding: '1rem' }}>
        item
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

export default Item;
