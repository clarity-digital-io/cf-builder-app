import React, { useState, useContext } from 'react';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';

export const Slider = () => {

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

    const updateMin = (e) => {

        let value = parseInt(e.target.value); 

        if(activeQuestion.Max_Range__c > value) {
            setActiveQuestion(question => {
                return { ...question, Min_Range__c: value }
            })
        }

    }

    const updateMax = (e) => {

        let value = parseInt(e.target.value); 

        if(activeQuestion.Min_Range__c < value) {
            setActiveQuestion(question => {
                return { ...question, Max_Range__c: value }
            })
        }

    }

    const updateStep = (e) => {

        let value = parseInt(e.target.value); 

        if(activeQuestion.Max_Range__c > value) {
            setActiveQuestion(question => {
                return { ...question, Step__c: value }
            })
        }

    }

    return (
        <ViewStyle>
            <h1>Slider Settings</h1>

            <ViewStyle>

            <View className="row">
                <View className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                    <Box padding='0'>

                    <div class="slds-form-element">
                    <label class="slds-form-element__label" for="text-input-id-1">Min Range</label>
                        <div class="slds-form-element__control">
                            <input id="text-input-id-1" onChange={(e) => updateMin(e)} min="0" max={activeQuestion.Max_Range__c - 1} type="number" class="slds-input" value={activeQuestion.Min_Range__c} />
                        </div>
                    </div>

                    </Box>
                </View>
                <View className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                    <Box padding='0'>

                    <div class="slds-form-element">
                    <label class="slds-form-element__label" for="text-input-id-2">Max Range</label>
                        <div class="slds-form-element__control">
                            <input id="text-input-id-2" onChange={(e) => updateMax(e)} min={activeQuestion.Min_Range__c} max="1000" type="number" class="slds-input" value={activeQuestion.Max_Range__c} />
                        </div>
                    </div>

                    </Box>
                </View>

                <View className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                    <Box padding='0'>

                    <div class="slds-form-element">
                    <label class="slds-form-element__label" for="text-input-id-3">Step</label>
                        <div class="slds-form-element__control">
                            <input id="text-input-id-3" onChange={(e) => updateStep(e)} type="number" class="slds-input" value={activeQuestion.Step__c} />
                        </div>
                    </div>

                    </Box>
                </View>

            </View>

            </ViewStyle>

        </ViewStyle>
    )

}