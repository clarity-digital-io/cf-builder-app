import React, { useState, useEffect, useContext, createContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { call } from '../../RemoteActions';

import DesignLayout from '../../Elements/Layout/design';
import Design from './design';

import { BuilderContext, DragDropUpdateContext, DesignContext } from '../../Context';

/**
 * This provider can be split up into a DragDrop Provider and an Edit Provider
 */

export const DragDrop = () => { 
    
    return (
        <DesignLayout>
            <DragDropUpdateProvider>
                <DesignProvider>
                    <Design />
                </DesignProvider>
            </DragDropUpdateProvider>
        </DesignLayout> 
    )

}

const DragDropUpdateProvider = ({ children }) => {

    const [eventsMap] = useState(() => new Map());

    const addEvent = (event, callback) => {
        eventsMap.set(event, callback)
    }

    const removeEvent = event => {
        eventsMap.delete(event)
    }

    const emitEvent = (event, ...rest) => {
        if (!eventsMap.has(event)) return
        eventsMap.get(event)(...rest)
    }

    const handleDragEnd = result => {
        if (!result.destination) return
        emitEvent(result.destination.droppableId, result)
    }

    return (
        <DragDropUpdateContext.Provider value={{ addEvent, removeEvent }}>
            <DragDropContext onDragEnd={handleDragEnd}>
                { children }
            </DragDropContext>
        </DragDropUpdateContext.Provider>
    )

}

const DesignProvider = ({ children }) => {

    const { form, sObjects } = useContext(BuilderContext);

    const [loading, setLoading] = useState(false); 

    const [activeQuestionOptions, setActiveQuestionOptions] = useState([]); 

    const [activeQuestionRecordFields, setActiveQuestionRecordFields] = useState([]); 

    const [activeQuestionConnectedFields, setActiveQuestionConnectedFields] = useState([]); 

    const [questions, setQuestions] = useState([]); 

    useEffect(() => {

        call("ClarityFormBuilder.getQuestions", [form.Id], (result, e) => fetchHandler(result, e, setQuestions))

    }, [])

    const [activeFlowDesign, setActiveFlowDesign] = useState({}); 

    const [criteria, setCriteria] = useState([]); 

    const [activeQuestion, setActiveQuestion] = useState({}); 

    const [edit, setEdit] = useState(null); 

    useEffect(() => {

        if(edit) {
            
            setAdditionalFields([])
            setRequiredFields([])
            setLoading(true);
            call("ClarityFormBuilder.getQuestionEditDetails", [activeQuestion.Id], (result, e) => optionFetchHandler(result, e, setLoading, setActiveQuestionOptions, setActiveFlowDesign, setCriteria, setActiveQuestionRecordFields, setActiveQuestionConnectedFields))
        
        }

    }, [edit]);

    const [questionState, setQuestionState] = useState('NEW'); 

    const [update, setUpdate] = useState(false); 

    const [questionUpdate, setQuestionUpdate] = useState(false); 

    const [questionToDelete, setQuestionToDelete] = useState(null);

    useEffect(() => {

        if(questionToDelete) {

            let updatedOnDelete = sortDelete(questions.filter(question => question.Id != questionToDelete));
            
            call("ClarityFormBuilder.deleteQuestion", [JSON.stringify(updatedOnDelete), questionToDelete], (result, e) => deleteResultHandler(result, e, setQuestions));
        
        }

    }, [questionToDelete]);

    const [additionalFields, setAdditionalFields] = useState([]);

    const [requiredFields, setRequiredFields] = useState([]);

    const [sObjectEdit, setSObjectEdit] = useState(null);

    useEffect(() => {

        if(sObjectEdit) {

            if(activeQuestion.Type__c == 'ConnectedObject') {
                console.log('form.Connected_Object__c: ' , form.Connected_Object__c); 
                call("ClarityFormBuilder.getSObjectFields", [form.Connected_Object__c], (result, e) => getSObjectFieldResultHandler(result, e, setRequiredFields, setAdditionalFields, setSObjectEdit));

            } else if(activeQuestion.Type__c == 'RecordGroup') {
                console.log('activeQuestion.Record_Group__c: ' , activeQuestion); 
                call("ClarityFormBuilder.getSObjectFields", [activeQuestion.Record_Group__c], (result, e) => getSObjectFieldResultHandler(result, e, setRequiredFields, setAdditionalFields, setSObjectEdit));

            }

        }

    }, [sObjectEdit])

    return (
        <DesignContext.Provider 
            value={{ 
                activeQuestionConnectedFields, 
                setActiveQuestionConnectedFields,
                activeQuestionRecordFields, 
                setActiveQuestionRecordFields,
                additionalFields,
                setAdditionalFields,
                setRequiredFields,
                requiredFields,
                setSObjectEdit,
                criteria, 
                setCriteria,
                sObjects,
                loading,
                activeFlowDesign, 
                setActiveFlowDesign, 
                questionToDelete, 
                setQuestionToDelete, 
                setEdit, 
                activeQuestionOptions, 
                setActiveQuestionOptions, 
                questionUpdate, 
                setQuestionUpdate, 
                questionState, 
                setQuestionState, 
                activeQuestion, 
                setActiveQuestion, 
                update, 
                setUpdate, 
                questions, 
                setQuestions }}>
            { children }
        </DesignContext.Provider>
    )
}

const getSObjectFieldResultHandler = (result, e, setRequiredFields, setAdditionalFields, setSObjectEdit) => {
    setSObjectEdit(false);
    setAdditionalFields(result.NotRequired);
    setRequiredFields(result.Required);
}

const fetchHandler = (result, e, setQuestions) => {
    setQuestions(sort(result));
}

const optionFetchHandler = (result, e, setLoading, setActiveQuestionOptions, setActiveFlowDesign, setCriteria, setActiveQuestionRecordFields, setActiveQuestionConnectedFields) => {
    setActiveQuestionRecordFields(result.Records);
    setActiveQuestionConnectedFields(result.Connected);
    setActiveQuestionOptions(result.Options);
    setCriteria(result.Criteria);
    setActiveFlowDesign(result.FlowDesign[0]);
    setLoading(false);
}

const deleteResultHandler = (result, e, setQuestions) => {
    setQuestions(sort(result));
}

const sort = (result) => {

    return result.sort((a, b) => {
        if(a.Order__c < b.Order__c) {
            return -1; 
        }
        if(a.Order__c > b.Order__c) {
            return 1; 
        }
    });

}

const sortDelete = (result) => {

    let sorted = result.map((r, i) => {
        r.Order__c = i;
        return r; 
    });

    sorted = sorted.sort((a, b) => {
        if(a.Order__c < b.Order__c) {
            return -1; 
        }
        if(a.Order__c > b.Order__c) {
            return 1; 
        }
    });

    return sorted; 

}
