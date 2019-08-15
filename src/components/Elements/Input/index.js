import React from 'react';
import { Input as AntInput, InputNumber as AntInputNumber } from 'antd';

export const InputField1 = ({ value, onChange }) => {

    return (
        <div className="slds-form-element">
            <div className="slds-form-element__control">
                <input onChange={(e) => onChange(e)} value={ value } type="text" id="text-input-id-1" className="slds-input" />
            </div>
        </div>
    )
    
}

export const InputField = ({ value, onChange }) => {

    return <AntInput onChange={(e) => onChange(e)} value={ value } />
    
}

export const InputNumber = ({ min, max, value, onChange }) => {

    return <AntInputNumber onChange={(e) => onChange(e)} value={ value } />
    
}

