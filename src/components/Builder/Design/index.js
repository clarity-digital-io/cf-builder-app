import React, { useState, useEffect, useContext } from 'react';
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

    const [activeQuestion, setActiveQuestion] = useState({}); 

    const [recordGroup, setRecordGroup] = useState(new Map()); 

    const [questions, setQuestions] = useState([]); 

    useEffect(() => {

        call("ClarityFormBuilder.getQuestions", [form.Id], (result, e) => fetchHandler(result, e, setQuestions, setRecordGroup))

    }, [])

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

    return (
        <DesignContext.Provider 
            value={{ 
                recordGroup, 
                setRecordGroup, 
                questionToDelete, 
                setQuestionToDelete, 
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

const fetchHandler = (result, e, setQuestions, setRecordGroup) => {

    let questions = sorted(result); 

    let cleanQuestions = questions.filter(question => question.Record_Group__c == null);

    let recordGroupQuestions = questions.filter(question => question.Type__c == 'RecordGroup');

    let recordGroups = recordGroupQuestions.reduce((accum, question) => {

        return accum.set(question.Id, questions.filter(q => q.Record_Group__c == question.Id))

    }, new Map());

    setQuestions(cleanQuestions);

    setRecordGroup(recordGroups); 

}

const deleteResultHandler = (result, e, setQuestions) => {
    setQuestions(sort(result));
}

const sorted = (questions) => {

    let result = questions.sort((a, b) => {
        if(a.Order__c < b.Order__c) {
            return -1; 
        }
        if(a.Order__c > b.Order__c) {
            return 1; 
        }
    });

    return result; 

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
