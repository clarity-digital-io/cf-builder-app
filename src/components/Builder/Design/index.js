import React, { useState, useEffect, useContext, createContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { call } from '../../RemoteActions';

import DesignLayout from '../../Elements/Layout/design';
import Design from './design';

import { BuilderContext, DragDropUpdateContext, DesignContext } from '../../Context';

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

    const { form } = useContext(BuilderContext);

    const [activeQuestionOptions, setActiveQuestionOptions] = useState([]); 

    const [questions, setQuestions] = useState([]); 

    useEffect(() => {

        if(form.State == 'EDIT') {
            call("ClarityFormBuilder.getQuestions", [form.Id], (result, e) => fetchHandler(result, e, setQuestions))
        }

    }, [])

    const [activeQuestion, setActiveQuestion] = useState({}); 

    const [edit, setEdit] = useState(null); 

    useEffect(() => {

        if(edit) {
            console.log(edit);
            call("ClarityFormBuilder.getQuestionOptions", [activeQuestion.Id], (result, e) => optionFetchHandler(result, e, setActiveQuestionOptions))
        }

    }, [edit]);

    const [questionState, setQuestionState] = useState('NEW'); 

    const [update, setUpdate] = useState(false); 

    const [questionUpdate, setQuestionUpdate] = useState(false); 

    return (
        <DesignContext.Provider value={{ setEdit, activeQuestionOptions, setActiveQuestionOptions, questionUpdate, setQuestionUpdate, questionState, setQuestionState, activeQuestion, setActiveQuestion, update, setUpdate, questions, setQuestions }}>
            { children }
        </DesignContext.Provider>
    )
}

const fetchHandler = (result, e, setQuestions) => {
    setQuestions(sort(result));
}

const optionFetchHandler = (result, e, setActiveQuestionOptions) => {
    console.log(result);
    setActiveQuestionOptions(result);
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
