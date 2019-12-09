import { useEffect, useContext } from 'react';

import { sortedTypes } from '../types';

import { BuilderContext, DragDropUpdateContext, DesignContext } from '../../../Context';

export const useDrag = () => {

    const { addEvent, removeEvent } = useContext(DragDropUpdateContext); 

    const { form } = useContext(BuilderContext); 

    const { setUpdateSingle, setUpdate, questions, setQuestions } = useContext(DesignContext); 

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
                    sortedTypes,
                    questions,
                    source,
                    destination, 
                    form.Id
                );

                return items; 

            });

        }

        setUpdateSingle(true);
        setUpdate(true);

    };

    useEffect(() => {

        addEvent('question', (result) => onDragEnd(setQuestions, result));

        return () => removeEvent('question');

    }, [questions]);

    return { questions };
    
}

const reorder = (list, startIndex, endIndex) => {

    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return sort(result);
    
};

const sort = (result) => {

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

const move = (source, destination, droppableSource, droppableDestination, formId, page) => {

    const typesClone = Array.from(source);

    let [create] = typesClone.splice(droppableSource.index, 1);

    let orderedQuestion = clean(create, droppableDestination.index, formId, page);

    destination.splice(droppableDestination.index, 0, orderedQuestion);

    return sort(destination);

};

const clean = (question, index, formId, page) => {
    return {
        Title__c        : question.name, 
        Order__c        : index, 
        Type__c         : question.type,
        Clarity_Form__c : formId,
        Required__c     : false, 
        Max_Length__c   : 10, 
        Min_Range__c    : 0, 
        Max_Range__c    : 100, 
        Step__c         : 10, 
        Page__c         : page != null ? page : 0,
        FreeText_Type__c: question.FreeText_Type__c || 'Header'
    }
}