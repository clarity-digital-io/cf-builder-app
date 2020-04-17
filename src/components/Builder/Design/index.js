import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { call } from '../../RemoteActions';

import Design from './design';

import { BuilderContext, DragDropUpdateContext, DesignContext } from '../../Context';
import { StatusHandler } from '../../Elements/Notification';
import DesignNavigation from '../../Elements/Navigation/design';
import styled from 'styled-components';

/**
 * This provider can be split up into a DragDrop Provider and an Edit Provider
 */

export const DragDrop = () => { 
    
    return (

					<DragDropUpdateProvider>
							<DesignProvider>
								<LayoutHolder>
									<DesignNavigation />
									<Design />
								</LayoutHolder>
							</DesignProvider>
					</DragDropUpdateProvider>

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

const pageValues = (info) => {

	let pages = [];
	
	if(info.length) {
		pages = info.map((val, i) => {
			return {
				label: `Page ${ i + 1 }`,
				value: i, 
			}
		});
	} else {
		pages = [{ label: 'Page 1', value: 0 }]
	}

	return pages; 
}

const DesignProvider = ({ children }) => {

    const { form, setForm, sObjects, setError } = useContext(BuilderContext);

    const [navQuestion, setNavQuestion] = useState(null); 

		const [activeQuestion, setActiveQuestion] = useState({}); 
		
    const [questionOptions, setQuestionOptions] = useState(new Map()); 

    const [recordGroup, setRecordGroup] = useState(new Map()); 

		const [pages, setPages] = useState(() => pageValues(form.forms__Multi_Page_Info__c));

		const [activePage, setActivePage] = useState(0);

		const [activePageQuestions, setActivePageQuestions] = useState([]); 

		const [pageQuestions, setPageQuestions] = useState(new Map());

	// 	useEffect(() => {

	// 			setActivePageQuestions(questions);
			
	// 	}, [activePage]);

  //   const [pageQuestions, setPageQuestions] = useState(new Map());











    const [addPageUpdate, setAddPageUpdate] = useState(false); 
    
    useEffect(() => {

        if(addPageUpdate) {

					let currentPageInfo = form.forms__Multi_Page_Info__c;
					
					let newPageInfo = currentPageInfo.concat([{ page : currentPageInfo.length, title: `Page ${currentPageInfo.length + 1}`, icon: "standard:announcement" }]);

					form.forms__Multi_Page_Info__c = JSON.stringify(newPageInfo);
					console.log('currentPageInfo.length', newPageInfo, form, currentPageInfo);
					StatusHandler(
							form.forms__Status__c,
							() => setUpdate(false),
							() => call(
									setError,
									"ClarityFormBuilder.updateForm", 
									[JSON.stringify(form)], 
									(result, e) => addPageHandler(result, e, setForm, setPages, setAddPageUpdate, setActivePageQuestions, () => setActivePage(newPageInfo.length - 1)),
							),
							null,
							setError
					)
					
        }

		}, [addPageUpdate]);
		
    const [questions, setQuestions] = useState([]); 

    useEffect(() => {

        call(setError, "ClarityFormBuilder.getQuestions", [form.Id], (result, e) => fetchHandler(result, e, setQuestions, setRecordGroup, setPageQuestions, setActivePageQuestions, setQuestionOptions))

    }, [])

    const [questionState, setQuestionState] = useState('NEW'); 

    const [updateSingle, setUpdateSingle] = useState(false); 

    const [updateMulti, setUpdateMulti] = useState(false); 

    const [update, setUpdate] = useState(false); 

    useEffect(() => {

        if(update && updateSingle) {
						console.log('questions', questions);
            StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
										setError,
                    "ClarityFormBuilder.save", 
                    [JSON.stringify(questions)], 
                    (result, e) => resultHandler(result, e, setUpdate, setUpdateSingle, setQuestions, setPageQuestions),
                ),
								() => setUpdateSingle(false),
								setError
            )
        
        }

        if(update && updateMulti) {

            // let multiQuestions = Array.from(pageQuestions.values()).reduce((accum, values, key) => {
            //     return accum.concat(values); 
						// }, []);
						
            StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
										setError,
                    "ClarityFormBuilder.save", 
                    [JSON.stringify(activePageQuestions)], 
                    (result, e) => resultHandler(result, e, setUpdate, setUpdateMulti, setQuestions, setPageQuestions, setActivePageQuestions),
                ),
								() => setUpdateMulti(false),
								setError
            )
        
        }

    }, [update]);

    const [questionUpdate, setQuestionUpdate] = useState(false); 

    const [deletePage, setDeletePage] = useState(null); 

    useEffect(() => {

        if(pageQuestions.has(deletePage)) {
            
            setUpdate(true);

            let pageQuestionsCopy = new Map(pageQuestions)

            pageQuestionsCopy.delete(deletePage);

            let questionsWithPageUpdate = Array.from(pageQuestionsCopy.values()).reduce((accum, values, key) => {

                return accum.concat(values.map((val) => {
                    return { ...val, forms__Page__c: key }
                }));

            }, []);

            StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
										setError,
                    "ClarityFormBuilder.pageDelete", 
                    [JSON.stringify(questionsWithPageUpdate), JSON.stringify([deletePage, form.Id])], 
                    (result, e) => deleteResultHandler(result, e, setQuestions, setPageQuestions, setRecordGroup, setUpdate),
								),
								null,
								setError
            )

        }

    }, [deletePage]);

    const [questionToDelete, setQuestionToDelete] = useState(null);

    useEffect(() => {

        if(questionToDelete) {

            let updatedOnDelete = sortDelete(questions.filter(question => question.Id != questionToDelete));

            setUpdate(true);
            
            StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
										setError,
                    "ClarityFormBuilder.deleteQuestion", 
                    [JSON.stringify(updatedOnDelete), questionToDelete], 
                    (result, e) => deleteResultHandler(result, e, setQuestions, setPageQuestions, setRecordGroup, setUpdate),
								),
								null,
								setError
            )
        
        }

    }, [questionToDelete]);

    return (
        <DesignContext.Provider 
            value={{ 
                questionOptions, 
                setQuestionOptions,
                setDeletePage,
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
								pages, 
								setPages, 
								activePage, 
								setActivePage,
								activePageQuestions, 
								setActivePageQuestions }}>
            { children }
        </DesignContext.Provider>
    )
}

