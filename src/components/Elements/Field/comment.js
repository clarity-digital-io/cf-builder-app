import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export const Comment = ({ question }) => {

    return <TextArea
        aria-describedby={question.Id.toString()}
        id={question.Name}
        addonAfter={question.Title__c}
        required={question.Required__c}
        placeholder={question.Placeholder__c}
    />

}
