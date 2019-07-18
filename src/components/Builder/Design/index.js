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

    const [navQuestion, setNavQuestion] = useState(null); 

    const [activeQuestion, setActiveQuestion] = useState({}); 

    const [recordGroup, setRecordGroup] = useState(new Map()); 

    const [pageQuestions, setPageQuestions] = useState(new Map());

    const [addPageUpdate, setAddPageUpdate] = useState(false); 
    
    useEffect(() => {

        if(addPageUpdate) {

            setPageQuestions(pageQuestions => {

                let pages = pageQuestions.size;
                
                pageQuestions.set(pages, []);
        
                return pageQuestions;
            });

            setAddPageUpdate(false);

        }

    }, [addPageUpdate]);

    const [questions, setQuestions] = useState([]); 

    useEffect(() => {

        call("ClarityFormBuilder.getQuestions", [form.Id], (result, e) => fetchHandler(result, e, setQuestions, setRecordGroup, setPageQuestions))

    }, [])

    const [questionState, setQuestionState] = useState('NEW'); 

    const [updateSingle, setUpdateSingle] = useState(false); 

    const [updateMulti, setUpdateMulti] = useState(false); 

    const [update, setUpdate] = useState(false); 

    useEffect(() => {

        if(update && updateSingle) {

            console.log('updateSingle');
            console.log('questions', questions);
            call("ClarityFormBuilder.save", [JSON.stringify(questions)], (result, e) => resultHandler(result, e, setUpdate, setUpdateSingle, setQuestions, setPageQuestions));
        
        }

        if(update && updateMulti) {

            console.log('updateMulti');
            console.log('pageQuestions', pageQuestions);
            let multiQuestions = Array.from(pageQuestions.values()).reduce((accum, values, key) => {
                return accum.concat(values); 
            }, []);
            call("ClarityFormBuilder.save", [JSON.stringify(multiQuestions)], (result, e) => resultHandler(result, e, setUpdate, setUpdateMulti, setQuestions, setPageQuestions));
        
        }

    }, [update]);


    const [questionUpdate, setQuestionUpdate] = useState(false); 

    const [questionToDelete, setQuestionToDelete] = useState(null);

    useEffect(() => {

        if(questionToDelete) {

            let updatedOnDelete = sortDelete(questions.filter(question => question.Id != questionToDelete));

            setUpdate(true);
            
            call("ClarityFormBuilder.deleteQuestion", [JSON.stringify(updatedOnDelete), questionToDelete], (result, e) => deleteResultHandler(result, e, setQuestions, setUpdate));
        
        }

    }, [questionToDelete]);

    return (
        <DesignContext.Provider 
            value={{ 
                setUpdateSingle,
                setUpdateMulti,
                addPageUpdate, 
                setAddPageUpdate,
                navQuestion, 
                setNavQuestion,
                sObjects,
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
                setQuestions,
                pageQuestions,
                setPageQuestions }}>
            { children }
        </DesignContext.Provider>
    )
}


const resultHandler = (result, e, setUpdate, setAdditionalUpdate, setQuestions, setPageQuestions) => {

    setQuestions(questions => {

        let updated = questions.map(question => {

            if(!question.Id) {
                question.Id = result[0]; 
            } 
            return question;

        });

        return updated; 

    });

    setPageQuestions(pageQuestions => {

        return Array.from(pageQuestions.values()).reduce((accum, values, key) => {

            return accum.set(key, (values.map((value, i) => {

                if(!value.Id) {
                    value.Id = result[0]; 
                } 
                return value;

            })));

        }, new Map());

    });

    setUpdate(false);
    setAdditionalUpdate(false);

}

const fetchHandler = (result, e, setQuestions, setRecordGroup, setPageQuestions) => {

    let questions = sorted(result); 

    let cleanQuestions = questions.filter(question => question.Record_Group__c == null);

    let recordGroupQuestions = questions.filter(question => question.Type__c == 'RecordGroup');

    let recordGroups = recordGroupQuestions.reduce((accum, question) => {

        return accum.set(question.Id, questions.filter(q => q.Record_Group__c == question.Id))

    }, new Map());

    setQuestions(cleanQuestions);

    setRecordGroup(recordGroups); 

    setPageQuestions(pageBreaks(cleanQuestions));

}

const deleteResultHandler = (result, e, setQuestions, setUpdate) => {
    setQuestions(sorted(result));
    setUpdate(false)
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

    let s = result.map((r, i) => {
        r.Order__c = i;
        return r; 
    });

    s = s.sort((a, b) => {
        if(a.Order__c < b.Order__c) {
            return -1; 
        }
        if(a.Order__c > b.Order__c) {
            return 1; 
        }
    });

    return s; 

}

const pageBreaks = (questions) => {

    return questions.reduce((accum, question) => {

        if(accum.has(question.Page__c)) {
            let pageQuestions = accum.get(question.Page__c); 
            let updatedPageQuestions = pageQuestions.concat([question]);
            accum.set(question.Page__c, updatedPageQuestions)
        } else {
            accum.set(question.Page__c, [question]);
        }

        return accum;

    }, new Map())
}
