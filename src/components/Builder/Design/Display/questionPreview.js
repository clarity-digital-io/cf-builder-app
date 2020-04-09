import React from 'react';
import { getType } from './types'; 

export const QuestionPreview = ({ question }) => {

    return (
			
				hasFormLabel(question.forms__Type__c) ? 
				<div key={question.Id} className="slds-form-element slds-form-element_stacked">
					{ getType(question) } 
				</div> :
				getType(question)
			
    )
}

const hasFormLabel = (type) => {

    if(type == 'RecordGroup' || type == 'FreeText') {
        return false; 
    }

    return true;

}

