import React from 'react';

export const Spinner = () => {
    return (

        <div role="status" className="slds-spinner slds-spinner_medium">
            <span className="slds-assistive-text">Loading</span>
            <div className="slds-spinner__dot-a"></div>
            <div className="slds-spinner__dot-b"></div>
        </div>

    )
}