import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

import View from '../../../Elements/View';
import Main from '../../../Elements/Theme';

import { Question } from './question'; 

export const Card = ({ fullHeight, style, children }) => {

    const theme = {
        background: style.Background_Color__c,
        questionColor: style.Color__c, 
        backgroundImage: style.Background_Image__c
    }

    return (    
        <ThemeProvider theme={theme}>    
        {
            fullHeight ?
            <CardStyling fullHeight>

                    { children }

            </CardStyling> :
            <CardStyling>

                    { children }

            </CardStyling>
        }
        </ThemeProvider>
    )
} 

const CardStyling = styled.div`
    background: ${props => props.theme.background} !important;
    color: ${props => props.theme.questionColor} !important;
    background-image: ${props => `url(${props.theme.backgroundImage})`} !important; 
    background-repeat: repeat-y !important;
    background-size: cover !important;

    ${props => props.fullHeight && css`
        min-height: 100%; 
    `}
`;

//    background-image: ${props => `url(/sfc/servlet.shepherd/document/download/${props.theme.backgroundImage})`} !important; 

export const GenerateQuestion = ({ item, provided, snapshot }) => {
    
    return (
        <SelectableCard 
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            
            <Question question={item} />

        </SelectableCard>
    )
}

export const SelectableCard = styled.div`
    border: 1px dashed ${Main.color.light}

    ${props => props.isDragging == true && css`
        background: ${Main.color.white};
        box-shadow: 1px 1px 5px ${Main.color.light};
    `}
`;

export const DropView = styled(View)`
    padding: 2em !important;  
    padding-bottom: 4em;
    min-height: 35vh; 
`;