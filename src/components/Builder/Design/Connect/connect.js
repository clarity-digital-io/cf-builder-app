import React, { useContext, useState } from 'react';
import { call } from '../../../RemoteActions'; 

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button, ButtonInput} from '../../../Elements/Button';
import { SmallSpinner } from '../../../Elements/Spinner';

import { BuilderContext, DesignContext } from '../../../Context';

export const FieldConnectState = () => {

    const { questions } = useContext(DesignContext);

    const { activeFieldMapping, setActiveFieldMapping, activeConnection, activeFields } = useContext(BuilderContext);

    const [questionOptions, setQuestionOptions] = useState(
        questions.filter(question => (question.forms__Type__c != 'Text' && question.forms__Type__c != 'RecordGroup' && question.forms__Type__c != 'PictureChoice'))
    )

    const addConnectionField = () => {
        setActiveFieldMapping((mappings) => {
            return mappings.concat([{ forms__Clarity_Form_Connection__c: activeConnection.Id, forms__Salesforce_Field__c: '', forms__Clarity_Form_Question__c: '' }])
        })
    }

    const setFieldSelection = (e, order) => {

        let value = e.target.value; 

        setActiveFieldMapping((mappings) => {

            return mappings.map((mapping, i) => {
                if(i == order) {
                    return { ...mapping, forms__Salesforce_Field__c: value }
                }
                return mapping
            })

        });
    }
    
    const setQuestionSelection = (e, order, custom) => {

        let value = e.target.value; 

        setActiveFieldMapping((mappings) => {

            return mappings.map((mapping, i) => {
                if(i == order) {
                    return custom ? { ...mapping, forms__Custom_Value__c: value } : { ...mapping, forms__Clarity_Form_Question__c: value }
                }
                return mapping
            })

        });

    }

    return [
        <ViewStyle>
            <View border className="row center-xs middle-xs">
                <View className="col-xs-5">
                    <Box padding='0em'>
                        
                        <h2>Salesforce Field</h2>

                    </Box>
                </View>
                <View className="col-xs-2">
                    <Box padding='0em'>
                        
                    </Box>
                </View>
                <View className="col-xs-5">
                    <Box padding='0em'>
                        
                        <h2>Form Value</h2>

                    </Box>
                </View>
            </View>

            {
                activeFieldMapping.map((field, order) => {

                    return (
                        <View key={order} border space className="row center-xs middle-xs">
                            <View className="col-xs-5">
                                <Box padding='.5em'>
                                    
                                    <FieldSelect order={order} options={activeFields} value={field.forms__Salesforce_Field__c} onChange={setFieldSelection} />

                                </Box>
                            </View>
                            <View className="col-xs-2">
                                <Box padding='.5em'>
                                    &#x2190;
                                </Box>
                            </View>

                            <QuestionFieldSelect 
                                order={order} 
                                options={questionOptions} 
                                customValue={field.forms__Clarity_Form_Question__c != null ? false : true }
                                value={field} 
                                onChange={setQuestionSelection} 
                            />

                        </View>
                    )

                })
            }

            <View border space className="row center-xs middle-xs">
                <View className="col-xs-5">
                    <Box padding='0em'>

                        <Button add onClick={() => addConnectionField()}>Add Connection Field &#x2b;</Button>

                    </Box>
                </View>
            </View>

        </ViewStyle> 
    ]
}

const FieldSelect = ({ order, options, value, onChange }) => {

    return (
        <div className="slds-form-element">
            <div className="slds-form-element__control">
                <div className="slds-select_container">
                <select className="slds-select" id="select-02" value={value} onChange={(e) => onChange(e, order)} >
                    <option value="">Please select</option>
                    {
                        options.map(option => {
                            return <option key={option} value={option}>{option}</option>
                        })
                    }
                </select>
                </div>
            </div>
        </div>
    )

}


const QuestionFieldSelect = ({ customValue, order, options, value, onChange }) => {

    const [custom, setCustom] = useState(customValue);
    
    return [
        <View key={'Custom'} className="col-xs-1">
            <Box padding='.5em'>
                {
                    custom ?  
                    <Button add onClick={() => setCustom(false)}>Form</Button> :
                    <Button add onClick={() => setCustom(true)}>Custom</Button>
                }
            </Box>
        </View>,
        <View key={'Select'} className="col-xs-4">
            <Box padding='.5em'>
                {
                    custom ?  
                    <ButtonInput value={value.forms__Clarity_Form_Question__c ? value.forms__Clarity_Form_Question__c : value.forms__Custom_Value__c} add onChange={(e) => onChange(e, order, true)} /> :
                    <div className="slds-form-element">
                        <div className="slds-form-element__control">
                            <div className="slds-select_container">
                            <select className="slds-select" id="select-02" value={value.forms__Clarity_Form_Question__c ? value.forms__Clarity_Form_Question__c : value.forms__Custom_Value__c} onChange={(e) => onChange(e, order)} >
                                <option value="">Please select</option>
                                {
                                    options.map(option => {
                                        return <option key={option.Id} value={option.Id}>{option.forms__Title__c}</option>
                                    })
                                }
                            </select>
                            </div>
                        </div>
                    </div> 
                }
            </Box>
        </View>
    ]

}