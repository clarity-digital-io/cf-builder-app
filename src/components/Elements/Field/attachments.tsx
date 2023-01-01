import React from "react";
import { Question__c } from "../../../utils/types/sObjects";

export const Attachments = ({ question }: { question: Question__c }) => {
  return (
    <div className="slds-form-element" key={question.id}>
      <span
        className="slds-form-element__label"
        id="file-selector-primary-label"
      >
        {question.cforms__Title__c}
      </span>
      <div className="slds-form-element__control">
        <div className="slds-file-selector slds-file-selector_images">
          <div className="slds-file-selector__dropzone">
            <input
              type="file"
              className="slds-file-selector__input slds-assistive-text"
              accept="image/png"
              id="file-upload-input-01"
              aria-labelledby="file-selector-primary-label file-selector-secondary-label"
            />
            <label
              className="slds-file-selector__body"
              htmlFor="file-upload-input-01"
              id="file-selector-secondary-label"
            >
              <span className="slds-file-selector__button slds-button slds-button_neutral">
                <svg
                  className="slds-button__icon slds-button__icon_left"
                  aria-hidden="true"
                >
                  <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#upload"></use>
                </svg>
                Upload Files
              </span>
              <span className="slds-file-selector__text slds-medium-show">
                or Drop Files
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
