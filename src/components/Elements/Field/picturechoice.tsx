import React from "react";
import { Checkbox as SalesforceCheckbox, Files, File } from "@salesforce/design-system-react";
import { Question__c } from "../../../utils/types/sObjects";
import styled from "styled-components";

export const PictureChoice = ({ question }: { question: Question__c }) => {
  return (
    <fieldset className="slds-form-element slds-form-element_stacked">
      <div className="slds-grid slds-wraps">
        <legend className="slds-form-element__legend slds-form-element__label">
          {question.cforms__Title__c}
        </legend>
      </div>
      {/* 
      <Files id="files-with-no-title-example">
        <File
          id="file-with-no-title"
          labels={{
            title: 'Proposal.pdf',
          }}
          hasNoVisibleTitle
          image="/assets/images/placeholder-img@16x9.jpg"
          crop="4-by-3"
          onClickImage={(event) => {
            event.preventDefault();;
          }}
        />
      </Files> */}
      <div className="slds-grid slds-wraps">

        <PictureOption className="slds-grid slds-grid_vertical slds-p-around_small">
          <div className="slds-col">
            <figure>
              <img alt="test" src="/assets/images/placeholder-img@16x9.jpg" width={140} />
            </figure>
          </div>

          <div className="slds-col slds-p-top_small">
            <SalesforceCheckbox
              key={0}
              assistiveText={{
                label: 'Checkbox 1'
              }}
              id={0}
              labels={{
                label: 'Checkbox 1'
              }}
              checked={false}
            />
          </div>
        </PictureOption>

      </div>

    </fieldset >
  );
};

const PictureOption = styled.div`
  border: 1px solid #e5e5e5;
  bord-radius: 2px; 
`