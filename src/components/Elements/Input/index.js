import React from 'react';

export const InputField = ({ value, onChange }) => {

    return (
        <div className="slds-form-element">
            <div className="slds-form-element__control">
                <input onChange={(e) => onChange(e)} value={ value } type="text" id="text-input-id-1" className="slds-input" />
            </div>
        </div>
    )
    
}
