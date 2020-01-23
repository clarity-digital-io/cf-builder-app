import React, { useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';
import { Slider } from '../../../../Elements/Slider';

export const Attachments = () => {

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

    const handleMaxLengthUpdate = (value) => {

        setActiveQuestion(question => {
            return { ...question, forms__Max_Length__c: value }
        })

    }

    return (
        <ViewStyle>
            <h1>Attachment Settings</h1>

            <ViewStyle>

                <p>Maximum characters accepted.</p>

    <           Slider min={0} max={10} defaultValue={activeQuestion.forms__Max_Length__c} onChange={(e) => handleMaxLengthUpdate(e)}  />

            </ViewStyle>

        </ViewStyle>
    )

}