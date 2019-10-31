import React from 'react';
import { Input } from 'antd';

export const InputField = ({ question }) => {

    return <Input
        aria-describedby={question.Id}
        id={question.Name}
        addonAfter={question.Title__c}
        required={question.Required__c}
        placeholder={question.Placeholder__c}
    />

}
