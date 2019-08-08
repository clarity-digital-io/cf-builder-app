import React, { useState } from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export const NetPromoterScore = ({ question }) => {

    const [nps, setNps] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    
    return (
        <RadioGroup>
            {
                nps.map((rate) => {
                    return (
                            <RadioButton
                                name={question.Id}
                                id={rate}
                                value={rate}
                                checked={true}
                            >
                                {rate}
                            </RadioButton>
                        )
                })
            }
        </RadioGroup>
    )

}
