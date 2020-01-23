import React from 'react';
import { Input } from 'antd';

export const Email = ({ question }) => {

    return (
        <Input 
            placeholder={question.forms__Title__c}
            id={question.Name}
        />
    )

}
