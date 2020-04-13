import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import View from '../../../Elements/View';
import { Button } from '../../../Elements/Button';
import { GenerateQuestion, DropView } from './elements';

import { useMultiDrag } from './useMultiDrag';

export const Multi = ({ style }) => {

    const { pageQuestions, setDeletePage } = useMultiDrag(); 

    return (
        Array.from(pageQuestions.values()).map((values, key) => {                    
            return (
                <div key={key}>

										<View white>
												<span className="slds-color__text_gray-10 slds-align-middle slds-m-right_small">
													Page { key + 1}
												</span>
												<Button variant="destructive" onClick={(e) => setDeletePage(key)}>Delete Page { key + 1}</Button>
										</View> 

                    <Droppable droppableId={'' + key}>
                        {(provided, snapshot) => (
                            <DropView 
                                isDraggingOver={snapshot.isDraggingOver}
                                ref={provided.innerRef}>

                                {
                                    values.map((item, index) => (
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
                    
                </div>
            )
        })
    )

}