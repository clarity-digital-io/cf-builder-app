import React, { useContext, useEffect } from 'react';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';

import {Button} from '../../../Elements/Button';

import { EditProvider } from './index';

import { NewQuestion } from './new';
import { EditQuestion } from './edit';
import { SalesforceFields } from './SF';
import { AutomateQuestion } from './Automate';
import { LogicQuestion } from './Logic';

import { DesignContext, EditContext } from '../../../Context';

export const QuestionState = () => {

    const { activeQuestion, questionState } = useContext(DesignContext);

    const getState = (state) => {

        switch (state) {
            case 'NEW':
                return <NewQuestion />
                break;
            case 'EDIT': 
                return <EditProvider><Save><EditQuestion type={activeQuestion.Type__c} /></Save></EditProvider>
                break;
            case 'SF': 
                return <EditProvider><Save><SalesforceFields /></Save></EditProvider>
                break; 
            case 'AUTOMATE': 
                return <EditProvider><Save><AutomateQuestion type={activeQuestion.Type__c} /></Save></EditProvider>
                break;
            case 'LOGIC': 
                return <EditProvider><Save><LogicQuestion type={activeQuestion.Type__c} /></Save></EditProvider>
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

    const { 
        activeRecordGroup, 
        setActiveRecordGroup,
        activeQuestionOptions, 
        setActiveQuestionOptions, 
        activeFlowDesign, 
        setActiveFlowDesign, 
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
        setQuestions, 
        setPageQuestions,
        setRecordGroup
    } = useContext(DesignContext);

    useEffect(() => {

        if(questionUpdate && activeQuestionOptions.length == 0 && questionState == 'EDIT') {
            call(
                "ClarityFormBuilder.saveQuestion", 
                [JSON.stringify(activeQuestion)], 
                (result, e) => resultHandler(result, e, setQuestionUpdate, setQuestions, activeQuestion)
            );
        }

        if(activeQuestion.Type__c != 'PictureChoice' && questionUpdate && activeQuestionOptions.length && questionState == 'EDIT') {

            call(
                "ClarityFormBuilder.saveQuestionWithOptions", 
                [JSON.stringify(activeQuestion), JSON.stringify(activeQuestionOptions)], 
                (result, e) => resultOptionHandler(result, e, setQuestionUpdate, setQuestions, setPageQuestions, activeQuestion, setActiveQuestionOptions)
            );
        }

        if(activeQuestion.Type__c == 'PictureChoice' && questionUpdate && activeQuestionOptions.length && questionState == 'EDIT') {
            
            call(
                "ClarityFormBuilder.saveQuestionWithPictureOptions", 
                [JSON.stringify(activeQuestion), JSON.stringify(activeQuestionOptions)], 
                (result, e) => resultOptionHandler(result, e, setQuestionUpdate, setQuestions, activeQuestion, setActiveQuestionOptions)
            );

        }

        if(questionUpdate && questionState == 'AUTOMATE') {
            call(
                "ClarityFormBuilder.saveFlowDesign", 
                [JSON.stringify(activeFlowDesign), JSON.stringify(activeQuestionOptions)], 
                (result, e) => resultFlowHandler(result, e,setQuestionUpdate, setActiveQuestionOptions, setActiveFlowDesign)
            )
        }

        if(questionUpdate && questionState == 'LOGIC') {
            
            let updatedCriteria = criteria.map(c => { delete c.Id; return c });
            
            call(
                "ClarityFormBuilder.savQuestionWithCriteria", 
                [JSON.stringify(activeQuestion), JSON.stringify(updatedCriteria)], 
                (result, e) => resultCriteriaHandler(result, e,setQuestionUpdate, setQuestions, setCriteria, activeQuestion)
            )

        }

        if(questionUpdate && questionState == 'SF') {
            call(
                "ClarityFormBuilder.saveRecordGroupFields", 
                [JSON.stringify(activeRecordGroup), activeQuestion.Id], 
                (result, e) => resultRecordGroupFieldsHandler(result, e, setQuestionUpdate, setRecordGroup, setActiveRecordGroup, activeQuestion)
            )
        }

    }, [questionUpdate])

    const edit = (questionId) => {
        setActiveQuestion(questions.find(question => question.Id == questionId));
        setQuestionState('SF');
    }

    return [
        
        <View silver body key={'QuestionEdit'} className="row">
            <View className="col-xs-12">
                <View className="Box">{ children }</View>
            </View>
        </View>, 
        <View footer key={'Save'} className="row middle-xs end-xs">
            <View className="col-xs-12">
                <ViewStyle middle>

                    {
                        activeQuestion.Record_Group__c != null ? 
                            <Button neutral onClick={() => edit(activeQuestion.Record_Group__c)}>Back</Button> : 
                            null
                    }

                    {
                        questionState != 'SF' ? 
                            <Button neutral onClick={() => setQuestionState('NEW')}>Add New Field</Button> : 
                            <Button neutral onClick={() => setQuestionState('EDIT')}>Back</Button>
                    }

                    <Button cta onClick={() => setQuestionUpdate(true)}>

                        {
                            questionUpdate ? 'Saving...' : 'Save Changes'
                        }

                    </Button>
                    
                </ViewStyle>
            </View>
        </View>

    ]
}

const resultHandler = (result, e, setQuestionUpdate, setQuestions, activeQuestion) => {

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


    setQuestionUpdate(false);

}

const resultOptionHandler = (result, e, setQuestionUpdate, setQuestions, setPageQuestions, activeQuestion, setActiveQuestionOptions) => {
    
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

const resultFlowHandler = (result, e, setQuestionUpdate, setActiveQuestionOptions, setActiveFlowDesign) => {
    let options = result.Options;
    let flowDesign = result.FlowDesign[0];

    setActiveQuestionOptions(options);    
    setActiveFlowDesign(flowDesign);
    setQuestionUpdate(false);

}