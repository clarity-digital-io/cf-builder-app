import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Main from '../../../Elements/Theme';
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';

import Box from '../../../Elements/Box';

import { sortedTypes } from '../types';

import { getType } from './types'; 
import { BuilderContext, DesignContext } from '../../../Context';

export const NewQuestion = () => {

		const { form } = useContext(BuilderContext);

		const { update } = useContext(DesignContext); 

		return (
        <View silver full className="row" key={'Body'}>
            <View className="col-xs-12">
                <Box padding='0'>

                    <ViewStyle space border>

                        <h1>Form Builder</h1>

                        <p>Drag and Drop any Question type to your Form on the right.</p>

                    </ViewStyle>


                    <View space>

                        <Droppable isDropDisabled={true} droppableId="new">
                                {(provided, snapshot) => (
                                    <View
                                        className="row"
                                        key={'DroppableView'}
                                        ref={provided.innerRef}>
                                        {sortedTypes.map((type, index) => {
                                            return (
                                                    <View  className="col-xs-6">
                                                        <Draggable
																														isDragDisabled={ form.forms__Status__c == 'Published' ? true : false }
                                                            key={type.id}
                                                            draggableId={`item-${type.id}`}
                                                            index={index}>
                                                            {(provided, snapshot) => (
                                                                <SelectableNew
                                                                    key={type.id}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
																																		{...provided.dragHandleProps}
																																		disabled={ form.forms__Status__c == 'Published' || update ? true : false }
                                                                    isDragging={snapshot.isDragging}>
                                                                    {getType(type.type)}
                                                                    <span>
                                                                        {type.name}
                                                                    </span>
                                                                </SelectableNew>
                                                            )}
                                                        </Draggable>
                                                    </View>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </View>
                                )}
                            </Droppable>

                    </View>

                </Box>
            </View>
        </View>
    )

}

const SelectableNew = styled.div`
    user-select: 'none';
    font-size: 1em;
    padding: 1em 0 1em 0; 
    cursor: pointer;
    margin: .75em;
    font-weight: 500;
    background: ${Main.color.white};

    color: ${Main.color.dark}

    span {
        display: inline-block;
        padding: 0 .5em 0 .5em;
        vertical-align: middle;
        font-weight: 500;
        color: ${Main.color.body}
    }

    ${props => props.isDragging == true && css`
        box-shadow: 1px 1px 5px ${Main.color.grey};
        background: ${Main.color.white};
		`}
		
		${props => props.disabled == true && css`
			background: ${Main.color.light};
	`}

    :active {
        box-shadow: none;
    }

    i {
        color: ${Main.color.dark}
        padding: 0 .5em 0 .5em;
        vertical-align: middle;
    }

`;