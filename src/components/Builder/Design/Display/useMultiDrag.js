import { useEffect, useContext } from 'react';

import { sortedTypes } from '../types';

import { BuilderContext, DragDropUpdateContext, DesignContext } from '../../../Context';

export const useMultiDrag = () => {

    const { addEvent, removeEvent } = useContext(DragDropUpdateContext); 

    const { form } = useContext(BuilderContext); 

    const { setDeletePage, setUpdateMulti, setUpdate, pageQuestions, setPageQuestions, addPageUpdate } = useContext(DesignContext); 

    useEffect(() => {

        pageQuestions.forEach((values, key) => {

            addEvent('' + key, (result) => onDragEndMulti(setPageQuestions, result));

        });

    }, [addPageUpdate]);

    const onDragEndMulti = (setPageQuestions, result) => {

        const { source, destination } = result;

        if (!destination || destination.droppableId == 'new' ) {
            return;
        }

        let destinationDropId = parseInt(destination.droppableId); 

        if (source.droppableId === destination.droppableId) {
        
            setPageQuestions(pQ => {

                if(pQ.has(destinationDropId)) {

                    let values = pQ.get(destinationDropId);

                    const items = reorder(
                        values,
                        source.index,
                        destination.index
                    );

                    pQ.set(destinationDropId, items); 
 
                }

                return pQ;

            });


        } else if (source.droppableId != 'new') {

            let sourceDropId = parseInt(source.droppableId);
            let sourceIndex = source.index;

            setPageQuestions(pQ => {

                if(pQ.has(sourceDropId) && pQ.has(destinationDropId)) {

                    let sourceValues = pQ.get(sourceDropId);

                    let detinationValues = pQ.get(destinationDropId);

                    let questionMoved = sourceValues.find((val, i) => sourceIndex == i);

                    questionMoved.Page__c = destinationDropId;

                    let sourceNewQuestions = sourceValues.filter((val, i) => sourceIndex != i);

                    pQ.set(sourceDropId, sourceNewQuestions);

                    detinationValues.splice(destination.index, 0, questionMoved);

                    pQ.set(destinationDropId, detinationValues);

                }
                
                return pQ; 

            })

        } else {

            setPageQuestions(pQ => {
                
                if(pQ.has(destinationDropId)) {

                    let values = pQ.get(destinationDropId);

                    const items = move(
                        sortedTypes,
                        values,
                        source,
                        destination, 
                        form.Id,
                        destinationDropId
                    );  

                    pQ.set(destinationDropId, items); 

                }

                return pQ;

            });

        }

        setUpdateMulti(true);
        setUpdate(true);

    }

    useEffect(() => {

        pageQuestions.forEach((values, key) => {
            addEvent('' + key, (result) => onDragEndMulti(setPageQuestions, result));
        });

        return () => pageQuestions.forEach((values, key) => {
            removeEvent('' + key);
        });

    }, [pageQuestions])

    return { pageQuestions, setDeletePage };
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
    console.log('clean page', question, index, formId, page);
    return {
        Title__c        : question.name, 
        Order__c        : parseInt(page + '' + index), 
        Type__c         : question.type,
        Clarity_Form__c : formId,
        Required__c     : false, 
        Max_Length__c   : 10, 
        Min_Range__c    : 0, 
        Max_Range__c    : 100, 
        Step__c         : 10, 
        Page__c         : page != null ? page : 0
    }
}