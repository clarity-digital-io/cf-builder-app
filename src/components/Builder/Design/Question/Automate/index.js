import React, { useContext } from 'react';
import { DesignContext, EditContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';

import Box from '../../../../Elements/Box';
import { Multiple } from './multiple';
import { Spinner } from '../../../../Elements/Spinner';

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

export const AutomateQuestion = () => {

    const { loading, activeFlowDesign, setActiveFlowDesign } = useContext(EditContext); 

    const { activeQuestion } = useContext(DesignContext); 

    const updateActivate = (e) => {
        
        let checked = e.target.checked;

        setActiveFlowDesign(design => {
            return { ...design, Active__c: checked }
        })

    }

    const updateFormSubmissionStatus = (e) =>{

        let checked = e.target.checked;

        setActiveFlowDesign(design => {
            return { ...design, Form_Submission__c: checked }
        })

    }

    return (
        <View className="row middle-xs">
            <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Box>

                    <ViewStyle space border>

                        <h1>Automate</h1>

                        <ViewStyle>

                            <p>
                                Clarity Forms allows you to set what we call <span>Question Flows</span>, 
                                these allow you to use all of Salesforce automation features. Easily detect a form change, 
                                either on submission or as soon as it happens. 
                            </p>

                        </ViewStyle>

                    </ViewStyle>

                    <ViewStyle space border>

                        <h1>Input Flow Settings</h1>

                        <ViewStyle>

                            <div className="slds-form-element">
                                <label className="slds-checkbox_toggle slds-grid">
                                    <span className="slds-form-element__label slds-m-bottom_none">Activate</span>
                                    <input type="checkbox" checked={activeFlowDesign.Active__c} onClick={(e) => updateActivate(e)}  name="checkbox-toggle-14" value="checkbox-toggle-14" aria-describedby="checkbox-toggle-14" />
                                    <span id="checkbox-toggle-14" className="slds-checkbox_faux_container" aria-live="assertive">
                                    <span className="slds-checkbox_faux"></span>
                                    </span>
                                </label>
                            </div>

                        </ViewStyle>

                        <ViewStyle>

                            <div className="slds-form-element">
                                <label className="slds-checkbox_toggle slds-grid">
                                    <span className="slds-form-element__label slds-m-bottom_none">Only On Form Submission</span>
                                    <input type="checkbox" checked={activeFlowDesign.Form_Submission__c} onClick={(e) => updateFormSubmissionStatus(e)} name="checkbox-toggle-14" value="checkbox-toggle-14" aria-describedby="checkbox-toggle-14" />
                                    <span id="checkbox-toggle-14" className="slds-checkbox_faux_container" aria-live="assertive">
                                    <span className="slds-checkbox_faux"></span>
                                    </span>
                                </label>
                            </div>

                        </ViewStyle>

                    </ViewStyle>

                    <ViewStyle space border scrollAutomate> 

                        {
                            loading ? <Spinner /> : getQuestionType(activeQuestion.Type__c) 
                        }

                    </ViewStyle>

                </Box>  
            </View>
        </View>
    )
}
