import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';

import {Button} from '../../../Elements/Button';
import Main from '../../../Elements/Theme';

import { NewQuestion } from './new';
import { EditQuestion } from './Edit';
import { AutomateQuestion } from './Automate';
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
            case 'AUTOMATE': 
                return <Save><AutomateQuestion type={activeQuestion.Type__c} /></Save>
            case 'LOGIC': 
                return <Save><div>logic</div></Save>
            case 'CALCULATOR': 
                return <Save><div>calculator</div></Save>
            case 'SETTINGS': 
                return <Save><div>settings</div></Save>
            default:
                return null;
                break;
        }

    }

    return getState(questionState)

}

const Save = ({ children }) => {

    const { activeQuestionOptions, setActiveQuestionOptions, activeQuestion, setQuestionState, questionUpdate, setQuestionUpdate, setQuestions } = useContext(DesignContext);

    useEffect(() => {

        if(questionUpdate && activeQuestionOptions.length == 0) {
            call("ClarityFormBuilder.saveQuestion", [JSON.stringify(activeQuestion)], (result, e) => resultHandler(result, e, setQuestionUpdate, setQuestions, activeQuestion));
        }

        if(questionUpdate && activeQuestionOptions.length) {
            call(
                "ClarityFormBuilder.saveQuestionWithOptions", 
                [JSON.stringify(activeQuestion), JSON.stringify(activeQuestionOptions)], 
                (result, e) => resultOptionHandler(result, e, setQuestionUpdate, setQuestions, activeQuestion, setActiveQuestionOptions)
            );
        }

    }, [questionUpdate])

    return [
        
        <View className="row end-xs">
            <View className="col-xs-12">
                <ViewStyle top border>
                    <Button neutral onClick={() => setQuestionState('NEW')}>Add New Field</Button>
                    <Button action onClick={() => setQuestionUpdate(true)}>

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
    console.log(options, resultQuestion);
    setQuestions(questions => {

        return questions.map(question => {
            if(question.Id == resultQuestion.Id) {
                return activeQuestion; 
            }

            return question; 

        })

    });
    console.log(options); 
    setActiveQuestionOptions(options);    

    setQuestionUpdate(false);
}
