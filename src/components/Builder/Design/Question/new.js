import React from 'react';
import styled, { css } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Main from '../../../Elements/Theme';
import View from '../../../Elements/View';

import { sortedTypes } from '../types';

import DragAction from '../../../Elements/Icons/drag';
import { Icon } from 'antd';

export const NewQuestion = () => {
    
    return (
        <Droppable isDropDisabled={true} droppableId="new">
            {(provided, snapshot) => (
                <View
                    silver
                    space
                    full
                    key={'DroppableView'}
                    ref={provided.innerRef}>
                    {sortedTypes.map((type, index) => {
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
                                        <Icon type="drag" />
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
    font-size: 1em;
    padding: 1em 0 1em 0; 
    cursor: pointer;
    margin: .5em;
    font-weight: 500;
    background: ${Main.color.white};
    box-shadow: 2px 0 2px ${Main.color.silver}
    color: ${Main.color.dark}

    span {
        display: inline-block;
        padding: 0 .5em 0 .5em;
        vertical-align: middle;
    }

    ${props => props.isDragging == true && css`
        box-shadow: 1px 1px 5px ${Main.color.grey};
        background: ${Main.color.white};
    `}

    :active {
        box-shadow: none;
    }

    i {
        color: ${Main.color.dark}
        padding: 0 1em 0 1em; 
    }

`;