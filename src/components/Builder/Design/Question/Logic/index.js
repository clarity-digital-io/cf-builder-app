import React, { useContext, useState } from 'react';
import { DesignContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';

import Box from '../../../../Elements/Box';
import { Select } from './select'; 

import { operators, types } from './logic'; 

export const LogicQuestion = () => {

    const { criteria, activeQuestion, questions } = useContext(DesignContext); 

    const [questionOptions, setQuestionOptions] = useState(
        questions.filter(question => question.Title__c != activeQuestion.Title__c).map(question => question.Title__c)
    )
    return (
        <View className="row middle-xs">
            <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Box>

                    <ViewStyle space border>

                        <h1>Question</h1>

                        <ViewStyle>
                            
                            <p>{activeQuestion.Title__c}</p>

                        </ViewStyle>
                        
                    </ViewStyle>

                    <ViewStyle space border scroll>
                    
                        <h1>Set Conditions</h1>

                        <View className="row middle-xs">
                            <View className="col-xs-12 col-sm-6 col-md-1 col-lg-1">
                            </View>
                            <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                <Box padding='.5em'><h2>Question</h2></Box>     
                            </View>
                            <View className="col-xs-12 col-sm-6 col-md-2 col-lg-2">
                                <Box padding='.5em'><h2>Operator</h2></Box>
                            </View>
                            <View className="col-xs-12 col-sm-6 col-md-2 col-lg-2">
                                <Box padding='.5em'><h2>Type</h2></Box>
                            </View>
                            <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                <Box padding='.5em'><h2>Value</h2></Box>
                            </View>
                        </View>

                        <View className="row middle-xs">
                            <View className="col-xs-12 col-sm-12 col-md-1 col-lg-1">
                                <Box padding='.5em'>4</Box>
                            </View>
                            <View className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                                <Box padding='.5em'><Select options={ questionOptions } /></Box>
                            </View>
                            <View className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                                <Box padding='.5em'><Select options={ operators } /></Box>
                            </View>
                            <View className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                                <Box padding='.5em'><Select options={ types } /></Box>
                            </View>
                            <View className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                <Box padding='.5em'>
                                <div className="slds-form-element">
                                    <div className="slds-form-element__control">
                                        <input onChange={(e) => updateLogic(e)} type="text" id="text-input-id-1" placeholder="Value" className="slds-input" />
                                    </div>
                                </div>
                                </Box>
                            </View>
                        </View>

                    </ViewStyle>
                </Box>  
            </View>
        </View>
    )
}
