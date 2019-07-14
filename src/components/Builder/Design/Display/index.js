import React, { useState, useContext } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import View from '../../../Elements/View';
import Main from '../../../Elements/Theme';

import { Question } from './question'; 
import { Header } from './header'; 

import { useDrag } from './useDrag';
import { DesignContext, BuilderContext } from '../../../Context';
import { Footer } from './footer';

export const Display = () => {

    const [additionalPages, setAdditionalPages] = useState([]);

    const { questionUpdate } = useContext(DesignContext);

    const { update, questions } = useDrag(); 

    return [
        <Header key={'Header'} update={questionUpdate || update} />,
        <FormDesign key={'Display'}>

            <Card>

                <Droppable droppableId="question">
                    {(provided, snapshot) => (
                        <DropView 
                            isDraggingOver={snapshot.isDraggingOver}
                            ref={provided.innerRef}>

                            {
                                questions.map((item, index) => (
                                    <Draggable
                                        key={`question${item.Id}${index}`}
                                        draggableId={`question${item.Id}${index}`}
                                        index={index}>
                                        {(provided, snapshot) => <GenerateQuestion key={item.Id} item={item} provided={provided} snapshot={snapshot} />}
                                    </Draggable>
                                )
                            )}

                            {provided.placeholder}

                        </DropView>
                    )}
                </Droppable>
                
            </Card>

            {
                additionalPages.map((page, i) => {
                    
                    <Card>

                        <Droppable droppableId={`page${i}`}>
                            {(provided, snapshot) => (
                                <DropView 
                                    isDraggingOver={snapshot.isDraggingOver}
                                    ref={provided.innerRef}>
            
                                    {provided.placeholder}
            
                                </DropView>
                            )}
                        </Droppable>
        
                    </Card>
                })
            }

        </FormDesign>, 
        <Footer key={'Footer'} />
    ];

}

const GenerateQuestion = ({ item, provided, snapshot }) => {
    
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

const SelectableCard = styled.div`
    border: 1px dashed ${Main.color.silver};

    ${props => props.isDragging == true && css`
        box-shadow: 1px 1px 5px ${Main.color.grey};
    `}

    #break {
        text-transform: capitalize;
        padding: 1em; 
        display: block; 
        font-weight: 900;  
    }
`;

const Card = ({ update, children }) => {

    const { style } = useContext(BuilderContext);

    const theme = {
        background: style.Background_Color__c,
        questionColor: style.Color__c, 
        backgroundImage: style.Background_Image__c
    }

    return (    
        <ThemeProvider theme={theme}>    
            <CardStyling>

                    { children }

            </CardStyling>
        </ThemeProvider>
    )
} 

const CardStyling = styled.div`
    background: ${props => props.theme.background} !important;
    color: ${props => props.theme.questionColor} !important;
    background-image: ${props => `url(${props.theme.backgroundImage})`} !important; 
    background-repeat: no-repeat !important;
    background-size: cover !important;
    height: 100%; 
`;

//    background-image: ${props => `url(/sfc/servlet.shepherd/document/download/${props.theme.backgroundImage})`} !important; 

const FormDesign = styled.div`
    height: 87vh;
    overflow: scroll;
`;

const DropView = styled(View)`
    padding: 2em !important;  
    min-height: 55vh; 
`;