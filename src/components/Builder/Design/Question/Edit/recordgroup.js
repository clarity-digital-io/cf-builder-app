import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import View from '../../../../Elements/View';
import {Button} from '../../../../Elements/Button';

import { DesignContext } from '../../../../Context';
import { Select } from '../../../../Elements/Select';
import { InputField } from '../../../../Elements/Input';

export const RecordGroup = () => {

    const { sObjects, activeQuestion, setActiveQuestion, setSObjectEdit, setQuestionState } = useContext(DesignContext);

    const updateLookupQuestion = (e) => {
        
        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, Record_Group__c: value }
        })

        setSObjectEdit(value);

    }

    return [
        <ViewStyle key={'description'}>

            <h1>Record Group</h1>

            <p>
                Create a new Record for any standard or custom object you chose. (At a minimum Required fields will be displayed).
            </p>

            <Select options={sObjects} value={activeQuestion.Record_Group__c} onChange={updateLookupQuestion} />

        </ViewStyle>,
        <ViewStyle key={'add'}>

            <Button neutral onClick={() => setQuestionState('SF')}>Save &amp; Add Salesforce Fields</Button>

        </ViewStyle>
    ]

}

const ControlInput = ({requiredFields}) => {

    return Object.keys(requiredFields).map(field => {

        return <InputField value={field} onChange={null} />
        
    })

}

const ControlSelect = ({additionalFields}) => {

    return <Select options={Object.keys(additionalFields)} />

}