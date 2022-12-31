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
import { Question__c } from '../utils/types/sObjects';

export const useBuilder = () => {
  const [state, dispatch] = useReducer(
    builderReducer,
    builderInitialState
  );

  const {
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
    sObjects
  } = state;

  // get form when recordId is set
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
          availableFields: _availableOrgFields
        })

        const _form = await call(BuilderController.getForm, [formId]);
        dispatch({
          type: 'SET_FORM',
          form: _form
        } as BuilderAction)
        const _sObjects = await call(BuilderController.getSObjectsAvailable, []);
        dispatch({
          type: 'SET_SOBJECTS',
          sObjects: _sObjects
        } as BuilderAction)

        const _questions = await call(BuilderController.getQuestions, [formId]);

        // needed for sortable context to work properly
        const _questionsWithId = _questions.map((_question: Question__c) => ({ ..._question, id: _question.Id }));

        const questionsInPages = _questionsWithId.reduce((accum: Questions, question: Question__c) => {
          const { Id: key } = question;
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

  // update on navstate
  const updateConnectNavState = useCallback(async () => {
    if (navState == NavStates.CONNECT) {
      try {
        const _connections = await call(BuilderController.getConnections, [formId]);
        dispatch({
          type: 'SET_CONNECTIONS',
          connections: _connections
        } as BuilderAction)
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          error: error
        } as BuilderAction)
      }
    }
  }, [formId, navState])

  const updateMappingNavState = useCallback(async () => {
    if (navState == NavStates.MAPPING) {
      try {
        const { Mapping, Prefills, Fields } = await call(BuilderController.getConnectionFieldMapping, [formId]);
        dispatch({
          type: 'SET_ACTIVE_FIELDS',
          activeFields: Fields,
          activeFieldMapping: Mapping,
          activeFieldPrefills: Prefills,
        } as BuilderAction)
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          error: error
        } as BuilderAction)
      }
    }
  }, [formId, navState])

  useEffect(() => {
    if (navState == NavStates.CONNECT && formId) {
      updateConnectNavState();
    }
    if (navState == NavStates.MAPPING && formId) {
      updateMappingNavState();
    }
  }, [formId, navState])

  // set state updates 
  const setFormUpdate = (updatedForm: any) => {
    dispatch({
      type: 'SET_FORM',
      form: updatedForm
    })
  }

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

  // update navigation state 
  const handleNavigate = (loc: NavStates) => {
    dispatch({
      type: 'SET_NAV_STATE',
      navState: loc
    } as BuilderAction)
  }

  const handleError = (message: any) => {
    dispatch({
      type: 'SET_ERROR',
      error: message
    })
  }

  // handle questions update 
  const handleQuestionsUpdate = (questions: Questions) => {
    dispatch({
      type: 'UPDATE_QUESTIONS',
      questions: questions
    })
  }

  // setDndQuestion
  const setDndQuestion = (_dndQuestions, _updatedAvailableFields) => {
    dispatch({
      type: 'SET_DROP_QUESTION',
      dndQuestions: _dndQuestions
    })
    if (_updatedAvailableFields.length > 0) {
      dispatch({
        type: 'SET_AVAILABLE_FIELDS',
        availableFields: _updatedAvailableFields
      })
    }
  }

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
    sObjects,
    setFormUpdate,
    setDndQuestion,
    handleQuestionsUpdate,
    handleFormStatusUpdate,
    handleFormUpdate,
    handleNavigate,
    handleError
  } as BuilderProviderState
}

export enum FORMSTATUS {
  DRAFT = 'Draft',
  PUBLISH = 'Published'
}