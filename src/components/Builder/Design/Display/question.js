import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Icon, Form } from 'antd';

import Main from '../../../Elements/Theme';
import { FormItemStyled } from '../../../Elements/View/fieldstyle';
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
                <li onClick={() => edit('EDIT')}><Icon style={{ fontSize: '1.25em', color: Main.color.body }} type="edit" /></li>

                <li onClick={() => edit('LOGIC')} ><Icon style={{ fontSize: '1.25em', color: Main.color.body }} type="interaction" /></li>

                {
                    (question.forms__Type__c == 'RecordGroup' && question.forms__Salesforce_Object__c != null) ? 
                    <li onClick={() => edit('SF')}><Icon style={{ fontSize: '1.25em', color: Main.color.body }} type="folder-add" /></li> : 
                        null
                }

                <li onClick={() => setQuestionToDelete((question.Id))}><Icon style={{ fontSize: '1.25em', color: Main.color.alert }} type="delete" /></li>
            </div>
            </Options>

            <FieldBox>

                {
                    hasFormLabel(question.forms__Type__c) ? 
                        <FormItemStyled key={question.Id} label={question.forms__Title__c} required={question.forms__Required__c}>
                          {getType(question)}
                        </FormItemStyled> :
                        <div>{getType(question)}</div>
                }

            </FieldBox>

        </QuestionStyle>
    )
}

const hasFormLabel = (type) => {

    if(type == 'RecordGroup' || type == 'FreeText') {
        return false; 
    }

    return true;

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
        border: 1px solid ${Main.color.body};
    `}

    width: 100%;
    display: flex;
    flex-direction: row;
    background: ${Main.color.white};
`;