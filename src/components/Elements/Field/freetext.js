import React from 'react';

export const FreeText = ({ question }) => {
    
	return question.forms__FreeText_Type__c == 'Header' ?
	<div className="slds-text-heading_large">{question.forms__Title__c}</div> :
	<div className="slds-text-body_small">{question.forms__Title__c}</div>

}
