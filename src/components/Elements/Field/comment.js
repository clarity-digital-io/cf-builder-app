import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export const Comment = ({ question }) => {

    return <TextArea
        aria-describedby={question.Id}
        id={question.Name}
        addonAfter={question.forms__Title__c}
        required={question.forms__Required__c}
        placeholder={question.forms__Placeholder__c}
    />

}
