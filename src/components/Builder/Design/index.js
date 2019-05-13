import React, { useState, useEffect, createContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import DesignLayout from '../../Elements/Layout/design';
import Design from './design';

import { DragDropUpdateContext,  DesignContext } from '../../Context';

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
    
    const [update, setUpdate] = useState(false); 

    const [questions, setQuestions] = useState([]); 

    const [activeQuestion, setActiveQuestion] = useState([]); 

    return (
        <DesignContext.Provider value={{ update, setUpdate, activeQuestion, setActiveQuestion, questions, setQuestions }}>
            { children }
        </DesignContext.Provider>
    )
}
