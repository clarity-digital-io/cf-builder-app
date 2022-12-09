import { useCallback, useEffect, useReducer } from 'react'
import { call } from '../components/RemoteActions';

import {
  BuilderProviderState,
  BuilderAction,
  builderInitialState,
  builderReducer,
} from '../reducers'
import { NavStates } from '../reducers/BuilderProvider';
import { BuilderController } from '../utils/constants/methods';
import { Error } from '../utils/messages/error';

export const useBuilder = () => {
  const [state, dispatch] = useReducer(
    builderReducer,
    builderInitialState
  );

  const {
    formId,
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
    if (navState == 'CONNECT') {
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
    if (navState == 'MAPPING') {
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
    if (navState == 'CONNECT' && formId) {
      updateConnectNavState();
    }
    if (navState == 'MAPPING' && formId) {
      updateMappingNavState();
    }
  }, [formId, navState])

  // handleFormStatusUpdate
  const handleFormUpdate = async (status: FORMSTATUS) => {
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

  return {
    formId,
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
    handleFormUpdate,
    handleNavigate,
    handleError
  } as BuilderProviderState
}

export enum FORMSTATUS {
  DRAFT = 'Draft',
  PUBLISH = 'Published'
}