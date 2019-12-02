import React, { useContext, useState } from 'react';
import { call } from '../../../RemoteActions'; 

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button, ButtonInput} from '../../../Elements/Button';
import { SmallSpinner } from '../../../Elements/Spinner';

import { BuilderContext, DesignContext } from '../../../Context';

const combineQuestions = (questions, recordGroup) => {

    let filteredQuestions = questions.filter(question => (question.Type__c != 'FreeText' && question.Type__c != 'RecordGroup' && question.Type__c != 'PictureChoice'));

    let rcQuestions =  Array.from(recordGroup.values()).reduce((accum, qs, index) => {
        console.log('qs', accum, qs);
        return accum.concat(qs.map(q => q)); 

    }, []);

    console.log('rcQuestions', rcQuestions); 

    return filteredQuestions.concat(rcQuestions); 
}

export const PreFillState = () => {

    const { questions, recordGroup } = useContext(DesignContext);

    const { activeFieldPrefills, setActiveFieldPrefills, activeConnection, activeFields } = useContext(BuilderContext);

    const [questionOptions, setQuestionOptions] = useState(combineQuestions(questions, recordGroup));

    const addConnectionField = () => {
        setActiveFieldPrefills((mappings) => {
            return mappings.concat([{ Clarity_Form_Connection__c: activeConnection.Id, Salesforce_Field__c: '', Clarity_Form_Question__c: '', PreFill__c: true }])
        })
    }

    const setFieldSelection = (e, order) => {

        let value = e.target.value; 

        setActiveFieldPrefills((mappings) => {
            //same field as used record group fields must replace to be able to prefill record group fields
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

        setActiveFieldPrefills((mappings) => {

            return mappings.map((mapping, i) => {
                if(i == order) {
                    return { ...mapping, Clarity_Form_Question__c: value }
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
                        
                        <h2>Form Value</h2>

                    </Box>
                </View>
                <View className="col-xs-2">
                    <Box padding='0em'>
                        
                    </Box>
                </View>
                <View className="col-xs-5">
                    <Box padding='0em'>
                        
                        <h2>Salesforce Field</h2>

                    </Box>
                </View>
            </View>

            {
                activeFieldPrefills.map((field, order) => {

                    return (
                        <View key={order} border space className="row center-xs middle-xs">

                            <QuestionFieldSelect 
                                order={order} 
                                options={questionOptions} 
                                value={field} 
                                onChange={setQuestionSelection} 
                            />

                            <View className="col-xs-2">
                                <Box padding='.5em'>
                                    &#x2190;
                                </Box>
                            </View>

                            <View className="col-xs-5">
                                <Box padding='.5em'>
                                    
                                    <FieldSelect order={order} options={activeFields} value={field.Salesforce_Field__c} onChange={setFieldSelection} />

                                </Box>
                            </View>

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


const QuestionFieldSelect = ({ order, options, value, onChange }) => {
    console.log('options', options); 
    return (
        <View key={'Select'} className="col-xs-5">
            <Box padding='.5em'>
                <div className="slds-form-element">
                    <div className="slds-form-element__control">
                        <div className="slds-select_container">
                        <select className="slds-select" id="select-02" value={value.Clarity_Form_Question__c ? value.Clarity_Form_Question__c : value.Custom_Value__c} onChange={(e) => onChange(e, order)} >
                            <option value="">Please select</option>
                            {
                                options.map(option => {

                                    return <option key={option.Id} value={option.Id}>
                                        {
                                            option.Record_Group__c != null ? 
                                            'Record Group: ' + option.Title__c + ' (' + option.Salesforce_Field__c + ')' :
                                            option.Title__c
                                        }
                                    </option>
                                
                                })
                            }
                        </select>
                        </div>
                    </div>
                </div> 
            </Box>
        </View>
    )

}