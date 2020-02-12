import React, { useState, useEffect, useContext } from 'react';

import { call } from '../../../RemoteActions'; 

import { EditContext, DesignContext } from '../../../Context';

export const EditProvider = ({ children }) => {

    const { navQuestion, activeQuestion } = useContext(DesignContext);

    const [activeRecordGroup, setActiveRecordGroup] = useState([]); 

    const [loading, setLoading] = useState(false); 

    const [activeQuestionOptions, setActiveQuestionOptions] = useState([]); 

    const [activeQuestionConnectedFields, setActiveQuestionConnectedFields] = useState([]); 

    const [activeFlowDesign, setActiveFlowDesign] = useState({}); 

    const [criteria, setCriteria] = useState([]); 

    const [edit, setEdit] = useState(null); 

    useEffect(() => {

        if(navQuestion) {
            
            setAdditionalFields([])
            setRequiredFields([])
            setLoading(true);

            call("ClarityFormBuilder.getQuestionEditDetails", [navQuestion], (result, e) => optionFetchHandler(result, e, setLoading, setActiveQuestionOptions, setActiveFlowDesign, setCriteria));
        
        }

    }, [navQuestion]);

    const [additionalFields, setAdditionalFields] = useState([]);

    const [requiredFields, setRequiredFields] = useState([]);

    const [sObjectEdit, setSObjectEdit] = useState(null);

    useEffect(() => {

        if(sObjectEdit) {

            if(activeQuestion.forms__Type__c == 'ConnectedObject') {
                setLoading(true);
                call("ClarityFormBuilder.getSObjectFields", [sObjectEdit], (result, e) => getSObjectFieldResultHandler(result, e, activeQuestion, setRequiredFields, setAdditionalFields, setSObjectEdit, setActiveRecordGroup, setLoading));

            }
            
            if(activeQuestion.forms__Type__c == 'RecordGroup') {
                setLoading(true); 
                call("ClarityFormBuilder.getSObjectFields", [activeQuestion.forms__Salesforce_Object__c], (result, e) => getSObjectFieldResultHandler(result, e, activeQuestion, setRequiredFields, setAdditionalFields, setSObjectEdit, setActiveRecordGroup, setLoading));
            }

        }

    }, [sObjectEdit])

    return (
        <EditContext.Provider value={{ 
            activeRecordGroup, 
            setActiveRecordGroup,
            loading, 
            setLoading,
            activeQuestionOptions, 
            setActiveQuestionOptions, 
            activeQuestionConnectedFields, 
            setActiveQuestionConnectedFields, 
            activeFlowDesign, 
            setActiveFlowDesign, 
            criteria, 
            setCriteria, 
            edit, 
            setEdit, 
            additionalFields, 
            setAdditionalFields, 
            requiredFields, 
            setRequiredFields, 
            sObjectEdit, 
            setSObjectEdit
        }}>
            { children }
        </EditContext.Provider>
    )
    
}

const optionFetchHandler = (result, e, setLoading, setActiveQuestionOptions, setActiveFlowDesign, setCriteria) => {
		console.log('result.Options', result.Options); 
    setActiveQuestionOptions(result.Options);
    setCriteria(result.Criteria);
    setActiveFlowDesign(result.FlowDesign[0]);
    setLoading(false);
}

const getSObjectFieldResultHandler = (result, e, activeQuestion, setRequiredFields, setAdditionalFields, setSObjectEdit, setActiveRecordGroup, setLoading) => {

    setSObjectEdit('');
    setAdditionalFields(result.NotRequired);
    setRequiredFields(result.Required);

    setActiveRecordGroup(records => {   

        return Object.keys(result.Required).map((field, index) => {

            let val = result.Required[field];

            let fieldType = Object.keys(val)[0];

            return { forms__Clarity_Form__c: activeQuestion.forms__Clarity_Form__c, forms__Logic__c: 'AND', forms__Type__c: fieldType, forms__Title__c: field, forms__Salesforce_Field__c: field, forms__Record_Group__c: activeQuestion.Id, forms__Order__c: index, forms__Page__c: 0, forms__RG_Required__c: true }

        });

    })


    setLoading(false);
}
