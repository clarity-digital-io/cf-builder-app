import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';

export const Checkbox = ({ question }) => {
    console.log(question);
    return <AntdCheckbox.Group
        options={question.Clarity_Form_Question_Options__r}
    />
}


