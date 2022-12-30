import { useCallback, useEffect, useReducer } from 'react'
import { call } from '../query';

import {
  EditFormProviderState,
  EditFormAction,
  editFormInitialState,
  editFormReducer,
} from '../reducers'
import { BuilderController } from '../utils/constants/methods';
import { Error } from '../utils/messages/error';
import { Question_Criteria__c, Question__c } from '../utils/types/sObjects';

export const useEditForm = () => {
  const [state, dispatch] = useReducer(
    editFormReducer,
    editFormInitialState
  );

  const {
    question,
    options,
    criteria,
    error
  } = state;

  // i want a dismount dispatch here 
  // clear initial state of edit question state (question / options / criteria) => not handling record group just yet

  // BuilderController.updateForm

  // set init selected question (non record group type)
  const initQuestionEdit = (_question: Question__c) => {
    console.log({ _question })
    if (_question != null) {
      dispatch({
        type: 'INIT_QUESTION',
        question: _question,
        criteria: _question.cforms__Question_Criteria__r != null ? _question.cforms__Question_Criteria__r : null,
        options: _question.cforms__Question_Options__r != null ? _question.cforms__Question_Options__r : null
      })
    } else {
      dispatch({
        type: 'INIT_QUESTION',
        question: null,
        criteria: null,
        options: null
      })
    }
  }

  // update fields on question sobject
  const setQuestionUpdate = (_question: Question__c) => {
    dispatch({
      type: 'SET_QUESTION',
      question: _question,
    })
  }

  // when new criteria is added
  const setNewCriterion = (_criterion: Question_Criteria__c) => {

    // const  criteria != null ?

    dispatch({
      type: 'SET_NEW_CRITERION',
      criteria: criteria != null ? criteria.map(c => {
        if (c.id == _criterion.id) {
          return _criterion;
        } else {
          return c;
        }
      }) : [_criterion]
    })
  }
  // BuilderController.saveQuestion
  const handleSaveQuestion = async () => {
    console.log('test')
  }

  // BuilderController.saveQuestionWithOptions
  const handleSaveQuestionWithOptions = async () => {
    console.log('test')
  }

  // BuilderController.saveQuestionWithCriteria
  const handleSaveQuestionWithCriteria = async () => {
    console.log('test')
  }

  // BuilderController.saveRecordGroupFields
  const handleSaveRecordGroupFields = async () => {
    console.log('test')
  }


  // get builder hook 

  // add new page to form 

  // fetch questions 
  // save the form with new questions (single or multi)

  // delete question

  // pageQuestionsDelete

  // handleBack 

  // handHelp 

  const handleError = () => {
    console.log('error')
  }
  console.log('edit form', { question })
  return {
    question,
    options,
    criteria,
    error,
    setNewCriterion,
    setQuestionUpdate,
    initQuestionEdit,
    handleSaveQuestion,
    handleSaveQuestionWithOptions,
    handleSaveQuestionWithCriteria,
    handleError
  } as EditFormProviderState
}
