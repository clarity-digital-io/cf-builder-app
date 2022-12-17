import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useEffect, useReducer } from 'react'
import { call } from '../query';
import { useBuilderContext } from '../context/BuilderContext';
import { Error } from '../utils/messages/error';

import {
  BuilderDndProviderState,
  BuilderDndAction,
  builderDndInitialState,
  builderDndReducer,
} from '../reducers'
import { BuilderController } from '../utils/constants/methods';

export const useBuilderDnd = () => {

  const { formId } = useBuilderContext();

  const [state, dispatch] = useReducer(
    builderDndReducer,
    builderDndInitialState
  );

  const {
    activeAvailableField,
    availableFields,
    formFields
  } = state;

  // load fields/questions available to org 
  const loadAvailableFields = useCallback(async () => {
    if (formId) {
      try {
        console.log('loadAvailableFields')

        const _availableOrgFields = await call(BuilderController.getAvailableFields, null);
        console.log({ _availableOrgFields })
        dispatch({
          type: 'SET_AVAILABLE_FIELDS',
          availableFields: _availableOrgFields
        })
      } catch (error: any) {
        dispatch({
          type: 'SET_ERROR',
          error: { message: Error[error], display: true }
        } as BuilderDndAction)
      }
    }
  }, [formId]);

  useEffect(() => {
    console.log('load available fields', formId)
    if (formId) {
      loadAvailableFields();
    }
  }, [formId])

  // get current questions on form and split into pages (sortable and droppables)

  // handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { activatorEvent, active, over, collisions } = event;
    // need to handle different start positions here 
    console.log('handleDragEnd', { activatorEvent, active, over, formFields, collisions })
    const { data: { current }, id } = active;
    // const oldIndex = availableFields.indexOf(active.id);
    // const newIndex = availableFields.indexOf(over?.id);
    // const newQuestions = arrayMove(availableFields, oldIndex, newIndex);
    // console.log({
    //   active,
    //   over,
    //   newQuestions
    // })

    const updatedFields = formFields.concat([{ ...current, id: `${id}-${formFields.length}` }])
    if (over && current?.supports.includes(over?.data?.current?.type)) {
      dispatch({
        type: 'SET_FORM_FIELDS',
        formFields: updatedFields,
        activeFormFieldId: null
      } as BuilderDndAction)
    }


  }

  // handle drag start 
  const handleDragStart = (event: DragEndEvent) => {
    const { active: { data: { current } } } = event;
    console.log({ current })
    dispatch({
      type: 'SET_ACTIVE_FIELD',
      activeAvailableField: current
    } as BuilderDndAction)
  }

  // handle error 

  return {
    activeAvailableField,
    availableFields,
    formFields,
    handleDragEnd,
    handleDragStart
  } as BuilderDndProviderState
}
