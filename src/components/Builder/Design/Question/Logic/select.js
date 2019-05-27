import React from 'react';

export const Select = ({ options }) => {
    console.log(options);
    return (
        <div class="slds-form-element">
            <div class="slds-form-element__control">
                <div class="slds-select_container">
                <select class="slds-select" id="select-01">
                    <option value="">Please select</option>
                    {
                        options.map(option => {
                            return <option>{option}</option>
                        })
                    }
                </select>
                </div>
            </div>
        </div>
    )
}
