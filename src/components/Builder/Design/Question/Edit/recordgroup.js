import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';

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

    return [
        <ViewStyle key={'description'}>

            <h1>Record Group</h1>

            <p>
                Create a new Record for any standard or custom object you chose. (At a minimum Required fields will be displayed).
            </p>

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

        </ViewStyle>,
        <ViewStyle key={'fields'}> 

            <View className="row">

                <View className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <Box>

                    <h1>Required Fields</h1>

                    <fieldset class="slds-form-element">
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

                    </Box>
                </View>

                <View className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <Box>

                        <h1>Additional Fields</h1>

                        <fieldset class="slds-form-element">
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

                    </Box>
                </View>

            </View>

        </ViewStyle>, 
        <ViewStyle>
            <div class="slds-form-element" role="group" aria-labelledby="picklist-group-label">
    <span id="picklist-group-label" class="slds-form-element__label slds-form-element__legend">Select Options</span>
    <div class="slds-form-element__control">
    <div class="slds-dueling-list">
    <div class="slds-assistive-text" id="drag-live-region" aria-live="assertive"></div>
    <div class="slds-assistive-text" id="option-drag-label">Press space bar when on an item, to move it within the list. CMD plus left and right arrow keys, to move items between lists. Required items must remain in the second category.</div>
    <div class="slds-dueling-list__column">
        <span class="slds-form-element__label" id="label-99">First Category</span>
        <div class="slds-dueling-list__options">
            <ul aria-describedby="option-drag-label" aria-labelledby="label-99" aria-multiselectable="true" class="slds-listbox slds-listbox_vertical" role="listbox">
                <li role="presentation" class="slds-listbox__item">
                    <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="0">
                    <span class="slds-media__body">
                    <span class="slds-truncate" title="Option 1">Option 1</span>
                    </span>
                    </div>
                </li>
                <li role="presentation" class="slds-listbox__item">
                    <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="-1">
                    <span class="slds-media__body">
                    <span class="slds-truncate" title="Option 2">Option 2</span>
                    </span>
                    </div>
                </li>
                <li role="presentation" class="slds-listbox__item">
                    <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="-1">
                    <span class="slds-media__body">
                    <span class="slds-truncate" title="Option 3">Option 3</span>
                    </span>
                    </div>
                </li>
                <li role="presentation" class="slds-listbox__item">
                    <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="-1">
                    <span class="slds-media__body">
                    <span class="slds-truncate" title="Option 6">Option 6</span>
                    </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="slds-dueling-list__column">
    <button class="slds-button slds-button_icon slds-button_icon-container" title="Move Selection to Second Category">
    <svg class="slds-button__icon" aria-hidden="true">
    <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#right"></use>
    </svg>
    <span class="slds-assistive-text">Move Selection to Second Category</span>
    </button>
    <button class="slds-button slds-button_icon slds-button_icon-container" title="Move Selection to First Category">
    <svg class="slds-button__icon" aria-hidden="true">
    <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#left"></use>
    </svg>
    <span class="slds-assistive-text">Move Selection to First Category</span>
    </button>
    </div>
        <div class="slds-dueling-list__column">
        <span class="slds-form-element__label" id="label-100">Second Category</span>
            <div class="slds-dueling-list__options">
                <ul aria-describedby="option-drag-label" aria-labelledby="label-100" aria-multiselectable="true" class="slds-listbox slds-listbox_vertical" role="listbox">
                    <li role="presentation" class="slds-listbox__item">
                        <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="0">
                        <span class="slds-media__body">
                        <span class="slds-truncate" title="Option 4">Option 4</span>
                        </span>
                        <span class="slds-media__figure slds-media__figure_reverse">
                        <span class="slds-icon_container" title="Locked item">
                        <svg class="slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#lock"></use>
                        </svg>
                        <span class="slds-assistive-text"> : item cannot be removed from Second Category</span>
                        </span>
                        </span>
                        </div>
                    </li>
                    <li role="presentation" class="slds-listbox__item">
                        <div class="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline" aria-selected="false" draggable="true" role="option" tabindex="-1">
                        <span class="slds-media__body">
                        <span class="slds-truncate" title="Option 5">Option 5</span>
                        </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
</div>
        </ViewStyle>
    ]

}
