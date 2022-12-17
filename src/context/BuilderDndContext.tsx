import React, { createContext, ReactChild, useContext, useState } from 'react'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// import { useBuilderDnd } from '../hooks';
// import { builderDndInitialState, BuilderDndProviderState } from '../reducers/BuilderDndProvider';

// const BuilderDndContext = createContext<BuilderDndProviderState>(
//   builderDndInitialState
// )


interface Props {
  children: ReactChild | ReactChild[]
}

// const SortableItem = (props) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id: props.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       i don kno
//     </div>
//   );
// }

export const BuilderDndContextProvider = ({ children }: Props) => {

  // const { sortableQuestions, setSortableQuestions } = useSortableQuestions();

  // const { setNodeRef: setFirstDroppableRef } = useDroppable({
  //   id: 'droppable-1'
  // });

  // const { setNodeRef: setsecondDroppableRef } = useDroppable({
  //   id: 'droppable-2'
  // });

  // // useQuestions hoolk should have [questions, setQuestions] (question types)
  // // 


  // const handleDragEnd = (event) => {
  //   const { active, over } = event;
  //   if (active.id !== over.id) {
  //     setSortableQuestions((items) => {
  //       const oldIndex = items.indexOf(active.id);
  //       const newIndex = items.indexOf(over.id);
  //       return arrayMove(items, oldIndex, newIndex);
  //     })
  //   }
  // }

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { activatorEvent, active, over, collisions } = event;
    // need to handle different start positions here 
    console.log('handleDragEnd', { activatorEvent, active, over, collisions })
    const { data: { current }, id } = active;
    // const oldIndex = availableFields.indexOf(active.id);
    // const newIndex = availableFields.indexOf(over?.id);
    // const newQuestions = arrayMove(availableFields, oldIndex, newIndex);
    // console.log({
    //   active,
    //   over,
    //   newQuestions
    // })

    // const updatedFields = formFields.concat([{ ...current, id: `${id}-${formFields.length}` }])
    // if (over && current?.supports.includes(over?.data?.current?.type)) {
    //   dispatch({
    //     type: 'SET_FORM_FIELDS',
    //     formFields: updatedFields,
    //     activeFormFieldId: null
    //   })
    // }


  }

  // handle drag start 
  const handleDragStart = (event: DragEndEvent) => {
    const { active: { data: { current } } } = event;
    console.log({ current })
    // dispatch({
    //   type: 'SET_ACTIVE_FIELD',
    //   activeAvailableField: current
    // })
  }

  // const builderDndProviderState = useBuilderDnd();
  // const { handleDragEnd, handleDragStart } = builderDndProviderState;

  return (
    // <BuilderDndContext.Provider value={builderDndProviderState}>
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      {/* <SortableContext items={sortableQuestions} strategy={verticalListSortingStrategy}>
        {sortableQuestions.map(id => {
          return <SortableItem key={id} id={id}>{`This is a list item ${id}`}</SortableItem>
        })}
      </SortableContext> */}

      {/* need multiple droppables not necessarily */}
      {/* sortables here */}

      {/* <section>
        <div ref={setFirstDroppableRef}>

        </div>
        <div ref={setsecondDroppableRef}>

        </div>
      </section> */}
      {children}
    </DndContext>
    // </BuilderDndContext.Provider>
  )
}

// export function useBuilderDndContext() {
//   return useContext(BuilderDndContext)
// }
