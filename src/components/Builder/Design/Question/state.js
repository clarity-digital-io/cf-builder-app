import React, { useContext, useEffect } from 'react';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';

import {Button} from '../../../Elements/Button';

import { EditProvider } from './index';

import { NewQuestion } from './new';
import { EditQuestion } from './edit';
import { SalesforceFields } from './SF';
import { LogicQuestion } from './Logic';

import { DesignContext, EditContext, BuilderContext } from '../../../Context';
import { StatusHandler } from '../../../Elements/Notification';

export const QuestionState = () => {

    const { activeQuestion, questionState } = useContext(DesignContext);

    const getState = (state) => {

        switch (state) {
            case 'NEW':
                return <NewQuestion />
                break;
            case 'EDIT': 
                return <EditProvider><Save><EditQuestion type={activeQuestion.forms__Type__c} /></Save></EditProvider>
                break;
            case 'SF': 
                return <EditProvider><Save><SalesforceFields /></Save></EditProvider>
                break; 
            case 'LOGIC': 
                return <EditProvider><Save><LogicQuestion type={activeQuestion.forms__Type__c} /></Save></EditProvider>
                break;
						case 'CALCULATOR': 
                return <EditProvider><Save><div>calculator</div></Save></EditProvider>
                break; 
            default:
                return null;
                break;
        }

    }

    return getState(questionState)

}

const Save = ({ children }) => {

    const { form, setError } = useContext(BuilderContext);

    const { 
        activeRecordGroup, 
        setActiveRecordGroup,
        activeQuestionOptions, 
        setActiveQuestionOptions, 
        criteria, 
        setCriteria
    } = useContext(EditContext); 

    const { 
        activeQuestion, 
        questionState,
        setQuestionState, 
        questionUpdate, 
        setQuestionUpdate, 
        questions,
        setActiveQuestion,
        setQuestionOptions,
        setQuestions, 
				setPageQuestions,
				setActivePageQuestions,
        setRecordGroup
    } = useContext(DesignContext);

    useEffect(() => {

        if(questionUpdate && activeQuestionOptions.length == 0 && questionState == 'EDIT') {
            StatusHandler(
                form.forms__Status__c,
                () => setQuestionUpdate(false),
                () => call(
										setError,
                    "ClarityFormBuilder.saveQuestion", 
                    [JSON.stringify(activeQuestion)], 
                    (result, e) => resultHandler(result, e, setQuestionUpdate, setQuestions, setPageQuestions, setActivePageQuestions, activeQuestion),
								),
								null,
								setError
            )
        }

        if(activeQuestion.forms__Type__c != 'PictureChoice' && questionUpdate && activeQuestionOptions.length && questionState == 'EDIT') {
            StatusHandler(
                form.forms__Status__c,
                () => setQuestionUpdate(false),
                () => call(
										setError,
                    "ClarityFormBuilder.saveQuestionWithOptions", 
                    [JSON.stringify(activeQuestion), JSON.stringify(activeQuestionOptions)], 
                    (result, e) => resultOptionHandler(result, e, setQuestionUpdate, setQuestions, setPageQuestions, activeQuestion, setActiveQuestionOptions, setQuestionOptions),
								),
								null,
								setError
            )
        }

        if(activeQuestion.forms__Type__c == 'PictureChoice' && questionUpdate && activeQuestionOptions.length && questionState == 'EDIT') {

						let activeQuestionOptionImages = activeQuestionOptions.reduce((accum, option, index) => {

							if(option.forms__Choice_Image__c != null && option.forms__Choice_Image__c.length > 18) {
								let base64result = option.forms__Choice_Image__c.split(',')[1];
								accum[option.Id || index] = base64result;
							}

							return accum;

						}, {});

						let updatedOptions = activeQuestionOptions.reduce((accum, option, index) => {

							if(option.forms__Choice_Image__c != null && option.forms__Choice_Image__c.length > 18) {
								option.forms__Choice_Image__c = '';
							}

							accum[option.Id || index] = option;
							return accum;

						}, {});

            StatusHandler(
                form.forms__Status__c,
                () => setQuestionUpdate(false),
                () => call(
										setError,
                    "ClarityFormBuilder.saveQuestionWithPictureOptions", 
                    [JSON.stringify(activeQuestion), JSON.stringify(updatedOptions), JSON.stringify(activeQuestionOptionImages)], 
                    (result, e) => resultOptionHandler(result, e, setQuestionUpdate, setQuestions, setPageQuestions, activeQuestion, setActiveQuestionOptions, setQuestionOptions),
								),
								null,
								setError
            )
        }

        if(questionUpdate && questionState == 'LOGIC') {
            
            let updatedCriteria = criteria.map(c => { delete c.Id; return c });
            
            StatusHandler(
                form.forms__Status__c,
                () => setQuestionUpdate(false),
                () => call(
										setError,
                    "ClarityFormBuilder.saveQuestionWithCriteria", 
                    [JSON.stringify(activeQuestion), JSON.stringify(updatedCriteria)], 
                    (result, e) => resultCriteriaHandler(result, e,setQuestionUpdate, setQuestions, setCriteria, activeQuestion),
								),
								null,
								setError
            )

        }

        if(questionUpdate && questionState == 'SF') {

            let updatedActiveRecords = activeRecordGroup.map(a => {
                delete a.Id;
                return a;
            });
						
            StatusHandler(
                form.forms__Status__c,
                () => setQuestionUpdate(false),
                () => call(
										setError,
                    "ClarityFormBuilder.saveRecordGroupFields", 
                    [JSON.stringify(updatedActiveRecords), activeQuestion.Id], 
                    (result, e) => resultRecordGroupFieldsHandler(result, e, setQuestionUpdate, setRecordGroup, setActiveRecordGroup, activeQuestion),
								),
								null,
								setError
            )
        }

    }, [questionUpdate])

    const edit = (questionId) => {
				setActiveQuestion(questions.find(question => question.Id == questionId));
        setQuestionState('SF');
    }

    return [
      
        <View borderRight key={'Save'} className="row middle-xs end-xs">
            <View className="col-xs-12">
                <ViewStyle border>

                    {
                        activeQuestion.forms__Record_Group__c != null ? 
                            <Button onClick={() => edit(activeQuestion.forms__Record_Group__c)}>Back</Button> : 
                            null
                    }

                    {
                        questionState != 'SF' ? 
                            <Button onClick={() => setQuestionState('NEW')} variant="neutral">Add New Field</Button> : 
                            <Button onClick={() => setQuestionState('EDIT')}>Back</Button>
                    }

                    <Button cta onClick={() => setQuestionUpdate(true)} variant="brand">

                        {
                            questionUpdate ? 'Saving...' : 'Save Changes'
                        }

                    </Button>
                    
                </ViewStyle>
            </View>
				</View>,
				<View borderRight body key={'QuestionEdit'}>
						{ children }
				</View>

    ]
}

