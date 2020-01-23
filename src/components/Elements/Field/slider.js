import React from 'react';
import { Slider as SliderComponent } from 'antd';

export const Slider = ({ question }) => {

    return (
        <SliderComponent  
            value={0}
            min={question.forms__Min_Range__c}
            max={question.forms__Max_Range__c}
            step={question.forms__Step__c}
        />
    )

}