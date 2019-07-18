import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import View from '../../../Elements/View';
import { Button } from '../../../Elements/Button';
import { GenerateQuestion, Card, DropView } from './elements';

import { useMultiDrag } from './useMultiDrag';

export const Multi = ({ style }) => {

    const { pageQuestions } = useMultiDrag(); 

    return (
        Array.from(pageQuestions.values()).map((values, key) => {                    
            return (
                <Card key={key} style={style}>

                    <View className="row middle-xs end-xs" white space>
                        <View className="col-xs-3">
                            <Button small add space>Page { key + 1}</Button>
                            <Button small delete space onClick={(e) => window.confirm("Are you sure you want to delete this page?") && deletePage(key)}>Delete Page { key + 1}</Button>
                        </View> 
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
                    
                </Card>
            )
        })
    )

}