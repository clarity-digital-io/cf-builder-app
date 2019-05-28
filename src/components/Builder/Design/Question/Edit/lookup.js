import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';

export const Lookup = () => {

    const { sObjects, activeQuestion, setActiveQuestion } = useContext(DesignContext);

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
                    <label class="slds-form-element__label" for="select-01">Please Select an Object</label>
                    <div class="slds-form-element__control">
                        <div class="slds-select_container">
                            <select class="slds-select" id="select-01" onChange={(e) => updateLookupQuestion(e)}>
                                <option>Select</option>
                                {
                                    sObjects.map((lookup, id) => {
                                        
                                        return (
                                            <option value={sObject} selected={activeQuestion.Lookup__c == sObject ? true : false}>{sObject}</option>
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