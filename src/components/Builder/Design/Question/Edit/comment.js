import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';
import { Slider } from '../../../../Elements/Slider';

export const Comment = () => {

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext);
    console.log('activeQuestion', activeQuestion);
    const handleMaxLengthUpdate = (value) => {

        setActiveQuestion(question => {
            return { ...question, Max_Length__c: value }
        })

    }

    return (
        <ViewStyle>
            <h1>Comment Settings</h1>

            <ViewStyle>

                <Slider min={0} max={1000} defaultValue={activeQuestion.Max_Length__c} onChange={(e) => handleMaxLengthUpdate(e)}  />

            </ViewStyle>

        </ViewStyle>
    )

}