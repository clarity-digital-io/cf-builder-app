import React, { useContext } from 'react';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';
import { InputNumber } from '../../../../Elements/Input';

export const Slider = () => {

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

    const updateMin = (v) => {

        let value = parseInt(v); 

        if(activeQuestion.Max_Range__c > value) {
            setActiveQuestion(question => {
                return { ...question, Min_Range__c: value }
            })
        }

    }

    const updateMax = (v) => {

        let value = parseInt(v); 

        if(activeQuestion.Min_Range__c < value) {
            setActiveQuestion(question => {
                return { ...question, Max_Range__c: value }
            })
        }

    }

    const updateStep = (v) => {

        let value = parseInt(v); 

        if(activeQuestion.Max_Range__c > value) {
            setActiveQuestion(question => {
                return { ...question, Step__c: value }
            })
        }

    }

    return (
        <ViewStyle>
            <h1>Slider Settings</h1>

            <p>Control minimum number, maximum number, and step size of the slider.</p>
            
            <ViewStyle>

            <View className="row">
                <View className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                    <Box padding='0'>

                        <h2>Min.</h2>


                        <InputNumber min={0} max={activeQuestion.Max_Range__c - 1} onChange={(e) => updateMin(e)} value={ activeQuestion.Min_Range__c } />

                    </Box>
                </View>
                <View className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                    <Box padding='0'>

                        <h2>Max</h2>

                        <InputNumber min={activeQuestion.Min_Range__c} onChange={(e) => updateMax(e)} value={ activeQuestion.Max_Range__c } />

                    </Box>
                </View>

                <View className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                    <Box padding='0'>

                        <h2>Step</h2>

                        <InputNumber onChange={(e) => updateStep(e)} value={ activeQuestion.Step__c } />

                    </Box>
                </View>

            </View>

            </ViewStyle>

        </ViewStyle>
    )

}