import React, { useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';

export const Multiple = () => {

    const { activeQuestion, activeQuestionOptions } = useContext(DesignContext);

    return (
        <ViewStyle> 

            <h1>Values</h1>

            <p>Select values that will start this <span>Question Flow</span>.</p>

            <fieldset className="slds-form-element">
                <legend className="slds-form-element__legend slds-form-element__label">{ activeQuestion.Title__c }</legend>
                <div className="slds-form-element__control">
                    <div className="slds-checkbox_button-group">
                        {
                            activeQuestionOptions.map(option => {
                                return (
                                    <span className="slds-button slds-checkbox_button">
                                        <input type="checkbox" name="radio" id={ option.Id } value={ option.Id }/>
                                        <label className="slds-checkbox_button__label" for={ option.Id }>
                                            <span className="slds-checkbox_faux">{ option.Label__c }</span>
                                        </label>
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </fieldset>

        </ViewStyle>
    )

}