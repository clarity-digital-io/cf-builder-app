import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import {Select} from '../../../../Elements/Select';
import {ControlGroup} from '../../../../Elements/ControlField';

import { DesignContext } from '../../../../Context';

export const Lookup = () => {

    const { sObjects, activeQuestion, setActiveQuestion, questions } = useContext(DesignContext);

    const [rows, setRows] = useState([])

    const updateLookupQuestion = (e) => {
        
        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, Lookup__c: value }
        })

    }

    return (
        <ViewStyle>

            <h1>Lookup</h1>

            <ViewStyle>

                <Select options={sObjects} value={activeQuestion.Lookup__c} onChange={updateLookupQuestion} />

            </ViewStyle>

            <ViewStyle>

                <h1>Filter</h1>

                <ControlGroup rows={rows} setRows={setRows} questions={questions} />

            </ViewStyle>

        </ViewStyle>
    )

}