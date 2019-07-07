import React, { useContext } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import View from '../../../Elements/View';
import Main from '../../../Elements/Theme';

import { Question } from './question'; 
import { Header } from './header'; 

import { useDrag } from './useDrag';
import { DesignContext, BuilderContext } from '../../../Context';

export const Display = () => {

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
                                        {(provided, snapshot) => <GenerateQuestion item={item} provided={provided} snapshot={snapshot} />}
                                    </Draggable>
                                )
                            )}

                            {provided.placeholder}

                        </DropView>
                    )}
                </Droppable>
                
            </Card>

        </FormDesign>
    ];

}

const GenerateQuestion = ({ item, provided, snapshot }) => {

    return (
        <SelectableCard 
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            
            {
                item.Type__c != 'PageBreak' ? 
                <Question question={item} /> :
                <View className="row middle-xs">
                    <View className="col-xs-8">
                        <span id="break">Page Break</span>
                    </View>
                </View>
            }

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

const DropView = styled(View)`
    padding: 2em !important; 
    border: 1px dashed ${Main.color.silver};    
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
            <ArticleStyling className="slds-card">
                <div className="slds-card__body slds-card__body_inner">

                    { children }

                </div>
                <footer className="slds-card__footer">
                    <button className="slds-button slds-button_neutral">Cancel</button>
                    <button className="slds-button slds-button_brand">Send</button>
                </footer>
            </ArticleStyling>
        </ThemeProvider>
    )
} 

const ArticleStyling = styled.article`
    background: ${props => props.theme.background} !important;
    color: ${props => props.theme.questionColor} !important;
    background-image: ${props => `url(/sfc/servlet.shepherd/document/download/${props.theme.backgroundImage})`} !important; 

`;

const FormDesign = styled.div`
    height: 93vh; 
    padding: 2em; 
    overflow: scroll;
`;
