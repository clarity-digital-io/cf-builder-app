import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';

export const Number = ({ question }) => {

    return (
        <InputNumber
            min={question.forms__Min_Range__c} 
            max={question.forms__Max_Range__c}
            step={question.forms__Step__c}
        />
    )

}
