import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useEffect, useReducer } from 'react'
import { call } from '../components/RemoteActions';
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
    activeAvailableFieldId,
    availableFields,
    formFields
  } = state;

  // load fields/questions available to org 
  const loadAvailableFields = useCallback(async () => {
    if (formId) {
      try {
        const _availableOrgFields = await call(BuilderController.getAvailableFields, []);
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
    const { active, over } = event;
    // need to handle different start positions here 
    console.log('handleDragEnd', { active, over })
    const { data: { current } } = active;
    // const oldIndex = availableFields.indexOf(active.id);
    // const newIndex = availableFields.indexOf(over?.id);
    // const newQuestions = arrayMove(availableFields, oldIndex, newIndex);
    // console.log({
    //   active,
    //   over,
    //   newQuestions
    // })
    const updatedFields = formFields.concat([current])
    dispatch({
      type: 'SET_FORM_FIELDS',
      formFields: updatedFields,
      activeFormFieldId: null
    } as BuilderDndAction)
  }

  // handle drag start 
  const handleDragStart = (event: DragEndEvent) => {
    const { active } = event;
    console.log({ active })
    dispatch({
      type: 'SET_ACTIVE_FIELD_ID',
      activeAvailableFieldId: active.id
    } as BuilderDndAction)
  }

  // handle error 

  return {
    activeAvailableFieldId,
    availableFields,
    formFields,
    handleDragEnd,
    handleDragStart
  } as BuilderDndProviderState
}
