import { useCallback, useEffect, useReducer } from 'react'
import { call } from '../query';

import {
  BuilderProviderState,
  BuilderAction,
  builderInitialState,
  builderReducer,
} from '../reducers'
import { NavStates, Questions } from '../reducers/BuilderProvider';
import { BuilderController } from '../utils/constants/methods';
import { Error } from '../utils/messages/error';
import { QuestionTypes } from '../utils/types/fields';
import { Question_Criteria__c, Question__c } from '../utils/types/sObjects';
import { useEdit, useError, useForm, useNavigate, useSave } from './BuilderHooks';

export const useBuilder = () => {
  const [state, dispatch] = useReducer(
    builderReducer,
    builderInitialState
  );

  const {
    error,
    activeConnection,
    activeFieldMapping,
    activeFieldPrefills,
    activeFields,
    connections,
    navState,
    sObjects
  } = state;

  // split this up into multiple hooks 
  // useEdit
  // useSave
  // useMapping
  // useNavigation
  // useError

  const {
    formId,
    form,
    availableFields,
    questions,
    dndQuestions,
    pages,
    isLoading,
    setDndQuestion,
    setFormUpdate,
    handleFormStatusUpdate,
    handleFormUpdate
  } = useForm([state, dispatch]);

  const { handleSave } = useSave([state, dispatch]);

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
    pages,
    error,
    isLoading,
    activeConnection,
    activeFieldMapping,
    activeFieldPrefills,
    activeFields,
    connections,
    form,
    navState,
    question,
    options,
    criteria,
    sObjects,
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