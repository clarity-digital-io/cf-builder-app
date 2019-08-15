import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Icon, Form } from 'antd';

import Main from '../../../Elements/Theme'
import { getType } from './types'; 

import { DesignContext, BuilderContext } from '../../../Context';

const FormItem = Form.Item;

export const Question = ({ question }) => {

    const { navState, setNavState } = useContext(BuilderContext); 

    const { setQuestionState, setNavQuestion, activeQuestion, setActiveQuestion, setQuestionToDelete } = useContext(DesignContext);

    const edit = (state) => {

        if(navState != 'QUESTIONS') {
            setNavState('QUESTIONS')
        }

        setActiveQuestion(question);
        setNavQuestion(question.Id);
        setQuestionState(state);
    }

    return (
        <QuestionStyle key={'Question'}>

            <Options active={ question.Id != null && (question.Id == activeQuestion.Id) }>
            <div>
                <li><Icon style={{ fontSize: '1.25em', color: Main.color.body }} type="edit" onClick={() => edit('EDIT')} /></li>

                <li><Icon style={{ fontSize: '1.25em', color: Main.color.body }} type="api" onClick={() => edit('AUTOMATE')} /></li>

                <li><Icon style={{ fontSize: '1.25em', color: Main.color.body }} type="interaction" onClick={() => edit('LOGIC')} /></li>

                {
                    question.Type__c == 'Number' ? 
                    <li><Icon style={{ fontSize: '1.25em', color: Main.color.body }} type="calculator" onClick={() => edit('CALCULATOR')} /></li> : 
                        null 
                }

                {
                    (question.Type__c == 'RecordGroup' && question.Salesforce_Object__c != null) ? 
                    <li><Icon style={{ fontSize: '1.25em', color: Main.color.body }} type="folder-add" onClick={() => edit('SF')} /></li> : 
                        null
                }

                <li><Icon style={{ fontSize: '1.25em', color: Main.color.alert }} type="delete" onClick={() => setQuestionToDelete((question.Id))} /></li>
            </div>
            </Options>

            <FieldBox>

                <FormItem key={question.Id} label={question.Title__c}>
                    {getType(question)}
                </FormItem>

            </FieldBox>

        </QuestionStyle>
    )
}

const Options = styled.div`

    border-right: 1px dashed ${Main.color.light}
    display: inline-block; 
    background: ${Main.color.light}45;
    background: ${props => props.active ? `${Main.color.body}15` : `${Main.color.light}45`} !important;

    li {
        list-style-type: none;
        cursor: pointer;
        padding: .75em;
    }

    li:hover {
        background: ${Main.color.silver};
    }

    i {
        cursor: pointer; 
    } 

`;

const FieldBox = styled.div`
    padding: 1em; 
    display: inline-block;
    width: 100%;
`;

const QuestionStyle = styled.div`

    span#required {
        color: ${Main.color.alert};
    }

    ${props => props.repeatable && css`
        border: 1px solid ${Main.color.body}
    `}

    width: 100%;
    display: flex;
    flex-direction: row;

`;