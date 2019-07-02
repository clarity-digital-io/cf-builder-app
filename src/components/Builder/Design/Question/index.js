import React, { useState, useEffect } from 'react';

import { call } from '../../../RemoteActions'; 

import { EditContext } from '../../../Context';

export const EditProvider = ({ children }) => {

    const [activeRecordGroup, setActiveRecordGroup] = useState([]); 

    /*
     * Moved over from Design Context
    */
    const [loading, setLoading] = useState(false); 

    /*
     * Moved over from Design Context
    */
    const [activeQuestionOptions, setActiveQuestionOptions] = useState([]); 

    /*
     * Moved over from Design Context
    */
    const [activeQuestionConnectedFields, setActiveQuestionConnectedFields] = useState([]); 

    /*
     * Moved over from Design Context
    */
   const [activeFlowDesign, setActiveFlowDesign] = useState({}); 

    /*
    * Moved over from Design Context
    */
    const [criteria, setCriteria] = useState([]); 

    /*
    * Moved over from Design Context
    */
    const [edit, setEdit] = useState(null); 

    useEffect(() => {

        if(edit) {
            
            setAdditionalFields([])
            setRequiredFields([])
            setLoading(true);
            call("ClarityFormBuilder.getQuestionEditDetails", [activeQuestion.Id], (result, e) => optionFetchHandler(result, e, setLoading, setActiveQuestionOptions, setActiveFlowDesign, setCriteria))
        
        }

    }, [edit]);

    /*
     * Moved over from Design Context
    */
   const [additionalFields, setAdditionalFields] = useState([]);

   /*
    * Moved over from Design Context
   */
   const [requiredFields, setRequiredFields] = useState([]);

   /*
    * Moved over from Design Context
   */
   const [sObjectEdit, setSObjectEdit] = useState(null);

   useEffect(() => {

       if(sObjectEdit) {

           if(activeQuestion.Type__c == 'ConnectedObject') {
               setLoading(true);
               call("ClarityFormBuilder.getSObjectFields", [form.Connected_Object__c], (result, e) => getSObjectFieldResultHandler(result, e, setRequiredFields, setAdditionalFields, setSObjectEdit, setLoading));

           }
           
           if(activeQuestion.Type__c == 'RecordGroup') {
               setLoading(true); 
               console.log('activeQuestion.Type__c', activeQuestion, loading); 
               call("ClarityFormBuilder.getSObjectFields", [activeQuestion.Salesforce_Object__c], (result, e) => getSObjectFieldResultHandler(result, e, setRequiredFields, setAdditionalFields, setSObjectEdit, setLoading));
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
    setActiveQuestionOptions(result.Options);
    setCriteria(result.Criteria);
    setActiveFlowDesign(result.FlowDesign[0]);
    setLoading(false);
}

const getSObjectFieldResultHandler = (result, e, setRequiredFields, setAdditionalFields, setSObjectEdit, setLoading) => {
    setSObjectEdit('');
    setAdditionalFields(result.NotRequired);
    setRequiredFields(result.Required);
    setLoading(false);
}
