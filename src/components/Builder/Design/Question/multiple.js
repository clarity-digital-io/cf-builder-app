import React, { useState, useContext } from 'react';
import ViewStyle from '../../../Elements/View/style';
import { DesignContext } from '../../../Context';

export const Multiple = () => {

    const { activeQuestion } = useContext(DesignContext);

    console.log(activeQuestion);

    const handleKeyDown = (e) => {

        if (e.key === 'Enter') {

            console.log(e.target.value); 
            console.log('do validate');

        }

    }

    return (
        <ViewStyle>
            <h1>Options</h1>

            <ViewStyle>

                <div className="slds-form-element__control">
                    <input onKeyDown={(e) => handleKeyDown(e)} type="text" id="text-input-id-1" placeholder="Add Option" className="slds-input" />
                </div>

            </ViewStyle>

            <ViewStyle>

                {
                    activeQuestion.Clarity_Form_Question_Options__r ? 
                        activeQuestion.Clarity_Form_Question_Options__r.map(option => {

                            return (
                                <div className="slds-form-element__control">
                                    <input value={option.Label__c} type="text" id="text-input-id-1" placeholder="Option" className="slds-input" />
                                </div>
                            )

                        }) :
                        null
                }


            </ViewStyle>

        </ViewStyle>
    )

}