const LayoutHolder = styled.div`
	>div:nth-of-type(1) {
		max-height: 98px; 
	}
`;

const addPageHandler = (result, e, setForm, setPages, setAddPageUpdate, setActivePageQuestions, setActivePageCallBack) => {
	console.log('result', result);
	setForm(form => {
		return { 
				...form, 
				Id: result.Id, 
				forms__Multi_Page_Info__c:  result.forms__Multi_Page_Info__c != null ? JSON.parse(result.forms__Multi_Page_Info__c) : []
		}
	});

	setPages(pages => {

		let newPages = pages.concat([{ label: `Page ${pages.length + 1}`, value: pages.length }]);

		return newPages;
	})

	setActivePageQuestions([]);

	setAddPageUpdate(false);

	setActivePageCallBack()

}

const resultHandler = (result, e, setUpdate, setAdditionalUpdate, setQuestions, setPageQuestions, setActivePageQuestions) => {

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
	
	if(setActivePageQuestions != null) {
		setActivePageQuestions(questions => {

				let updated = questions.map(question => {

						if(!question.Id) {
								question.Id = result[0]; 
						} 
						return question;

				});

				return updated; 

		});
	}

	setUpdate(false);
	setAdditionalUpdate(false);

}

const fetchHandler = (result, e, setQuestions, setRecordGroup, setPageQuestions, setActivePageQuestions, setQuestionOptions) => {

    let questionWithOptions = result.filter(q => q.forms__Clarity_Form_Question_Options__r != null);

    setQuestionOptions(questionOptions => {

        return questionWithOptions.reduce((accum, cur, i) => {

            return accum.set(cur.Id, cur.forms__Clarity_Form_Question_Options__r);

        }, new Map())

    })

    let cleanResult = result.map(q => {

        if(q.hasOwnProperty('forms__Clarity_Form_Question_Options__r')) {
            delete q.forms__Clarity_Form_Question_Options__r;
        }

        return q; 

    });

    let questions = sorted(cleanResult); 

    let cleanQuestions = questions.filter(question => question.forms__Record_Group__c == null);

    let recordGroupQuestions = questions.filter(question => question.forms__Type__c == 'RecordGroup');

    let recordGroups = recordGroupQuestions.reduce((accum, question) => {

        return accum.set(question.Id, questions.filter(q => q.forms__Record_Group__c == question.Id))

    }, new Map());

    setQuestions(cleanQuestions);

		setRecordGroup(recordGroups); 

		//need to set active page questions here
		setPageQuestions(pageBreaks(cleanQuestions));
		
		setActivePageQuestions(getFirstPageQuestions(cleanQuestions))

}

const deleteResultHandler = (result, e, setQuestions, setPageQuestions, setRecordGroup, setUpdate) => {

    let questions = sorted(result); 

    let cleanQuestions = questions.filter(question => question.forms__Record_Group__c == null);

    let recordGroupQuestions = questions.filter(question => question.forms__Type__c == 'RecordGroup');

    let recordGroups = recordGroupQuestions.reduce((accum, question) => {

        return accum.set(question.Id, questions.filter(q => q.forms__Record_Group__c == question.Id))

    }, new Map());

    setQuestions(cleanQuestions);

    setRecordGroup(recordGroups); 

		//need to set active page questions here
    setPageQuestions(pageBreaks(cleanQuestions));

    setUpdate(false);

}

const pageBreaks = (questions) => {

	return questions.reduce((accum, question) => {

			if(accum.has(question.forms__Page__c)) {
					let pageQuestions = accum.get(question.forms__Page__c); 
					let updatedPageQuestions = pageQuestions.concat([question]);
					accum.set(question.forms__Page__c, updatedPageQuestions)
			} else {
					accum.set(question.forms__Page__c, [question]);
			}

			return accum;

	}, new Map())
}

const sorted = (questions) => {

    let result = questions.sort((a, b) => {
        if(a.forms__Order__c < b.forms__Order__c) {
            return -1; 
        }
        if(a.forms__Order__c > b.forms__Order__c) {
            return 1; 
        }
    });

    return result; 

}

const sortDelete = (result) => {

    let s = result.map((r, i) => {
        r.forms__Order__c = i;
        return r; 
    });

    s = s.sort((a, b) => {
        if(a.forms__Order__c < b.forms__Order__c) {
            return -1; 
        }
        if(a.forms__Order__c > b.forms__Order__c) {
            return 1; 
        }
    });

    return s; 

}

const getFirstPageQuestions = (questions) => {

	let t = questions.reduce((accum, question) => {

		if(question.forms__Page__c == 0) {
			accum = accum.concat([question]);
		}
		
		return accum; 

	}, []);

	return t;

}