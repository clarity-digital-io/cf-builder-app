import React from 'react';
import styled, { css } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Main from '../../../Elements/Theme';
import View from '../../../Elements/View';

import { types } from '../types';

export const Question = () => {

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? Main.color.light : Main.color.white,
        width: '100%'
    });

    return (
        <Droppable isDropDisabled={true} droppableId="new">
            {(provided, snapshot) => (
                <View
                    full
                    key={'DroppableView'}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}>
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
                                        {type.name}
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
    padding: 1.5em;

    ${props => props.isDragging == true && css`
        box-shadow: 1px 1px 5px ${Main.color.grey};
        background: ${Main.color.white};
    `}
`;