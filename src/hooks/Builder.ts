import { useReducer } from 'react'

import {
  BuilderProviderState,
  builderInitialState,
  builderReducer,
} from '../reducers'
import { useEdit, useError, useForm, useNavigate, useSave } from './BuilderHooks';
import { useFormConnections } from './BuilderHooks/useFormConnections';

export const useBuilder = () => {
  const [state, dispatch] = useReducer(
    builderReducer,
    builderInitialState
  );

  const {
    error,
    navState,
    allQuestionsCombo,
    allQuestions,
  } = state;

  const {
    formId,
    form,
    availableFields,
    questions,
    dndQuestions,
    isLoading,
    setDndQuestion,
    setFormUpdate,
    handleFormStatusUpdate,
    handleFormUpdate
  } = useForm([state, dispatch]);

  const {
    formConnectionId,
    formConnections,
    formConnectionFields,
    allFormConnections,
    allFormConnectionFields,
    initFormConnection,
    setNewFormConnection,
    handleUpdateFormConnections,
    handleRemoveFormConnection,
    setNewFormConnectionField,
    handleUpdateFormConnectionField,
    handleRemoveFormConnectionField
  } = useFormConnections([state, dispatch]);

  const {
    handleSave
  } = useSave([state, dispatch]);

  const {
    question,
    options,
    pictureOptions,
    criteria,
    allOptions,
    allCriteria,
    setNewCriterion,
    handleRemoveCriterion,
    handleUpdateCriteria,
    setNewOption,
    handleUpdateOptions,
    handleUpdatePictureOption,
    handleDrageUpdateOptions,
    handleRemoveOptions,
    setQuestionUpdate,
    initQuestionEdit,
  } = useEdit([state, dispatch]);


  const { handleNavigate } = useNavigate();

  const { handleError } = useError();

  return {
    formId,
    availableFields,
    questions,
    dndQuestions,
    error,
    isLoading,
    form,
    navState,
    question,
    options,
    pictureOptions,
    criteria,
    formConnectionId,
    formConnections,
    formConnectionFields,
    allQuestionsCombo,
    allQuestions,
    allOptions,
    allCriteria,
    allFormConnections,
    allFormConnectionFields,
    initFormConnection,
    setNewFormConnection,
    handleUpdateFormConnections,
    handleRemoveFormConnection,
    setNewFormConnectionField,
    handleUpdateFormConnectionField,
    handleRemoveFormConnectionField,
    setNewCriterion,
    handleRemoveCriterion,
    handleUpdateCriteria,
    setNewOption,
    handleUpdateOptions,
    handleUpdatePictureOption,
    handleDrageUpdateOptions,
    handleRemoveOptions,
    setQuestionUpdate,
    initQuestionEdit,
    setFormUpdate,
    setDndQuestion,
    handleFormStatusUpdate,
    handleFormUpdate,
    handleNavigate,
    handleSave,
    handleError
  } as BuilderProviderState
}

export enum FORMSTATUS {
  DRAFT = 'Draft',
  PUBLISH = 'Published'
}