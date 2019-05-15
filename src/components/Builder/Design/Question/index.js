import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import {Button} from '../../../Elements/Button';
import Main from '../../../Elements/Theme';

import { NewQuestion } from './new';
import { EditQuestion } from './edit';
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

    const { activeQuestion, setQuestionState, questionUpdate, setQuestionUpdate, setQuestions } = useContext(DesignContext);

    useEffect(() => {

        if(questionUpdate) {
            call("ClarityFormBuilder.saveQuestion", [JSON.stringify(activeQuestion)], (result, e) => resultHandler(result, e, setQuestionUpdate, setQuestions, activeQuestion));
        }

    }, [questionUpdate])

    return [
        
        <View className="row end-xs">
            <View className="col-xs-12">
                <ViewStyle>
                    <Button neutral onClick={() => setQuestionState('NEW')}
                        >Add New Field</Button>
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

const ViewStyle = styled.div`
    padding: .5em;
    border-bottom: 1px solid ${Main.color.light}
`;