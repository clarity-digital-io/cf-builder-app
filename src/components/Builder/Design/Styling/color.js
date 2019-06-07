import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { TwitterPicker } from 'react-color';

export const Color = ({ color, title, handleColorChange }) => {

    const [show, setShow] = useState(false);

    return [
        <div className="slds-color-picker" key="ColorPickerShow">
            <div className="slds-color-picker__summary">
                <label className="slds-color-picker__summary-label" for="color-picker-summary-input">Choose a { title } Color</label>
                <button className="slds-button slds-color-picker__summary-button slds-button_icon slds-button_icon-more" title="Choose Color" onClick={() => setShow(show => !show)}>
                <span className="slds-swatch" style={{ background : `${color}` }}>
                    <span className="slds-assistive-text">{color}</span>
                </span>
                <svg className="slds-button__icon slds-button__icon_small slds-m-left_xx-small" aria-hidden="true">
                    <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
                </svg>
                <span className="slds-assistive-text">Choose a color. Current color: { color }</span>
                </button>
            </div>
        </div>,
        <div key="ColorPicker">
        { 
            show ? 
            <ColorStyle><TwitterPicker color={color} onChange={ (color, e) => handleColorChange(color, e, 'QuestionColor') }/></ColorStyle> : 
            null 
        }
        </div>
    ]

}

const ColorStyle = styled.div`
    padding: 1.1em 0 1.1em 0; 
`