import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';

export const RecordGroup = () => {

    const { sObjects, activeQuestion, setActiveQuestion, setRecordGroupEdit, requiredFields, additionalFields } = useContext(DesignContext);

    const updateLookupQuestion = (e) => {
        
        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, Record_Group__c: value }
        })

        setRecordGroupEdit(value);

    }

    return (
        <ViewStyle>

            <h1>Record Group</h1>

            <p>
                Create a new Record for any standard or custom object you chose. (At a minimum Required fields will be displayed).
            </p>

            <ViewStyle>

                <div class="slds-form-element">
                    <label class="slds-form-element__label" for="select-01">Please Select an Object</label>
                    <div class="slds-form-element__control">
                        <div class="slds-select_container">
                            <select class="slds-select" id="select-01" onChange={(e) => updateLookupQuestion(e)}>
                                <option>Select</option>
                                {
                                    sObjects.map((sObject, id) => {
                                        
                                        return (
                                            <option value={sObject} selected={activeQuestion.Record_Group__c == sObject ? true : false}>{sObject}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <fieldset class="slds-form-element">
                <legend class="slds-form-element__legend slds-form-element__label">Required Fields</legend>
                    <div class="slds-form-element__control">

                        {
                            Object.keys(requiredFields).map((field, index) => {
                                return (
                                    <div class="slds-checkbox">
                                        <input type="checkbox" name="options" id={field} value={field} checked="" />
                                        <label class="slds-checkbox__label" for={field}>
                                        <span class="slds-checkbox_faux"></span>
                                        <span class="slds-form-element__label">{field} - {requiredFields[field]}</span>
                                        </label>
                                    </div>
                                )
                            })
                        }
                                    
                    </div>
                </fieldset>

                <fieldset class="slds-form-element">
                <legend class="slds-form-element__legend slds-form-element__label">Additional Fields</legend>
                    <div class="slds-form-element__control">

                        {
                            Object.keys(additionalFields).map((field, index) => {
                                return (
                                    <div class="slds-checkbox">
                                        <input type="checkbox" name="options" id={field} value={field} checked="" />
                                        <label class="slds-checkbox__label" for={field}>
                                        <span class="slds-checkbox_faux"></span>
                                        <span class="slds-form-element__label">{field} - {additionalFields[field]}</span>
                                        </label>
                                    </div>
                                )
                            })
                        }
                                    
                    </div>
                </fieldset>

            </ViewStyle>

        </ViewStyle>
    )

}