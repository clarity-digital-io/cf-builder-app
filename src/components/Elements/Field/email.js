import React from 'react';
import { Input } from 'antd';

export const Email = ({ question }) => {

    return (
        <Input 
            placeholder={question.Title__c}
            id={question.Name}
        />
    )

}
