import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import View from '../../../../Elements/View';
import {Button} from '../../../../Elements/Button';
import { call } from '../../../../RemoteActions'; 

import { DesignContext } from '../../../../Context';
import { Select } from '../../../../Elements/Select';
import { InputField } from '../../../../Elements/Input';

export const RecordGroup = () => {

    const { sObjects, activeQuestion, setActiveQuestion, setQuestions, setQuestionState, setQuestionUpdate } = useContext(DesignContext);

    const [disabled, setDisabled] = useState(true);

    const updateLookupQuestion = (e) => {

        if(value != '') {
            setDisabled(false);
        }
        
        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, Salesforce_Object__c: value }
        })

    }

    const saveAndAddFields = () => {

        call(
            "ClarityFormBuilder.saveQuestion", 
            [JSON.stringify(activeQuestion)], 
            (result, e) => resultHandler(result, e, setQuestionUpdate, setQuestions, activeQuestion, setQuestionState)
        );

    }

    return [
        <ViewStyle key={'description'}>

            <h1>Record Group</h1>

            <p>
                Create a new Record for any standard or custom object you chose. (At a minimum Required fields will be displayed).
            </p>

            <Select options={sObjects} value={activeQuestion.Salesforce_Object__c} onChange={updateLookupQuestion} />

        </ViewStyle>,
        <ViewStyle key={'add'}>

            <Button disabled={disabled} neutral onClick={() => saveAndAddFields()}>Save &amp; Add Salesforce Fields</Button>

        </ViewStyle>
    ]

}

const resultHandler = (result, e, setQuestionUpdate, setQuestions, activeQuestion, setQuestionState) => {

    setQuestions(questions => {

        return questions.map(question => {
            if(question.Id == result) {
                return activeQuestion; 
            }

            return question; 

        })

    });

    setQuestionUpdate(false);

    setQuestionState('SF');

}


const ControlInput = ({requiredFields}) => {

    return Object.keys(requiredFields).map(field => {

        return <InputField value={field} onChange={null} />
        
    })

}

const ControlSelect = ({additionalFields}) => {

    return <Select options={Object.keys(additionalFields)} />

}