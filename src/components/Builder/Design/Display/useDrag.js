import React, { useEffect, useContext } from 'react';
import LCC from 'lightning-container';

import { types } from '../types';

import {DragDropUpdateContext,  DesignContext } from '../index';

export const useDrag = () => {

    const { addEvent, removeEvent } = useContext(DragDropUpdateContext); 

    const { update, setUpdate, questions, setQuestions } = useContext(DesignContext); 

    const onDragEnd = (setQuestions, result) => {

        const { source, destination } = result;
        
        if (!destination || destination.droppableId == 'new' ) {
            return;
        }
        
        if (source.droppableId === destination.droppableId) {
        
            setQuestions(questions => {

                const items = reorder(
                    questions,
                    source.index,
                    destination.index
                );

                return items; 

            });

        } else {

            setQuestions(questions => {

                const items = move(
                    types,
                    questions,
                    source,
                    destination
                );

                return items; 

            });

        }

        setUpdate(true);

    };

    useEffect(() => {

        addEvent('question', (result) => onDragEnd(setQuestions, result));

        return () => removeEvent('question');

    }, []);

    useEffect(() => {

        if(update) {
            send(questions, setUpdate)
        }

    }, [update]);
    console.log(update);
    return { update, questions };
}

const send = (questions, setUpdate) => {
    LCC.callApex("ClarityFormBuilder.save",
        JSON.stringify(questions),
        (result, e) => resultHandler(result, e, setUpdate),
        { escape: true });
}

const resultHandler = (result, e, setUpdate) => {
    console.log(result, e); 
    setUpdate(false);
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    let sorted = result.map((r, i) => {
        r.order = i;
        return r; 
    });

    sorted = sorted.sort((a, b) => {
        if(a.order < b.order) {
            return -1; 
        }
        if(a.order > b.order) {
            return 1; 
        }
    });

    return sorted;
};

const move = (source, destination, droppableSource, droppableDestination) => {

    const typesClone = Array.from(source);

    let [create] = typesClone.splice(droppableSource.index, 1);

    let orderedQuestion = clean(create, droppableDestination.index);

    destination.splice(droppableDestination.index, 0, orderedQuestion);

    return destination;
};

const clean = (question, index, surveyId) => {
    return {
        title    : question.name, 
        order    : index, 
        type     : question.type
    }
}