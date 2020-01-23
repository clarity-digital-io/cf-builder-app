import React, { useContext } from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { DesignContext } from '../../Context';

export const Checkbox = ({ question }) => {

    const { questionOptions } = useContext(DesignContext); 

    const options = () => {
        return questionOptions.get(question.Id) != null ? 
            questionOptions.get(question.Id).map(q => {
                return { value: q.Id, label: q.forms__Label__c }
            }) :
            []
    }

    return <AntdCheckbox.Group
        options={options()}
    />
}


