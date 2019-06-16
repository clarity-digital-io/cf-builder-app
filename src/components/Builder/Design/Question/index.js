import React, { useContext, useEffect } from 'react';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';

import {Button} from '../../../Elements/Button';

import { NewQuestion } from './new';
import { EditQuestion } from './Edit';
import { SalesforceFields } from './SF';
import { AutomateQuestion } from './Automate';
import { LogicQuestion } from './Logic';

import { DesignContext } from '../../../Context';

export const QuestionState = () => {

    const { activeQuestion, questionState } = useContext(DesignContext);

    const getState = (state) => {

        switch (state) {
            case 'NEW':
                return <NewQuestion />
                break;
            case 'EDIT': 
                return <Save><EditQuestion type={activeQuestion.Type__c} /></Save>
                break;
            case 'SF': 
                return <Save><SalesforceFields /></Save>
                break; 
            case 'AUTOMATE': 
                return <Save><AutomateQuestion type={activeQuestion.Type__c} /></Save>
                break;
            case 'LOGIC': 
                return <Save><LogicQuestion type={activeQuestion.Type__c} /></Save>
                break;
            case 'CALCULATOR': 
                return <Save><div>calculator</div></Save>
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
        criteria,
        setCriteria,
        questionState,
        activeFlowDesign, 
        setActiveFlowDesign,
        activeQuestionOptions, 
        setActiveQuestionOptions, 
        activeQuestion, 
        setQuestionState, 
        questionUpdate, 
        setQuestionUpdate, 
        setQuestions 
    } = useContext(DesignContext);

    useEffect(() => {

        if(questionUpdate && activeQuestionOptions.length == 0 && questionState == 'EDIT') {
            call(
                "ClarityFormBuilder.saveQuestion", 
                [JSON.stringify(activeQuestion)], 
                (result, e) => resultHandler(result, e, setQuestionUpdate, setQuestions, activeQuestion)
            );
        }

        if(questionUpdate && activeQuestionOptions.length && questionState == 'EDIT') {
            call(
                "ClarityFormBuilder.saveQuestionWithOptions", 
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
                [JSON.stringify('fields'), JSON.stringify(activeQuestionOptions)], 
                (result, e) => resultFlowHandler(result, e,setQuestionUpdate, setActiveQuestionOptions, setActiveFlowDesign)
            )
        }

    }, [questionUpdate])

    return [
        
        <View className="row end-xs">
            <View className="col-xs-12">
                <ViewStyle top border>

                    {
                        questionState != 'SF' ? <Button neutral onClick={() => setQuestionState('NEW')}>Add New Field</Button> : <Button neutral onClick={() => setQuestionState('EDIT')}>Back</Button>
                    }

                    <Button cta onClick={() => setQuestionUpdate(true)}>

                        {
                            questionUpdate ? 'Saving...' : 'Save Changes'
                        }

                    </Button>
                </ViewStyle>
            </View>
        </View>,
        <View className="row">
            <View className="col-xs-12">
                <View className="Box">{ children }</View>
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

    setQuestionUpdate(false);

}

const resultOptionHandler = (result, e, setQuestionUpdate, setQuestions, activeQuestion, setActiveQuestionOptions) => {
    
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

    setActiveQuestionOptions(options);    

    setQuestionUpdate(false);

}

const resultCriteriaHandler = (result, e, setQuestionUpdate, setQuestions, setCriteria, activeQuestion) => {
    
    let criteria = result.Criteria;
    let resultQuestion = result.Question[0];
    console.log('resultCriteriaHandler', criteria, resultQuestion);
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

const resultFlowHandler = (result, e, setQuestionUpdate, setActiveQuestionOptions, setActiveFlowDesign) => {
    let options = result.Options;
    let flowDesign = result.FlowDesign[0];

    setActiveQuestionOptions(options);    
    setActiveFlowDesign(flowDesign);
    setQuestionUpdate(false);

}