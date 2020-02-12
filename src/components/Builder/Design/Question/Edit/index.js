import React, { useState, useContext } from 'react';
import { DesignContext, EditContext } from '../../../../Context';
import { Switch as AntSwitch, Input as AntInput } from 'antd';

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
		console.log('type', type); 
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
            return <div></div>
            break;
    }

}

export const EditQuestion = () => {

    const { loading } = useContext(EditContext);

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext); 

    const updateRequiredStatus = (e) => {

        let checked = e.target.checked;

        setActiveQuestion(question => {
            return { ...question, forms__Required__c: checked }
        })

    }

    const updateActiveQuestion = (e) => {
        
        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, forms__Title__c: value }
        })

    }

    return (
        <View className="row middle-xs">
            <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Box>

                    <ViewStyle space border>

                        <h1>Settings</h1>

                        {
                            showRequiredInput(activeQuestion.forms__Type__c) ?
                            <ViewStyle>

                                <h2>Required</h2>
																<AntSwitch defaultChecked={activeQuestion.forms__Required__c} onChange={(e) => updateRequiredStatus(e)} />

                            </ViewStyle> : 
                            null
                        }


                    </ViewStyle>

                    <ViewStyle space border>

                        <h2>Question Label</h2>

                        <ViewStyle>

														<AntInput type="text" id={ activeQuestion.Id } value={ activeQuestion.forms__Title__c || activeQuestion.forms__Salesforce_Field__c } onChange={(e) => updateActiveQuestion(e)} />

                        </ViewStyle>
                        
                    </ViewStyle>

                    {
                        hasExtraEditSettings(activeQuestion.forms__Type__c) ?
                            <ViewStyle space scroll>
                            
                                {
                                    loading ? <SmallSpinner /> : getQuestionType(activeQuestion.forms__Type__c) 
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

const showRequiredInput = (type) => {

    switch (type) {
        case 'ConnectedObject':
        case 'RecordGroup':
        case 'FreeText':
            return false;
            break;
        default:
            return true;
            break;
    }

}