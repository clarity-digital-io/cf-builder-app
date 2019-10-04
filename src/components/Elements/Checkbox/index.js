import React from 'react';

export const Checkbox = ({ options, checked, onChange}) => {

    return (
        <fieldset className="slds-form-element">
            <div className="slds-form-element__control">

                {
                    options.map((field) => {
                        return (
                            <div className="slds-checkbox">
                                <input type="checkbox" name="options" id={field} value={field} onChange={(e) => onChange(e)} checked="" />
                                <label className="slds-checkbox__label" for={field}>
                                <span className="slds-checkbox_faux"></span>
                                <span className="slds-form-element__label">{field}</span>
                                </label>
                            </div>
                        )
                    })
                }
                            
            </div>
        </fieldset>
    )
}