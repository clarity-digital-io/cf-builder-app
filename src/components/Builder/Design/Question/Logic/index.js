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
                                <h2>Question</h2>
                            </View>
                            <View className="col-xs-12 col-sm-6 col-md-2 col-lg-2">
                                <h2>Operator</h2>
                            </View>
                            <View className="col-xs-12 col-sm-6 col-md-2 col-lg-2">
                                <h2>Type</h2>
                            </View>
                            <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                <h2>Value</h2>
                            </View>
                        </View>

                        <View className="row middle-xs">
                            <View className="col-xs-12 col-sm-12 col-md-1 col-lg-1">
                                1
                            </View>
                            <View className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                                <Select options={ questionOptions } />
                            </View>
                            <View className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                                <Select options={ operators } />
                            </View>
                            <View className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                                <Select options={ types } />
                            </View>
                            <View className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                <div className="slds-form-element">
                                    <div className="slds-form-element__control">
                                        <input onChange={(e) => updateLogic(e)} type="text" id="text-input-id-1" placeholder="Value" className="slds-input" />
                                    </div>
                                </div>
                            </View>
                        </View>

                    </ViewStyle>
                </Box>  
            </View>
        </View>
    )
}
