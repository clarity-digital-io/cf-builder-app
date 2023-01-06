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
    activeFieldMapping,
    activeFieldPrefills,
    activeFields,
    connections,
    navState,
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
    activeFormConnection,
    formConnections,
    formConnectionFields,
    addFormConnection,
    setFormConnection
  } = useFormConnections([state, dispatch]);

  const {
    handleSave
  } = useSave([state, dispatch]);

  const {
    question,
    options,
    criteria,
    setNewCriterion,
    setNewOption,
    handleUpdateOptions,
    setQuestionUpdate,
    initQuestionEdit,
    handleQuestionsUpdate
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
    activeFieldMapping,
    activeFieldPrefills,
    activeFields,
    connections,
    form,
    navState,
    question,
    options,
    criteria,
    formConnections,
    formConnectionFields,
    activeFormConnection,
    setFormConnection,
    addFormConnection,
    setNewCriterion,
    setNewOption,
    handleUpdateOptions,
    setQuestionUpdate,
    initQuestionEdit,
    setFormUpdate,
    setDndQuestion,
    handleQuestionsUpdate,
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