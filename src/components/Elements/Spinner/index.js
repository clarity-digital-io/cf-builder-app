import React from 'react';
import styled, { css } from 'styled-components';

export const Spinner = () => {
    return (

        <div role="status" className="slds-spinner slds-spinner_medium">
            <span className="slds-assistive-text">Loading</span>
            <div className="slds-spinner__dot-a"></div>
            <div className="slds-spinner__dot-b"></div>
        </div>

    )
}

export const SmallSpinner = () => {
    return (

        <CenterSpinner role="status" className="slds-spinner slds-spinner_small slds-spinner_inline">
            <span className="slds-assistive-text">Loading</span>
            <div className="slds-spinner__dot-a"></div>
            <div className="slds-spinner__dot-b"></div>
        </CenterSpinner>

    )
}

const CenterSpinner = styled.div`
    margin: 0 auto; 
`;