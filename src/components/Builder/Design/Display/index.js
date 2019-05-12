import React from 'react';
import styled, { css } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import View from '../../../Elements/View';
import Main from '../../../Elements/Theme';

import { Question } from './question'; 

import { useDrag } from './useDrag';

export const Display = () => {

    const { update, questions } = useDrag(); 

    return (
        <FormDesign>

            <Card update={update}>

                <Droppable droppableId="question">
                    {(provided, snapshot) => (
                        <DropView 
                            isDraggingOver={snapshot.isDraggingOver}
                            ref={provided.innerRef}>

                            {
                                questions.map((item, index) => (
                                    <Draggable
                                        key={`question${item.id}${index}`}
                                        draggableId={`question${item.id}${index}`}
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
    );

}

const GenerateQuestion = ({ item, provided, snapshot }) => {

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        ...draggableStyle
    });

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
    box-shadow: 1px 1px 5px ${Main.color.silver};
    background: ${Main.color.white};
    border-radius: 4px; 

    ${props => props.isDragging == true && css`
        box-shadow: 1px 1px 5px ${Main.color.grey};
        background: ${Main.color.white};
    `}

`;

const DropView = styled(View)`
    background: ${Main.color.white}
    padding: 2em !important; 
    border: 1px dashed ${Main.color.silver};

    ${props => props.isDraggingOver == true && css`
        background: ${Main.color.light};

    `}
    
`;

const Card = ({ update, children }) => {
    console.log(update);
    return (                   
        <article className="slds-card">
            <div className="slds-card__header slds-grid">
                <header className="slds-media slds-media_center slds-has-flexi-truncate">
                <div className="slds-media__figure">
                    <span className="slds-icon_container slds-icon-standard-account" title="account">
                    <svg className="slds-icon slds-icon_small" aria-hidden="true">
                        <use xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
                    </svg>
                    <span className="slds-assistive-text">account</span>
                    </span>
                </div>
                <div className="slds-media__body">
                    <h2 className="slds-card__header-title">
                    <a href="javascript:void(0);" className="slds-card__header-link slds-truncate" title="Accounts">
                        <span>Accounts</span>
                    </a>
                    </h2>
                </div>
                <div className="slds-no-flex">
                    { update ? 'Saving...' : 'Saved' }
                </div>
                </header>
            </div>
            <div className="slds-card__body slds-card__body_inner">

                { children }

            </div>
            <footer className="slds-card__footer">
                <a className="slds-card__footer-action" href="javascript:void(0);">View All
                <span className="slds-assistive-text">Accounts</span>
                </a>
            </footer>
        </article>
    )
} 

const FormDesign = styled.div`
    height: 94vh; 
    background: ${Main.color.silver}; 
    padding: 2em; 
    overflow: scroll;
`;
