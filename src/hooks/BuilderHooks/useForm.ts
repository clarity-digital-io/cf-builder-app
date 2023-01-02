import { useCallback, useEffect, useReducer } from 'react'
import { BuilderController } from '../../utils/constants/methods';
import { call } from '../../query';

import {
  BuilderProviderState,
  BuilderAction,
} from '../../reducers'
import { FORMSTATUS } from '../Builder';
import { Question__c } from '../../utils/types/sObjects';
import { Questions } from '../../reducers/BuilderProvider';
import { removeAtIndex } from '../../components/Builder/Design/Display/utils/array';

export const useForm = (reducer: [BuilderProviderState, React.Dispatch<BuilderAction>]) => {

  const [state, dispatch] = reducer;

  const {
    formId,
    form,
    availableFields,
    questions,
    dndQuestions,
    pages,
    question,
    isLoading
  } = state;
  // load form when recordId is set
  useEffect(() => {
    const url = new URLSearchParams(window.location.search);

    const formId = url.get("recordId");

    dispatch({
      type: 'SET_FORM_ID',
      formId
    });
  }, [])

  const getForm = useCallback(async () => {
    if (formId) {
      try {

        const _availableOrgFields = await call(BuilderController.getAvailableFields, null);
        console.log({ _availableOrgFields })
        dispatch({
          type: 'SET_AVAILABLE_FIELDS',
          availableFields: _availableOrgFields.map(_availableField => ({ ..._availableField, quantity: 0 }))
        })

        const _form = await call(BuilderController.getForm, [formId]);
        console.log({ _form })
        dispatch({
          type: 'SET_FORM',
          form: _form
        } as BuilderAction)
        const _sObjects = await call(BuilderController.getSObjectsAvailable, []);
        dispatch({
          type: 'SET_SOBJECTS',
          sObjects: _sObjects
        } as BuilderAction)

        const _questions: Array<Question__c> = await call(BuilderController.getQuestions, [formId]);

        // needed for sortable context to work properly
        const _questionsWithId: Array<Question__c> = _questions
          .map((_question: Question__c) => ({ ..._question, id: _question.Id }))
          .sort((a: Question__c, b: Question__c) => {
            if (a.cforms__Order__c > b.cforms__Order__c) {
              return 1;
            }
            if (a.cforms__Order__c < b.cforms__Order__c) {
              return -1;
            }
            return 0;
          });

        const questionsInPages = _questionsWithId.reduce((accum: Questions, question: Question__c) => {
          const { id: key } = question;
          return { ...accum, [key]: question }
        }, {});

        const _dndQuestions = _questionsWithId.reduce((accum: Questions, question: Question__c) => {
          const { cforms__Page__c: key } = question;
          const existing = accum[key] != null ? [question].concat(accum[key]) : [question];
          return { ...accum, [key]: existing }
        }, {})

        dispatch({
          type: 'SET_QUESTIONS',
          questions: questionsInPages,
          pages: Object.keys(questionsInPages),
          dndQuestions: _dndQuestions
        })
      } catch (error: any) {
        dispatch({
          type: 'SET_ERROR',
          error: { message: Error[error], display: true }
        })
      }

      dispatch({
        type: 'SET_LOADING',
        isLoading: false
      });
    }
  }, [formId])

  useEffect(() => {
    if (formId) {
      getForm();
    }
  }, [formId])

  // set state updates 
  const setFormUpdate = (updatedForm: any) => {
    dispatch({
      type: 'SET_FORM',
      form: updatedForm
    })
  }

  // just handle setting and method calls here

  // api requests
  // handleFormStatusUpdate
  const handleFormUpdate = async (updatedForm: any) => {
    try {
      const _form = await call(BuilderController.updateForm, [updatedForm]);
      dispatch({
        type: 'SET_FORM',
        form: _form
      } as BuilderAction)
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        error: error
      } as BuilderAction)
    }
  }

  const handleFormStatusUpdate = async (status: FORMSTATUS) => {
    try {
      const _form = await call(BuilderController.updateForm, [{ Id: form.Id, forms__Status__c: status }]);
      dispatch({
        type: 'SET_FORM',
        form: _form
      } as BuilderAction)
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        error: error
      } as BuilderAction)
    }
  }

  // setDndQuestion
  const setDndQuestion = (_dndQuestions: [], _updatedAvailableFields: [] | null) => {
    dispatch({
      type: 'SET_DROP_QUESTION',
      dndQuestions: _dndQuestions
    })
    if (_updatedAvailableFields && _updatedAvailableFields.length > 0) {
      dispatch({
        type: 'SET_AVAILABLE_FIELDS',
        availableFields: _updatedAvailableFields
      })
    }
  }

  useEffect(() => {
    if (question) {

      const { cforms__Page__c } = question;

      const newItems = {
        ...dndQuestions,
        [cforms__Page__c]: updateQuestionItem(dndQuestions[cforms__Page__c], question),
      };

      dispatch({
        type: 'SET_DROP_QUESTION',
        dndQuestions: newItems
      })

    }
  }, [question])

  return {
    form,
    formId,
    availableFields,
    questions,
    dndQuestions,
    pages,
    isLoading,
    setDndQuestion,
    setFormUpdate,
    handleFormStatusUpdate,
    handleFormUpdate,
  }
}

const updateQuestionItem = (questions: Array<Question__c>, question: Question__c) => {
  return questions.map(_question => {
    if (_question.id == question.id) {
      return question
    } else {
      return _question;
    }
  })
}