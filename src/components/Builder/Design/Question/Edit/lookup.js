import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import {Select} from '../../../../Elements/Select';
import {ControlGroup} from '../../../../Elements/ControlField';

import { DesignContext, EditContext } from '../../../../Context';

export const Lookup = () => {

    const { additionalFields } = useContext(EditContext);

    const { sObjects, activeQuestion, setActiveQuestion, questions } = useContext(DesignContext);

    const [rows, setRows] = useState([])

    const updateLookupQuestion = (value) => {

        setActiveQuestion(question => {
            return { ...question, forms__Lookup__c: value }
        })

    }

    const updatFilter = (e) => {

    }

    return [
        <ViewStyle key="header">

            <h1>Lookup</h1>

                {
                    activeQuestion.forms__Type__c == 'REFERENCE' ? 
                    <Select options={[activeQuestion.forms__Salesforce_Field__c]} value={activeQuestion.forms__Salesforce_Field__c} onChange={updateLookupQuestion} /> :
                    <Select options={sObjects} value={activeQuestion.forms__Lookup__c} onChange={updateLookupQuestion} />
                }
        
        </ViewStyle>
    ]

}