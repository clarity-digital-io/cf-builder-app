import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';

export const Lookup = () => {

    const { lookups, activeQuestion, setActiveQuestion } = useContext(DesignContext);

    const updateLookupQuestion = (e) => {
        
        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, Lookup__c: value }
        })

    }

    return (
        <ViewStyle>

            <h1>Lookup</h1>

            <ViewStyle>

                <div class="slds-form-element">
                    <label class="slds-form-element__label" for="select-01">Select Label</label>
                    <div class="slds-form-element__control">
                        <div class="slds-select_container">
                        <select class="slds-select" id="select-01" onChange={(e) => updateLookupQuestion(e)}>
                            {
                                lookups.map((lookup, id) => {
                                    
                                    console.log(activeQuestion.Lookup__c, lookup);

                                    return (
                                        <option value={lookup} selected={activeQuestion.Lookup__c == lookup ? true : false}>{lookup}</option>
                                    )
                                })
                            }
                        </select>
                        </div>
                    </div>
                </div>

            </ViewStyle>

        </ViewStyle>
    )

}