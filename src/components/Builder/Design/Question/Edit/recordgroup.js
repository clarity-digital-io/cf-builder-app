import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import View from '../../../../Elements/View';
import {Button} from '../../../../Elements/Button';
import { call } from '../../../../RemoteActions'; 

import { DesignContext, BuilderContext } from '../../../../Context';
import { Select } from '../../../../Elements/Select';
import { StatusHandler } from '../../../../Elements/Notification';

export const RecordGroup = () => {
    
    const { form } = useContext(BuilderContext); 

    const { sObjects, activeQuestion, setActiveQuestion, setQuestions, setQuestionState, setQuestionUpdate } = useContext(DesignContext);

    const updateLookupQuestion = (value) => {

        setActiveQuestion(question => {
            return { ...question, forms__Salesforce_Object__c: value }
        })

    }

    const saveAndAddFields = () => {

        StatusHandler(
            form.forms__Status__c,
            () => setQuestionUpdate(false),
            () => call(
                "ClarityFormBuilder.saveQuestion", 
                [JSON.stringify(activeQuestion)], 
                (result, e) => resultHandler(result, e, setQuestionUpdate, setQuestions, activeQuestion, setQuestionState),
            )
        )

    }

    return [
        <ViewStyle key={'description'}>

            <h1>Record Group</h1>

            <p>
                Create a new Record for any standard or custom object you chose. (At a minimum Required fields will be displayed).
            </p>

            <Select options={sObjects} value={activeQuestion.forms__Salesforce_Object__c} onChange={(e) => updateLookupQuestion(e)} />

        </ViewStyle>,
        <ViewStyle key={'add'}>

            <Button 
                disabled={(activeQuestion.forms__alesforce_Object__c == '' || activeQuestion.forms__Salesforce_Object__c == null) ? true : false} 
                cta 
                onClick={() => saveAndAddFields()}>
                Save &amp; Add Salesforce Fields
            </Button>

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
