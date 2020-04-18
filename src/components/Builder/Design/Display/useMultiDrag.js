import { useEffect, useContext } from 'react';

import { sortedTypes } from '../types';

import { BuilderContext, DragDropUpdateContext, DesignContext } from '../../../Context';

export const useMultiDrag = () => {

    const { addEvent, removeEvent } = useContext(DragDropUpdateContext); 

    const { form } = useContext(BuilderContext); 

		const { 
			setDeletePage, 
			setUpdateMulti, 
			setUpdate, 
			pages, 
			activePage, 
			setActivePage, 
			activePageQuestions, 
			setActivePageQuestions, 
			setAddPageUpdate, 
			addPageUpdate 
		} = useContext(DesignContext); 

    useEffect(() => {
				
				addEvent('multi_' + activePage, (result) => onDragEndMulti(setActivePageQuestions, result));

		}, [activePage]);
		
    const onDragEndMulti = (setActivePageQuestions, result) => {

        const { source, destination } = result;

        if (!destination || destination.droppableId == 'new' ) {
            return;
				}
				
				let splitDestinationId = destination.droppableId.split('_');

        let destinationDropId = parseInt(splitDestinationId[1]); 

				if (source.droppableId === destination.droppableId) {
        		
						setActivePageQuestions(activeQuestions => {
							
							const items = reorder(
									activeQuestions,
									source.index,
									destination.index
							); 

							return items;

						});

        } else {

						setActivePageQuestions(activeQuestions => {

							const items = move(
									sortedTypes,
									activeQuestions,
									source,
									destination, 
									form.Id,
									destinationDropId
							);  

							return items;

						});

        }

        setUpdateMulti(true);
        setUpdate(true);

    }

    useEffect(() => {
				
				addEvent('multi_' + activePage, (result) => onDragEndMulti(setActivePageQuestions, result));

				return () => removeEvent('multi_' + activePage);

		}, [activePageQuestions])

    return { pages, activePage, setActivePage, activePageQuestions, setDeletePage, setAddPageUpdate };
}

const reorder = (list, startIndex, endIndex) => {

    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return sort(result);
    
};

const sort = (result) => {

    let sorted = result.map((r, i) => {
        r.forms__Order__c = i;
        return r; 
    });

    sorted = sorted.sort((a, b) => {
        if(a.forms__Order__c < b.forms__Order__c) {
            return -1; 
        }
        if(a.forms__Order__c > b.forms__Order__c) {
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
        forms__Title__c        : question.name, 
        forms__Order__c        : parseInt(page + '' + index), 
        forms__Type__c         : question.type,
        forms__Clarity_Form__c : formId,
        forms__Required__c     : false, 
        forms__Max_Length__c   : 10, 
        forms__Min_Range__c    : 0, 
        forms__Max_Range__c    : 100, 
        forms__Step__c         : 10, 
        forms__Page__c         : page != null ? page : 0
    }
}