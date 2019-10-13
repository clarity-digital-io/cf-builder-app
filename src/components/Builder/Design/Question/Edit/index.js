import React, { useState, useContext } from 'react';
import { DesignContext, EditContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';

import Box from '../../../../Elements/Box';
import { Attachments } from './Attachments'; 
import { Multiple } from './multiple'; 
import { Comment } from './comment'; 
import { Slider } from './slider'; 
import { Lookup } from './lookup'; 
import { RecordGroup } from './recordgroup'; 
import { ConnectedObject } from './connectedobject'; 
import { PictureChoices } from './picturechoices'; 
import { FreeText } from './freetext'; 
import { SmallSpinner } from '../../../../Elements/Spinner';

const getQuestionType = (type) => {

    switch (type) {
        case 'Attachments':
            return <Attachments />
            break;
        case 'MultipleChoice':
        case 'Dropdown':
        case 'Ranking':
        case 'Checkbox':
            return <Multiple />
            break;
        case 'Comment':
            return <Comment />
            break; 
        case 'NetPromoterScore':
            return <div>NetPromoterScore</div>
            break;
        case 'Slider':
            return <Slider />
            break;
        case 'Email':
            return <Email />
            break;
        case 'Number':
            return <div>Number</div>
            break;
        case 'Lookup':
        case 'REFERENCE':
            return <Lookup />
            break;
        case 'RecordGroup':
            return <RecordGroup />
            break;
        case 'ConnectedObject':
            return <ConnectedObject />
            break;
        case 'PictureChoice':
            return <PictureChoices />
            break;
        case 'FreeText':
            return <FreeText />
            break;
        default:
            return <div>DefaultType: { type }</div>
            break;
    }

}

export const EditQuestion = () => {

    const { loading } = useContext(EditContext);

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext); 

    const updateRequiredStatus = (e) => {

        let checked = e.target.checked;

        setActiveQuestion(question => {
            return { ...question, Required__c: checked }
        })

    }

    const updateActiveQuestion = (e) => {
        
        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, Title__c: value }
        })

    }

    return (
        <View className="row middle-xs">
            <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Box>

                    <ViewStyle space border>

                        <h1>Settings</h1>

                        {
                            activeQuestion.Type__c != 'ConnectedObject' ?
                            <ViewStyle>

                                <div className="slds-form-element">
                                    <label className="slds-checkbox_toggle slds-grid">
                                        <span className="slds-form-element__label slds-m-bottom_none">Required</span>
                                        <input checked={activeQuestion.Required__c} onClick={(e) => updateRequiredStatus(e)} type="checkbox" name="checkbox-toggle-14" value="checkbox-toggle-14" aria-describedby="checkbox-toggle-14" />
                                        <span id="checkbox-toggle-14" className="slds-checkbox_faux_container" aria-live="assertive">
                                        <span className="slds-checkbox_faux"></span>
                                        </span>
                                    </label>
                                </div>

                            </ViewStyle> : 
                            null
                        }


                    </ViewStyle>

                    <ViewStyle space border>

                        <h1>Question</h1>

                        <ViewStyle>
                            
                            <div className="slds-form-element">
                                <label className="slds-form-element__label" htmlFor="text-input-id-1">Label</label>
                                <div className="slds-form-element__control">
                                    <input onChange={(e) => updateActiveQuestion(e)} value={ activeQuestion.Title__c } type="text" id="text-input-id-1" placeholder="Placeholder Text" className="slds-input" />
                                </div>
                            </div>

                        </ViewStyle>
                        
                    </ViewStyle>

                    {
                        hasExtraEditSettings(activeQuestion.Type__c) ?
                            <ViewStyle space scroll>
                            
                                {
                                    loading ? <SmallSpinner /> : getQuestionType(activeQuestion.Type__c) 
                                }

                            </ViewStyle> :
                            null
                    }


                </Box>  
            </View>
        </View>
    )
}

const hasExtraEditSettings = (type) => {

    switch (type) {
        case 'NetPromoterScore':
        case 'Email':
            return false
            break;
        default:
            return true; 
            break;
    }

}