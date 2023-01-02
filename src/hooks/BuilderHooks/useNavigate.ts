import { useCallback, useEffect, useReducer } from 'react'
import { BuilderController } from '../../utils/constants/methods';
import { call } from '../../query';

import {
  BuilderAction,
  builderInitialState,
  builderReducer,
} from '../../reducers'
import { NavStates } from '../../reducers/BuilderProvider';

export const useNavigate = () => {

  const [state, dispatch] = useReducer(
    builderReducer,
    builderInitialState
  );

  const {
    formId,
    navState,
  } = state;

  useEffect(() => {
    if (navState == NavStates.CONNECT && formId) {
      updateConnectNavState();
    }
    if (navState == NavStates.MAPPING && formId) {
      updateMappingNavState();
    }
  }, [formId, navState])


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

  // update navigation state 
  const handleNavigate = (loc: NavStates) => {
    dispatch({
      type: 'SET_NAV_STATE',
      navState: loc
    } as BuilderAction)
  }

  return {
    handleNavigate
  }
}
