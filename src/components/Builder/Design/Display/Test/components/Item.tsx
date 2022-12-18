import React, { useState } from "react";
import styled from "styled-components";
import { useEditFormContext } from "../../../../../../context/EditContext";
import { QuestionTypes } from "../../../../../../utils/types/fields";

const Item = ({ id, dragOverlay }) => {

  const { initQuestionEdit } = useEditFormContext();

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
              <button className="slds-drop-zone__label_button slds-button_reset" onClick={() => initQuestionEdit({ Id: '0', Name: 'Test', cforms__Title__c: 'test', cforms__Required__c: false, cforms__Type__c: QuestionTypes.InputField })}>
                <span className="slds-assistive-text">Edit: </span>
                <span>{id}</span>
              </button>
            </h2>
          </div>
        </div>
      </div>

      <div className="demo-only demo-component" style={{ width: '100%', height: '2rem', padding: '1rem' }}> Item {id} </div>

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





const ItemStyle = styled.div`

`

export default Item;
