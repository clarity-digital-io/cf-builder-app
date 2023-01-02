import { useCallback, useEffect, useReducer } from 'react'
import { BuilderController } from '../../utils/constants/methods';
import { call } from '../../query';

import {
  BuilderProviderState,
  BuilderAction,
} from '../../reducers'
import { Question_Criteria__c, Question_Option__c, Question__c } from '../../utils/types/sObjects';
import { Questions } from '../../reducers/BuilderProvider';

export const useEdit = (reducer: [BuilderProviderState, React.Dispatch<BuilderAction>]) => {

  const [state, dispatch] = reducer;
  const {
    question,
    options,
    criteria
  } = state;

  // handle questions update 
  const handleQuestionsUpdate = (questions: Questions) => {
    // NOT USED
    dispatch({
      type: 'UPDATE_QUESTIONS',
      questions: questions
    })
  }


  // set questions 
  const initQuestionEdit = (_question: Question__c) => {
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

  const setNewOption = (_option: Question_Option__c) => {
    dispatch({
      type: 'SET_NEW_OPTION',
      options: options != null ? options.concat([_option]) : [_option]
    })
  }

  const handleUpdateOptions = (_options: Question_Option__c[]) => {
    dispatch({
      type: 'SET_UPDATE_OPTIONS',
      options: _options
    })
  }

  return {
    question,
    criteria,
    options,
    setNewCriterion,
    setNewOption,
    handleUpdateOptions,
    setQuestionUpdate,
    initQuestionEdit,
    handleQuestionsUpdate
  }
}
