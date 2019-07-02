import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext, EditContext } from '../../../../Context';

export const Multiple = () => {

    const { activeQuestionOptions, setActiveQuestionOptions } = useContext(EditContext);

    const { activeQuestion } = useContext(DesignContext);
    
    const select = (e) => {

        let checked = e.target.checked;

        let value = e.target.value; 

        setActiveQuestionOptions(options => {
            return options.map(option => {
                return { ...option, Active_Flow__c: option.Id == value ? checked : option.Active_Flow__c }
            })
        });

    }

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
                                        <input type="checkbox" checked={option.Active_Flow__c} onChange={(e) => select(e)} name="radio" id={ option.Id } value={ option.Id }/>
                                        <label className="slds-checkbox_button__label" htmlFor={ option.Id }>
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