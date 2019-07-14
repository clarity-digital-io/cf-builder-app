import React, { useContext, useState, useEffect } from 'react';
import { call } from '../../../RemoteActions'; 

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button, ButtonInput} from '../../../Elements/Button';
import { SmallSpinner } from '../../../Elements/Spinner';

import { BuilderContext, DesignContext } from '../../../Context';

export const MappingState = () => {

    const { questions } = useContext(DesignContext);

    const { loading, connections, navState, setNavState, activeFieldMapping, setActiveFieldMapping, activeConnection, activeFields } = useContext(BuilderContext);

    const [questionOptions, setQuestionOptions] = useState(
        questions.filter(question => (question.Type__c != 'Text' && question.Type__c != 'RecordGroup' && question.Type__c != 'PictureChoice'))
    )

    const [update, setUpdate] = useState(false);

    useEffect(() => {

        if(update) {
            call(
                "ClarityFormBuilder.saveActiveFieldConnections", 
                [JSON.stringify(activeFieldMapping), activeConnection.Id], 
                (result, e) => fieldConnectionsResultHandler(result, e, setActiveFieldMapping, setUpdate)
            );
        }
        
    }, [update]);


    const addConnectionField = () => {
        setActiveFieldMapping((mappings) => {
            return mappings.concat([{ Clarity_Form_Connection__c: activeConnection.Id, Salesforce_Field__c: '', Clarity_Form_Question__c: '' }])
        })
    }

    const setFieldSelection = (e, order) => {

        let value = e.target.value; 

        setActiveFieldMapping((mappings) => {

            return mappings.map((mapping, i) => {
                if(i == order) {
                    return { ...mapping, Salesforce_Field__c: value }
                }
                return mapping
            })

        });
    }
    
    const setQuestionSelection = (e, order, custom) => {

        let value = e.target.value; 
        console.log(value, order, custom)
        setActiveFieldMapping((mappings) => {

            return mappings.map((mapping, i) => {
                if(i == order) {
                    return custom ? { ...mapping, Custom_Value__c: value } : { ...mapping, Clarity_Form_Question__c: value }
                }
                return mapping
            })

        });

    }

    return [

        <View white body className="row" key={'Body'}>
            <View className="col-xs-12">
                <Box padding='0'>

                    <ViewStyle space border>
                    
                        <h1>Connection Fields: { activeConnection.Salesforce_Object__c }</h1>

                        <p>Map question values from a Clarity Form Response to a selected Salesforce Object.</p>

                    </ViewStyle>

                    {
                        loading ? 
                        <SmallSpinner /> :
                        <ViewStyle>
                            <View border className="row center-xs middle-xs">
                                <View className="col-xs-5">
                                    <Box padding='.5em'>
                                        
                                        <h2>Salesforce Field</h2>

                                    </Box>
                                </View>
                                <View className="col-xs-2">
                                    <Box padding='.5em'>
                                        
                                    </Box>
                                </View>
                                <View className="col-xs-5">
                                    <Box padding='.5em'>
                                        
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
                                                    
                                                    <FieldSelect order={order} options={activeFields} value={field.Salesforce_Field__c} onChange={setFieldSelection} />

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
                                                customValue={field.Clarity_Form_Question__c != null ? false : true }
                                                value={field} 
                                                onChange={setQuestionSelection} 
                                            />

                                        </View>
                                    )

                                })
                            }

                            <View border space className="row center-xs middle-xs">
                                <View className="col-xs-5">
                                    <Box padding='.5em'>

                                        {
                                            update ? 
                                            <SmallSpinner /> :
                                            <Button add onClick={() => addConnectionField()}>Add Connection Field &#x2b;</Button>
                                        }
                                    </Box>
                                </View>
                            </View>

                        </ViewStyle> 
                    }

                    <ViewStyle>
                        <View className="row middle-xs">
                            <View className="col-xs-8">
                                <Box padding='.5em'>

                                    <h1>Record Id stored as { `{Connection_${activeConnection.Salesforce_Object__c}}` }</h1>

                                    <p>Record Id can be used in subsequent Connections, by selecting 'Custom' and adding the variable Record Id: { `{Connection_${activeConnection.Salesforce_Object__c}}` }. &#128526;</p>

                                </Box>
                            </View>
                        </View>
                    </ViewStyle>

                </Box>
            </View>
        </View>,

        <View footer className="row middle-xs end-xs" key={'Header'}>
            <View className="col-xs-12">
                <ViewStyle middle>

                    {
                        navState == 'MAPPING' ? 
                            <Button neutral onClick={() => setNavState('CONNECT')}>Back</Button> : 
                            null
                    }

                    <Button cta onClick={() => setUpdate(true)}>
                        Save Changes
                    </Button>
                </ViewStyle>
            </View>
        </View>

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
                    <ButtonInput value={value.Clarity_Form_Question__c ? value.Clarity_Form_Question__c : value.Custom_Value__c} add onChange={(e) => onChange(e, order, true)} /> :
                    <div className="slds-form-element">
                        <div className="slds-form-element__control">
                            <div className="slds-select_container">
                            <select className="slds-select" id="select-02" value={value.Clarity_Form_Question__c ? value.Clarity_Form_Question__c : value.Custom_Value__c} onChange={(e) => onChange(e, order)} >
                                <option value="">Please select</option>
                                {
                                    options.map(option => {
                                        return <option key={option.Id} value={option.Id}>{option.Title__c}</option>
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

const fieldConnectionsResultHandler = (result, e, setActiveFieldMapping, setUpdate) => {
    setActiveFieldMapping(result); 
    setUpdate(false);
}