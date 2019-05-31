import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';

export const Slider = () => {

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

    // const handleMaxLengthUpdate = (value) => {

    //     setActiveQuestion(question => {
    //         return { ...question, Max_Range__c: value, Min_Range__c: '', Step__c: '' }
    //     })

    // }

    return (
        <ViewStyle>
            <h1>Slider Settings</h1>

            {/* <ViewStyle>

                <div className="slds-form-element">
                <label className="slds-form-element__label" for="slider-id-01">
                    <span className="slds-slider-label">
                    <span className="slds-slider-label__label">Max Character Count</span>
                    <span className="slds-slider-label__range">0 - 1000</span>
                    </span>
                </label>
                <div className="slds-form-element__control">
                    <div className="slds-slider">
                    <input type="range" id="slider-id-01" class="slds-slider__range" min="0" max="1000" value={activeQuestion.Max_Length__c} onChange={(e) => handleMaxLengthUpdate(e.target.value) } />
                    <span className="slds-slider__value" aria-hidden="true">{activeQuestion.Max_Length__c}</span>
                    </div>
                </div>
                </div>

            </ViewStyle> */}

        </ViewStyle>
    )

}