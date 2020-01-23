import React, { useContext } from 'react';
import { Radio } from 'antd';
import { DesignContext } from '../../Context';

const RadioGroup = Radio.Group;

export const MultipleChoice = ({ question }) => {

    const { questionOptions } = useContext(DesignContext); 

    return (
        <RadioGroup>
            {
                questionOptions.get(question.Id) != null ? 
                    questionOptions.get(question.Id).map((option) => {
                        return <Radio
                                name={question.Id}
                                id={option.Id}
                                value={option.Id}
                                checked={false}
                            >
                                {option.forms__Label__c}
                            </Radio>
                    }) :
                    null
            }
        </RadioGroup>
    )

}
