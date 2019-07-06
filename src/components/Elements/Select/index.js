import React from 'react';

export const Select = ({ options, value, onChange}) => {
    console.log(options, value)
    return (
        <div className="slds-form-element">
            <div className="slds-form-element__control">
                <div className="slds-select_container">
                    <select className="slds-select" id="select-01" value={value} onChange={(e) => onChange(e)}>
                        <option value="">Select</option>
                        {
                            options.map((option) => {
                                return (
                                    <option key={option} value={option}>{option}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}