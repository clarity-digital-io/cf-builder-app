import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';

export const Number = ({ question }) => {

    return (
        <InputNumber
            min={question.Min_Range__c} 
            max={question.Max_Range__c}
            step={question.Step__c}
        />
    )

}
