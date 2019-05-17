import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import View from '../../../Elements/View'
import Box from '../../../Elements/Box'
import Main from '../../../Elements/Theme'

import { getType } from './Choices'; 
import { DesignContext } from '../../../Context';

export const Question = ({ question }) => {

    const { setQuestionState, setActiveQuestion, activeQuestion, setEdit } = useContext(DesignContext);

    const update = (state) => {
        setActiveQuestion(question);
        setQuestionState(state);
        setEdit(question.Id);
    }

    return (
        <ViewStyle active={ question.Id != null && (question.Id == activeQuestion.Id) }>
            <View className="row middle-xs">

                <View className="col-xs-12 col-sm-6 col-md-6 col-lg-9">
                    <Box padding='0'>
                        { question.Required__c ? <span id="required">*</span> : '' }
                        { question.Title__c }
                    </Box> 
                </View>

                <View className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <Box padding='0'>
                        <Options>
                            <li onClick={() => update('EDIT')}>Edit</li>
                            <li onClick={() => update('AUTOMATE')}>Automate</li>
                            <li onClick={() => update('LOGIC')}>Logic</li>
                            <li onClick={() => update('CALCULATOR')}>Calculator</li>
                            <li onClick={() => console.log('delete')} id="delete">Delete</li>
                        </Options>
                    </Box> 
                </View>

            </View>
        </ViewStyle>
    )
}

const Options = styled.ul`

    font-size: .85em; 
    display: flex;
    align-items: stretch;
    justify-content: space-evenly;

    li {
        border: 1px solid ${Main.color.silver}
        color: ${Main.color.body}
        border-radius: 4px; 
        padding: .5em;
        background: ${Main.color.white};
        text-align: center;
        flex: 0 1 auto;
        display: block;
        cursor: pointer;
    }

    li#delete {
        color: ${Main.color.alert};
    }

    li:hover {
        background: ${Main.color.light}
    }

`;

const ViewStyle = styled.div`
    padding: 1em;
    margin-bottom: 1em;
    border-left: ${props => props.active ? `2px solid ${Main.color.body}` : "white"};

    .active {
        background: ${Main.color.body}
    }

    span#required {
        color: ${Main.color.alert};
    }
`;