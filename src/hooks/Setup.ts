import { useCallback, useEffect, useReducer } from 'react'
import { call } from '../query';

import {
  SetupProviderState,
  SetupAction,
  setupInitialState,
  setupReducer,
} from '../reducers'
import { BuilderController } from '../utils/constants/methods';

export const useSetup = () => {
  const [state, dispatch] = useReducer(
    setupReducer,
    setupInitialState
  );
  const {
    sObjects, sObjectFields
  } = state;

  const getSetup = useCallback(async () => {
    const _sObjects = await call(BuilderController.getSObjectsAvailable, []);

    dispatch({
      type: 'SET_SOBJECTS',
      sObjects: _sObjects.map((sObject: string, index: number) => {
        return { id: index, label: sObject, type: sObject }
      })
    } as SetupAction)

  }, [sObjects])

  useEffect(() => {
    if (sObjects.length === 0) {
      getSetup();
    }
  }, [sObjects])

  return { sObjects, sObjectFields } as SetupProviderState
}
