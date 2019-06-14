import React from 'react';
import styled, { css } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Main from '../../../Elements/Theme';
import View from '../../../Elements/View';

import { types } from '../types';

import DragAction from '../../../Elements/Icons/drag';

export const NewQuestion = () => {

    return (
        <Droppable isDropDisabled={true} droppableId="new">
            {(provided, snapshot) => (
                <View
                    full
                    key={'DroppableView'}
                    ref={provided.innerRef}>
                    {types.map((type, index) => {
                        return (
                            <Draggable
                                key={type.id}
                                draggableId={`item-${type.id}`}
                                index={index}>
                                {(provided, snapshot) => (
                                    <SelectableNew
                                        key={type.id}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        isDragging={snapshot.isDragging}>
                                        <span className="slds-icon_container slds-icon-utility-drag_and_drop" title="Drag and drop this question on the form">
                                            <DragAction />
                                            <span className="slds-assistive-text">Drag and drop this question on the form</span>
                                        </span>
                                        <span>
                                            {type.name}
                                        </span>
                                    </SelectableNew>
                                )}
                            </Draggable>
                        )
                    })}
                    {provided.placeholder}
                </View>
            )}
        </Droppable>
    )

}

const SelectableNew = styled.div`
    user-select: 'none';
    font-size: .85em;
    font-weight: 900;
    border-bottom: 1px solid ${Main.color.light};
    padding: 1.25em 0 1.25em 0em; 
    cursor: pointer;

    span {
        display: inline-block;
        padding: 0 .5em 0 .5em;
        vertical-align: middle;
    }

    ${props => props.isDragging == true && css`
        box-shadow: 1px 1px 5px ${Main.color.grey};
        background: ${Main.color.white};
    `}
`;