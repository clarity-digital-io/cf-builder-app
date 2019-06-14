import React from 'react';

export const Checkbox = ({ options, checked, onChange}) => {

    return (
        <fieldset class="slds-form-element">
            <div class="slds-form-element__control">

                {
                    options.map((field) => {
                        return (
                            <div class="slds-checkbox">
                                <input type="checkbox" name="options" id={field} value={field} onChange={(e) => onChange(e)} checked="" />
                                <label class="slds-checkbox__label" for={field}>
                                <span class="slds-checkbox_faux"></span>
                                <span class="slds-form-element__label">{field}</span>
                                </label>
                            </div>
                        )
                    })
                }
                            
            </div>
        </fieldset>
    )
}