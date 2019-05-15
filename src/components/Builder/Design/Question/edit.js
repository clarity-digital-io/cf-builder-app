import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { DesignContext } from '../../../Context';

import View from '../../../Elements/View';
import Box from '../../../Elements/Box';
import Main from '../../../Elements/Theme';
import { Multiple } from './multiple'; 

const getQuestionType = (type) => {

    switch (type) {
        case 'MultipleChoice':
        case 'Dropdown':
        case 'Ranking':
        case 'Checkbox':
            return <Multiple />
            break;
        case 'Comment':
            return <div>Comment</div>
            break;
        case 'Star':
            return <div>star</div>
            break; 
        case 'NetPromoterScore':
            return <div>NetPromoterScore</div>
            break;
        case 'Slider':
            return <div>Slider</div>
            break;
        case 'Email':
            return <div>Email</div>
            break;
        case 'Payment':
            return <div>Payment</div>
            break;
        default:
            return <div>{ type }</div>
            break;
    }

}

export const EditQuestion = () => {

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

                        </ViewStyle>

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

                    <ViewStyle>
                        Type Specific here { getQuestionType(activeQuestion.Type__c) }
                    </ViewStyle>
                </Box>  
            </View>
        </View>
    )
}

const ViewStyle = styled.div`

    padding: 1em 0em 1em 0;

    h1 {
        font-weight: 900;
        padding-bottom: 1em;
    }

    ${props => props.border && css`
        border-bottom: 1px solid ${Main.color.light}
    `}

    ${props => props.space && css`
        padding: 2em 1em 2em 1em; 
    `}
`;