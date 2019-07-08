import React, { useContext, useState } from 'react';

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';

import { BuilderContext, DesignContext } from '../../../Context';
import { Select } from '../../../Elements/Select';

export const MappingState = () => {

    const { questions } = useContext(DesignContext);

    const { navState, setNavState, activeFieldMapping, setActiveFieldMapping } = useContext(BuilderContext);

    const [questionOptions, setQuestionOptions] = useState(
        questions.filter(question => (question.Type__c != 'Text' && question.Type__c != 'PageBreak'))
    )
    
    const setQuestionSelection = () => {

    }

    return [

        <View silver body className="row" key={'Body'}>
            <View className="col-xs-12">
                <Box padding='0'>

                    <ViewStyle space border>
                    
                        <h1>Connection Fields: Account</h1>

                        <p>Map question values from a Clarity Form Response to a selected Salesforce Object.</p>

                    </ViewStyle>

                    <ViewStyle>
                        <View border className="row center-xs middle-xs">
                            <View className="col-xs-5">
                                <Box padding='.5em'>
                                    
                                    <h2>Clarity Form Question</h2>

                                </Box>
                            </View>
                            <View className="col-xs-2">
                                <Box padding='.5em'>
                                    
                                </Box>
                            </View>
                            <View className="col-xs-5">
                                <Box padding='.5em'>
                                    
                                    <h2>Salesforce Field</h2>

                                </Box>
                            </View>
                        </View>

                        {
                            activeFieldMapping.map((field, order) => {

                                return (
                                    <View key={field.Id} border space className="row center-xs middle-xs">
                                        <View className="col-xs-5">
                                            <Box padding='.5em'>
                                                
                                                <FieldSelect order={order} options={questionOptions} value={field.Clarity_Form_Question__c} onChange={setQuestionSelection} />

                                            </Box>
                                        </View>
                                        <View className="col-xs-2">
                                            <Box padding='.5em'>
                                                &#x2192;
                                            </Box>
                                        </View>
                                        <View className="col-xs-5">
                                            <Box padding='.5em'>
                                                
                                                <FieldSelect order={order} options={[]} value={field.Salesforce_Field__c} onChange={() => console.log()} />

                                            </Box>
                                        </View>
                                    </View>
                                )

                            })
                        }

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

const FieldSelect = ({ order, options, value, setSelection }) => {

    return (
        <div class="slds-form-element">
            <div class="slds-form-element__control">
                <div class="slds-select_container">
                <select class="slds-select" id="select-02" value={value} onChange={(e) => setSelection(e, order)} >
                    <option value="">Please select</option>
                    {
                        options.map(option => {
                            return <option value={option.Id}>{option.Title__c}</option>
                        })
                    }
                </select>
                </div>
            </div>
        </div>
    )

}