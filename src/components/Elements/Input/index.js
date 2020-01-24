import React from 'react';
import { Input as AntInput, InputNumber as AntInputNumber } from 'antd';

export const InputField = ({ value, onChange }) => {

    return <AntInput onChange={(e) => onChange(e)} value={ value } />
    
}

export const InputNumber = ({ min, max, value, onChange }) => {

    return <AntInputNumber onChange={(e) => onChange(e)} value={ value } />
    
}

