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

	if(typeof info == 'string') {
		info = JSON.parse(info); 
	}
	
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

		const [pageQuestions, setPageQuestions] = useState(new Map());

		const [activePageQuestions, setActivePageQuestions] = useState([]); 

		useEffect(() => {
				setActivePageQuestions(pageQuestions.has(activePage) ? pageQuestions.get(activePage) : []);
		}, [activePage]);

    const [addPageUpdate, setAddPageUpdate] = useState(false); 
    
    useEffect(() => {

        if(addPageUpdate) {
					
					let newPq = new Map(); 

					let currentPageInfo = form.forms__Multi_Page_Info__c;
					
					let newPageInfo = currentPageInfo.concat([{ page : currentPageInfo.length, title: `Page ${currentPageInfo.length + 1}`, icon: "standard:announcement" }]);

					form.forms__Multi_Page_Info__c = JSON.stringify(newPageInfo);

					newPq.set(newPageInfo.length - 1, []);

					StatusHandler(
							form.forms__Status__c,
							() => setUpdate(false),
							() => call(
									setError,
									"BuilderController.updateForm", 
									[JSON.stringify(form)], 
									(result, e) => addPageHandler(result, e, setForm, setPages, setAddPageUpdate, setActivePageQuestions, setPageQuestions, setActivePage, newPageInfo.length - 1, activePageQuestions, activePage),
							),
							null,
							setError
					)
					
        }

		}, [addPageUpdate]);
		
    const [questions, setQuestions] = useState([]); 

		useEffect(() => {

			if(!form.forms__Multi_Page_Info__c) {
				let cleanQuestions = questions.filter(question => question.forms__Record_Group__c == null);
				setPageQuestions(pageBreaks(cleanQuestions));	
			}

		}, [questions])

    useEffect(() => {

        call(setError, "BuilderController.getQuestions", [form.Id], (result, e) => fetchHandler(result, e, setQuestions, setRecordGroup, setPageQuestions, setActivePageQuestions, setQuestionOptions))

		}, [])

    const [questionState, setQuestionState] = useState('NEW'); 

    const [updateSingle, setUpdateSingle] = useState(false); 

    const [updateMulti, setUpdateMulti] = useState(false); 

    const [update, setUpdate] = useState(false); 

    useEffect(() => {

        if(update && updateSingle) {

						let clonedQuestions = JSON.parse(JSON.stringify(questions));
						let preparedQuestions = prepare(clonedQuestions); 

						StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
										setError,
                    "BuilderController.save", 
                    [JSON.stringify(preparedQuestions)], 
                    (result, e) => resultHandler(result, e, false, setUpdate, setUpdateSingle, setQuestions, setPageQuestions, setActivePageQuestions, questions),
                ),
								() => setUpdateSingle(false),
								setError
            )
        
        }

        if(update && updateMulti) {
						
            StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
										setError,
                    "BuilderController.save", 
                    [JSON.stringify(activePageQuestions)], 
                    (result, e) => resultHandler(result, e, true, setUpdate, setUpdateMulti, setQuestions, setPageQuestions, setActivePageQuestions, activePageQuestions),
                ),
								() => setUpdateMulti(false),
								setError
            )
        
        }

    }, [update]);

    const [questionUpdate, setQuestionUpdate] = useState(false); 

    const [deletePage, setDeletePage] = useState(null); 

    useEffect(() => {

				setAddPageUpdate(true);

				if(activePageQuestions.length > 0) {

					setActivePageQuestions([]);
	
					StatusHandler(
							form.forms__Status__c,
							() => setUpdate(false),
							() => call(
									setError,
									"BuilderController.pageQuestionsDelete", 
									[JSON.stringify(activePageQuestions). form.Id], 
									(result, e) => deletePageResultHandler(result, e, setPages, setQuestions, setPageQuestions, setRecordGroup, setForm, setActivePage, setAddPageUpdate, deletePage),
							),
							null,
							setError
					)
				} else {
					resetToFirstPage(setPages, setForm, setActivePage, setAddPageUpdate, deletePage);
				}
				
    }, [deletePage]);

    const [questionToDelete, setQuestionToDelete] = useState(null);

    useEffect(() => {

        if(questionToDelete) {

						setUpdate(true);
						
						let updatedOnDelete = sortDelete(questions.filter(question => question.Id != questionToDelete));

            StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
										setError,
                    "BuilderController.deleteQuestion", 
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

const addPageHandler = (result, e, setForm, setPages, setAddPageUpdate, setActivePageQuestions, setPageQuestions, setActivePage, len, activePageQuestions, activePage) => {

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

	setPageQuestions(pQ => {
		pQ.set(activePage, activePageQuestions); 
		pQ.set(len, []);
		return pQ; 
	});

	setActivePageQuestions([]);

	setAddPageUpdate(false);

	setActivePage(len)

}

const resultHandler = (result, e, isMulti, setUpdate, setAdditionalUpdate, setQuestions, setPageQuestions, setActivePageQuestions, activePageQuestions, activePage) => {
	console.log('result', result); 
	setQuestions(questions => {
			console.log('questions', questions);
			let updated = questions.map((question, index) => {

				console.log('question.Id', question.Id, index);

				if(question.Id == null) {
						question.Id = result[index]; 
				} 
				return question;

			});
			console.log('updated', updated);

			return updated; 

	});
		
	setPageQuestions(pageQuestions => {

			let actualActivePage = activePage || 0;
			let newActivePages = activePageQuestions.map((value, key) => {

				if(!value.Id) {
						value.Id = result[0]; 
						actualActivePage = value.forms__Page__c;
				} 
				return value;

			});
			let t = pageQuestions.set(actualActivePage, newActivePages); 

			return t; 
	});
	
	if(isMulti) {

		setActivePageQuestions(questions => {

			let updated = questions.map(question => {

					if(!question.Id) {
							question.Id = result[0]; 
					} 
					return question;

			});

			return updated; 

		});

	} else {
		setActivePageQuestions(questions => {

				let updated = activePageQuestions.map(question => {

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

    let questionWithOptions = result.filter(q => q.forms__Question_Options__r != null);

    setQuestionOptions(questionOptions => {

        return questionWithOptions.reduce((accum, cur, i) => {

            return accum.set(cur.Id, cur.forms__Question_Options__r);

        }, new Map())

		})
		
    let questions = sorted(result); 

    let cleanQuestions = questions.filter(question => question.forms__Record_Group__c == null);

    let recordGroupQuestions = questions.filter(question => question.forms__Type__c == 'RecordGroup');

    let recordGroups = recordGroupQuestions.reduce((accum, question) => {

        return accum.set(question.Id, questions.filter(q => q.forms__Record_Group__c == question.Id))

    }, new Map());

    setQuestions(cleanQuestions);

		setRecordGroup(recordGroups); 

		setPageQuestions(pageBreaks(cleanQuestions));
		
		setActivePageQuestions(getFirstPageQuestions(cleanQuestions))

}

const deletePageResultHandler =  (result, e, setPages, setQuestions, setPageQuestions, setRecordGroup, setForm, setActivePage, setAddPageUpdate, deletePage) => {

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

	resetToFirstPage(setPages, setForm, setActivePage, setAddPageUpdate, deletePage);

}

const resetToFirstPage = (setPages, setForm, setActivePage, setAddPageUpdate, deletePage) => {

	setPages(pages => {

		return pages.filter(p => {
			return p.value != deletePage;
		})
	});

	setForm(form => {

		let multiPageInfo = form.forms__Multi_Page_Info__c;

		if(typeof multiPageInfo == 'string') {
			multiPageInfo = JSON.parse(multiPageInfo); 
		}

		let preppedMultiPageInfo =	multiPageInfo.filter((page) => {

			return page.page != deletePage;

		})

		return { ...form, forms__Multi_Page_Info__c: preppedMultiPageInfo }
	})

	setActivePage(0);

	setAddPageUpdate(false);

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
        if(r.hasOwnProperty('forms__Question_Options__r')) {
            delete r.forms__Question_Options__r;
				}
				
				if(r.hasOwnProperty('forms__Question_Criteria__r')) {
					delete r.forms__Question_Criteria__r;
				}

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

const prepare = (questionList) => {
	return questionList.map(question => {
		if(question.hasOwnProperty('forms__Question_Options__r')) {
			delete question.forms__Question_Options__r;
		}

		if(question.hasOwnProperty('forms__Question_Criteria__r')) {
			delete question.forms__Question_Criteria__r;
		}
		return question; 
	})
}

const LayoutHolder = styled.div`
	>div:nth-of-type(1) {
		max-height: 98px; 
	}
`;


