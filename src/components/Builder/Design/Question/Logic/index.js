import React, { useContext } from 'react';
import { DesignContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';

import Box from '../../../../Elements/Box';

export const LogicQuestion = () => {

    const { criteria, activeQuestion, questions } = useContext(DesignContext); 

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
                            <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                <h2>Question</h2>
                            </View>
                            <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                <h2>Operator</h2>
                            </View>
                            <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                <h2>Type</h2>
                            </View>
                            <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                <h2>Value</h2>
                            </View>
                        </View>

                        {
                            criteria.map(logic => {
                                return (
                                    <View className="row middle-xs">
                                        <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                            <span>{ logic.Field__c }</span>
                                            {
                                                questions.filter(question => question.Title__c != activeQuestion.Title__c).map(question => {
                                                    return <div>{question.Title__c}</div>
                                                })
                                            }
                                        </View>
                                        <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                            <span>{ logic.Operator__c }</span>
                                            {
                                                ['Equals', 'Greater than', 'Less than', 'Is null'].map(operator => {
                                                    return <div>{operator}</div>
                                                })
                                            }
                                        </View>
                                        <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                            <span>{ logic.Type__c }</span>
                                            {
                                                ['Reference', 'String', 'Global Constant'].map(type => {
                                                    return <div>{type}</div>
                                                })
                                            }
                                        </View>
                                        <View className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                            <span>{ logic.Value__c }</span>
                                        </View>
                                    </View>
                                )
                            })
                        }

                        {/* {
                            loading ? 'Loading' : getQuestionType(activeQuestion.Type__c) 
                        } */}

                    </ViewStyle>
                </Box>  
            </View>
        </View>
    )
}
