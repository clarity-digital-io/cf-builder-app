import { useCallback, useEffect, useReducer } from 'react'
import { BuilderController } from '../../utils/constants/methods';
import { call } from '../../query';

import {
  BuilderProviderState,
  BuilderAction,
} from '../../reducers'
import { Question_Criteria__c, Question_Option__c, Question__c } from '../../utils/types/sObjects';
import { Questions } from '../../reducers/BuilderProvider';
import { ImageListType, ImageType } from 'react-images-uploading';
import { arrayMove } from '@dnd-kit/sortable';

export const useEdit = (reducer: [BuilderProviderState, React.Dispatch<BuilderAction>]) => {

  const [state, dispatch] = reducer;
  const {
    question,
    options,
    pictureOptions,
    criteria,
    allOptions,
    allCriteria
  } = state;

  // set questions 
  const initQuestionEdit = (_question: Question__c) => {
    if (_question != null) {

      // on load of questions will set allOptions and allCriteria
      const editOptions = allOptions.filter(option => _question.id == option.cforms__Question__c);
      const editCriteria = allCriteria.filter(criterion => _question.id == criterion.cforms__Question__c);

      dispatch({
        type: 'INIT_QUESTION',
        question: _question,
        criteria: editCriteria,
        options: editOptions
      })
    } else {
      dispatch({
        type: 'INIT_QUESTION',
        question: null,
        criteria: [],
        options: []
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
      criteria: criteria.concat(_criterion)
    })
  }

  const handleRemoveCriterion = (index: number) => {
    dispatch({
      type: 'SET_UPDATE_CRITERIA',
      criteria: criteria.filter((_criterion: Question_Criteria__c, _index: number) => {
        return _index != index;
      })
    })
  }

  const handleUpdateCriteria = (_criteria: Question_Criteria__c[]) => {
    dispatch({
      type: 'SET_UPDATE_CRITERIA',
      criteria: _criteria
    })
  }

  const setNewOption = (_option: Question_Option__c, isPictureChoice?: boolean) => {
    dispatch({
      type: 'SET_NEW_OPTION',
      options: options.concat([_option]),
    })

    if (isPictureChoice) {
      dispatch({
        type: 'SET_NEW_PICTURE_OPTION',
        pictureOptions: pictureOptions.concat([{}])
      })
    }
  }

  const handleRemoveOptions = (index: number, isPictureChoice?: boolean) => {
    dispatch({
      type: 'SET_UPDATE_OPTIONS',
      options: options.filter((_option: Question_Option__c, _index: number) => {
        return _index != index;
      })
    })
    if (isPictureChoice) {
      dispatch({
        type: 'SET_UPDATE_PICTURE_OPTIONS',
        pictureOptions: pictureOptions.filter((_option: ImageType, _index: number) => {
          return _index != index;
        })
      })
    }
  }

  const handleUpdateOptions = (options: Question_Option__c[]) => {
    dispatch({
      type: 'SET_UPDATE_OPTIONS',
      options: options
    })
  }


  const handleDrageUpdateOptions = (activeIndex: number, overIndex: number, isPictureChoice: boolean) => {

    const newOptions = arrayMove(
      options,
      activeIndex,
      overIndex
    );

    dispatch({
      type: 'SET_UPDATE_OPTIONS',
      options: newOptions
    })

    if (isPictureChoice) {

      const newPictureOptions = arrayMove(
        pictureOptions,
        activeIndex,
        overIndex
      )

      dispatch({
        type: 'SET_UPDATE_PICTURE_OPTIONS',
        pictureOptions: newPictureOptions
      })
    }

  }


  const handleUpdatePictureOption = (images: ImageListType) => {
    dispatch({
      type: 'SET_UPDATE_PICTURE_OPTIONS',
      pictureOptions: images
    })
  }

  return {
    question,
    criteria,
    options,
    pictureOptions,
    allOptions,
    allCriteria,
    setNewCriterion,
    handleRemoveCriterion,
    handleUpdateCriteria,
    setNewOption,
    handleRemoveOptions,
    handleUpdatePictureOption,
    handleDrageUpdateOptions,
    handleUpdateOptions,
    setQuestionUpdate,
    initQuestionEdit,
  }
}
