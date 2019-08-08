import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

export const MultipleChoice = ({ question }) => {

    return (
        <RadioGroup>
            {
                question.Clarity_Form_Question_Options__r.map((option) => {
                    return <Radio
                            name={question.Id}
                            id={option.value}
                            value={option.value}
                            checked={false}
                        >
                            {option.label}
                        </Radio>
                })
            }
        </RadioGroup>
    )

}
