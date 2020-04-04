import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { useDrag } from './useDrag';

import { GenerateQuestion, Card, DropView } from './elements';

export const Single = ({ style, form }) => {

    const { questions } = useDrag(); 

    return (
        <Card style={style} fullHeight={true}>

            <Droppable droppableId="question">
                {(provided, snapshot) => (
                    <DropView 
                        isDraggingOver={snapshot.isDraggingOver}
                        ref={provided.innerRef}>

                        {
                            questions.map((item, index) => (
                                <Draggable
																		isDragDisabled={ form.forms__Status__c == 'Published' ? true : false }
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
    );

}
