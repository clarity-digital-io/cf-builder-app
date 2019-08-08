import React from 'react';
import { Slider as SliderComponent } from 'antd';

export const Slider = ({ question }) => {

    return (
        <SliderComponent  
            value={0}
            min={question.Min_Range__c}
            max={question.Max_Range__c}
            step={question.Step__c}
        />
    )

}