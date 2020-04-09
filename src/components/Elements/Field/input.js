import React from 'react';
import { Input } from '@salesforce/design-system-react';

export const InputField = ({ question }) => {

    return <Input aria-describedby={question.Id} id={question.Name} label={question.forms__Title__c} required={question.forms__Required__c} />
    
}
