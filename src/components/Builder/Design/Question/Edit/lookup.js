import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import {Select} from '../../../../Elements/Select';
import {ControlGroup} from '../../../../Elements/ControlField';

import { DesignContext, EditContext } from '../../../../Context';

export const Lookup = () => {

    const { additionalFields } = useContext(EditContext);

    const { sObjects, activeQuestion, setActiveQuestion, questions } = useContext(DesignContext);

    const [rows, setRows] = useState([])

    const updateLookupQuestion = (e) => {
        
        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, Lookup__c: value }
        })

    }

    const updatFilter = (e) => {

    }

    return [
        <ViewStyle key="header">

            <h1>Lookup</h1>

                {
                    activeQuestion.Type__c == 'REFERENCE' ? 
                    <Select options={[activeQuestion.Salesforce_Field__c]} value={activeQuestion.Salesforce_Field__c} onChange={updateLookupQuestion} /> :
                    <Select options={sObjects} value={activeQuestion.Lookup__c} onChange={updateLookupQuestion} />
                }
        
        </ViewStyle>,

        <ViewStyle key="Filter">


            <h1>Filter on Lookup</h1>

            <ControlGroup relatedId={activeQuestion.Id} value={activeQuestion.Filter__c} rows={rows} setRows={setRows} setCondition={updatFilter} questions={Object.keys(additionalFields)} filter={true} /> 


        </ViewStyle>
    ]

}