const resultHandler = (result, e, setQuestionUpdate, setQuestions, setPageQuestions, setActivePageQuestions, activeQuestion) => {

    setQuestions(questions => {

        return questions.map(question => {
            if(question.Id == result) {
                return activeQuestion; 
            }

            return question; 

        })

    });

    setPageQuestions(pQ => {

        return Array.from(pQ.values()).reduce((accum, values, key) => {

            
            return accum.set(key, values.map((value, i) => {

                if(value.Id == result) {
                    return activeQuestion;
                } 
                return value;

            }));

        }, new Map());

		});
		
		setActivePageQuestions(questions => {

			return questions.map(question => {
					if(question.Id == result) {
							return activeQuestion; 
					}

					return question; 

			})

		});


    setQuestionUpdate(false);

}

const resultOptionHandler = (result, e, setQuestionUpdate, setQuestions, setPageQuestions, activeQuestion, setActiveQuestionOptions, setQuestionOptions) => {
    
    let options = result.Options;
    let resultQuestion = result.Question[0];

    setQuestions(questions => {

        return questions.map(question => {
            if(question.Id == resultQuestion.Id) {
                return activeQuestion; 
            }

            return question; 

        })

    });

    setQuestionOptions(questionOptions => {

        questionOptions.set(resultQuestion.Id, options); 

        return questionOptions; 

    })

    setPageQuestions(pQ => {

        return Array.from(pQ.values()).reduce((accum, values, key) => {

            return accum.set(key, values.map((value, i) => {

                if(value.Id == resultQuestion.Id) {
                    return activeQuestion;
                } 
                return value;

            }));

        }, new Map());

    });

    setActiveQuestionOptions(options);    

    setQuestionUpdate(false);

}

const resultCriteriaHandler = (result, e, setQuestionUpdate, setQuestions, setCriteria, activeQuestion) => {
    
    let criteria = result.Criteria;
    let resultQuestion = result.Question[0];

    setQuestions(questions => {

        return questions.map(question => {
            if(question.Id == resultQuestion.Id) {
                return activeQuestion; 
            }

            return question; 

        })

    });

    setCriteria(criteria);
    setQuestionUpdate(false); 

}

const resultRecordGroupFieldsHandler = (result, e, setQuestionUpdate, setRecordGroup, setActiveRecordGroup, activeQuestion) => {

    setActiveRecordGroup(result);

    setRecordGroup(group => {
        group.set(activeQuestion.Id, result); 
        return group; 
    });

    setQuestionUpdate(false); 

}